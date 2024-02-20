// Import required modules
require('dotenv').config();
const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const session = require('express-session');
const path = require('path');

// Initialize the express application
const app = express();

// Define the path to the public directory for static files
app.use(express.static(path.join(__dirname, 'public')));

// Configure session middleware
app.use(session({
  secret: process.env.SESSION_SECRET || 'default_session_secret', // Fallback to a default value if not set
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
  (accessToken, refreshToken, profile, cb) => {
    // In a production app, you would likely persist user information into a database here
    return cb(null, profile);
  }
));

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
  console.log(`Environment Variables:`);
  console.log(`SESSION_SECRET: ${process.env.SESSION_SECRET}`);
  console.log(`GOOGLE_CLIENT_ID: ${process.env.GOOGLE_CLIENT_ID}`);
  console.log(`GOOGLE_CLIENT_SECRET: ${process.env.GOOGLE_CLIENT_SECRET}`);
  console.log(`Serving index.html from: ${path.join(__dirname, 'public', 'index.html')}`);
  console.log(`Starting server on port: ${PORT}`);
});
