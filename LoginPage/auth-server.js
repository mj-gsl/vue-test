// Import required modules
require('dotenv').config();
const cors = require('cors');
const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const session = require('express-session');
const path = require('path');
const { Pool } = require('pg'); // Import the Pool module from pg

// Initialize the express application
const app = express();

const corsOptions = {
  origin: 'http://localhost:8088', // This should match the URL of your frontend application
  credentials: true, // This is important if your frontend needs to send cookies or authorization headers
  methods: ['GET', 'POST', 'OPTIONS'], // You can add more methods if needed
};
// Enable pre-flight requests for all routes
app.options('*', cors(corsOptions)); // this line should be before other app.use() calls

// Then apply CORS to all requests
app.use(cors(corsOptions));

// PostgreSQL connection pool
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Define the path to the public directory for static files
app.use(express.static(path.join(__dirname, 'public')));

// Configure session middleware
app.use(session({
  secret: process.env.SESSION_SECRET || 'default_session_secret',
  resave: false,
  saveUninitialized: true,
}));

// Initialize Passport and restore authentication state, if any, from the session
app.use(passport.initialize());
app.use(passport.session());

// Configure the Google strategy for use by Passport
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3001/auth/google/callback"
  },
  async (accessToken, refreshToken, profile, cb) => {
    console.log('Received profile:', profile); // Log the received profile information
    // Find or create a user in the database
    try {
      const { rows } = await pool.query('SELECT * FROM users WHERE google_id = $1', [profile.id]);
      let user = rows[0];

      if (!user) {
        // If user does not exist, create a new user entry
        const newUser = await pool.query(
          'INSERT INTO users (google_id, email, name, profile_photo) VALUES ($1, $2, $3, $4) RETURNING *',
          [profile.id, profile.emails[0].value, profile.displayName, profile.photos[0].value]
        );
        user = newUser.rows[0];
      }

      cb(null, user);
    } catch (error) {
      cb(error);
    }
  }
));

// Test database connection
app.get('/db-test', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT NOW()'); // Simple query to test the database connection
    res.json({ success: true, time: rows[0].now });
  } catch (error) {
    console.error('Database connection error:', error);
    res.status(500).json({ success: false, message: 'Unable to connect to the database' });
  }
});

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

// Define a test route
app.get('/test', (req, res) => {
  res.send('Test route is working');
});

// Serve the index.html file when the root route is accessed
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Define the routes for the Google OAuth flow
app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    // Successful authentication, redirect to the frontend
    res.redirect('http://localhost:8088');
  }
);

// A route to check if the user is logged in and to retrieve user data
app.get('/auth/login/success', (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ success: true, message: "User has successfully authenticated", user: req.user });
  } else {
    res.json({ success: false, message: "User not authenticated" });
  }
});

// Start the server on the specified port
const PORT = process.env.PORT || 3001;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Auth server listening on port ${PORT}`);
  // Log environment variables for debugging purposes
  console.log(`Environment Variables:`);
  console.log(`SESSION_SECRET: ${process.env.SESSION_SECRET}`);
  console.log(`GOOGLE_CLIENT_ID: ${process.env.GOOGLE_CLIENT_ID}`);
  console.log(`GOOGLE_CLIENT_SECRET: ${process.env.GOOGLE_CLIENT_SECRET}`);
  console.log(`Serving index.html from: ${path.join(__dirname, 'public', 'index.html')}`);
  console.log(`Starting server on port: ${PORT}`);
});
