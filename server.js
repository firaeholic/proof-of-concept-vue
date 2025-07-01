import express from 'express';
import jwt from 'jsonwebtoken';
import cors from 'cors';

const app = express();
const PORT = 3001;
const JWT_SECRET = 'your-secret-key-here';

// Middleware
app.use(cors());
app.use(express.json());

// Mock users database
const mockUsers = {
  'creator@example.com': {
    password: 'password123',
    email: 'creator@example.com',
    email_verified: true,
    'custom:role': 'creator',
    'custom:kyc': '0',
    'custom:first_time_user': '1'
  },
  'fan@example.com': {
    password: 'password123',
    email: 'fan@example.com',
    email_verified: true,
    'custom:role': 'fan',
    'custom:kyc': '1',
    'custom:first_time_user': '0'
  },
  'vendor@example.com': {
    password: 'password123',
    email: 'vendor@example.com',
    email_verified: true,
    'custom:role': 'vendor',
    'custom:kyc': '1',
    'custom:first_time_user': '0'
  },
  'agent@example.com': {
    password: 'password123',
    email: 'agent@example.com',
    email_verified: true,
    'custom:role': 'agent',
    'custom:kyc': '1',
    'custom:first_time_user': '0'
  },
  'newcreator@example.com': {
    password: 'password123',
    email: 'newcreator@example.com',
    email_verified: false,
    'custom:role': 'creator',
    'custom:kyc': '0',
    'custom:first_time_user': '1'
  }
};

// POST /login endpoint
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  // Check if user exists
  const user = mockUsers[email];
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  // Check password
  if (user.password !== password) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  // Create JWT payload mimicking AWS Cognito claims
  const payload = {
    sub: `user-${Date.now()}`, // User ID
    email: user.email,
    email_verified: user.email_verified,
    'custom:role': user['custom:role'],
    'custom:kyc': user['custom:kyc'],
    'custom:first_time_user': user['custom:first_time_user'],
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24) // 24 hours
  };

  // Sign the token
  const token = jwt.sign(payload, JWT_SECRET);

  res.json({
    token,
    user: {
      email: user.email,
      role: user['custom:role'],
      kyc: user['custom:kyc'],
      first_time_user: user['custom:first_time_user'],
      email_verified: user.email_verified
    }
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Mock auth server running on http://localhost:${PORT}`);
  console.log('Available test users:');
  Object.keys(mockUsers).forEach(email => {
    const user = mockUsers[email];
    console.log(`  ${email} (${user['custom:role']}, kyc: ${user['custom:kyc']}, first_time: ${user['custom:first_time_user']}, verified: ${user.email_verified})`);
  });
});