//index.js (Backend microservice)
require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const AWS = require('aws-sdk');
const path = require('path');

const upload = multer({ dest: 'uploads/' }); // Temporarily store files in the 'uploads' directory
const app = express();
app.use(cors({
  origin: 'http://localhost:8088', // Allow requests from frontend origin
   credentials: true,
}));

app.use(express.json());

// Configure AWS
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION, // For example, 'eu-central-1'
});

const s3 = new AWS.S3();

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});
//For fetch the Product List from DB 
app.get('/products', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM products');
    res.json(rows);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).send('Server error');
  }
});

//****** updating user profile information from DB */
app.post('/user/profile', upload.single('image'), async (req, res) => {
  const userId = req.user.id; // Again, adjust based on your authentication method
  const { name, email } = req.body; // Example profile fields
  const image = req.file;

  try {
    let imageUrl = '';
    if (image) {
      const s3Result = await uploadImageToS3(image);
      imageUrl = s3Result.Location;
    }

    const queryText = 'UPDATE users SET name = $1, email = $2, profile_photo = $3 WHERE id = $4';
    await pool.query(queryText, [name, email, imageUrl, userId]);

    res.json({ success: true, message: 'Profile updated successfully' });
  } catch (error) {
    console.error("Error updating user profile:", error);
    res.status(500).send('Server error');
  }
});
///********** */
// Fetch User Profile Info from DB
app.get('/user/profile/:userId', async (req, res) => {
  const { userId } = req.params; // Get userId from request parameters

  try {
    const queryText = 'SELECT * FROM users WHERE id = $1';
    const { rows } = await pool.query(queryText, [userId]);
    
    if (rows.length > 0) {
      const userProfile = rows[0];
      res.json({ success: true, userProfile });
    } else {
      res.status(404).send('User not found');
    }
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).send('Server error');
  }
});
//*********** */
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

// Helper function to upload image to S3
const uploadImageToS3 = (file) => {
  const fileStream = fs.createReadStream(file.path);
  const uploadParams = {
    Bucket: process.env.AWS_S3_BUCKET_NAME, // The name of your S3 bucket
    Key: `nestjs/${file.filename}-${path.basename(file.originalname)}`, // File name you want to save as in S3
    Body: fileStream,
  };

  return s3.upload(uploadParams).promise(); // This will upload the file to S3 and return a promise
};


console.log('Server is running and ready to accept POST to /submit-product');
app.post('/submit-product', upload.single('image'), async (req, res) => {
  const { name, description, price, category } = req.body;
  const image = req.file; // Multer populates this

  try {
    // Upload image to S3 and get the URL
    const s3Result = await uploadImageToS3(image);
    const imageUrl = s3Result.Location; // URL of the uploaded image

    // Insert product details into the database, including the S3 image URL
    const queryText = 'INSERT INTO products (name, description, price, category, image_url) VALUES ($1, $2, $3, $4, $5)';
    await pool.query(queryText, [name, description, price, category, imageUrl]);

    // Cleanup: Optionally delete the locally stored file after uploading to S3
    fs.unlinkSync(image.path);

    res.json({ message: 'Product submitted successfully', imageUrl });
  } catch (error) {
    console.error("Error submitting product:", error);
    res.status(500).send('Server error');
  }
});
