const express = require('express');
const { RtcTokenBuilder, RtcRole } = require('agora-token');
const app = express();
const port = 8080;

// Replace these with your real Agora App ID and App Certificate
const APP_ID = 'd4302774d7d948a9985bdd2a884e92b8';
const APP_CERTIFICATE = 'b84c4615051445cdb3dbc792c993b3de';

app.use(express.json());

app.get('/get-token', (req, res) => {
  const channelName = req.query.channelName;
  if (!channelName) {
    return res.status(400).json({ error: 'channelName is required' });
  }

  const uid = 0; // 0 means any user can join
  const role = RtcRole.PUBLISHER; // This lets users send video/audio
  const expireTime = 3600; // Token lasts 1 hour (in seconds)

  const token = RtcTokenBuilder.buildTokenWithUid(
    APP_ID,
    APP_CERTIFICATE,
    channelName,
    uid,
    role,
    Math.floor(Date.now() / 1000) + expireTime
  );

  res.json({ token: token });
});

app.listen(port, () => {
  console.log(`Token server running at http://localhost:${port}`);
});