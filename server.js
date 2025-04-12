const { RtcTokenBuilder, RtcRole } = require('agora-token');

// Replace these with your real Agora App ID and App Certificate
const APP_ID = 'd4302774d7d948a9985bdd2a884e92b8';
const APP_CERTIFICATE = 'b84c4615051445cdb3dbc792c993b3de';

module.exports = (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  
  // Handle OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  // Handle GET request
  const channelName = req.query.channelName;
  if (!channelName) {
    return res.status(400).json({ error: 'channelName is required' });
  }

  const uid = 0; // 0 means any user can join
  const role = RtcRole.PUBLISHER; // This lets users send video/audio
  const expireTime = 3600; // Token lasts 1 hour (in seconds)

  try {
    const token = RtcTokenBuilder.buildTokenWithUid(
      APP_ID,
      APP_CERTIFICATE,
      channelName,
      uid,
      role,
      Math.floor(Date.now() / 1000) + expireTime
    );

    return res.status(200).json({ token: token });
  } catch (error) {
    console.error('Token generation error:', error);
    return res.status(500).json({ error: 'Failed to generate token' });
  }
};