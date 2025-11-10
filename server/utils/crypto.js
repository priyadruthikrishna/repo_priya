const crypto = require('crypto');
const SECRET = process.env.AES_SECRET || '0123456789abcdef0123456789abcd'; // fallback

function encryptJSON(obj) {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(SECRET), iv);
  const json = JSON.stringify(obj || {});
  let encrypted = cipher.update(json, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return iv.toString('hex') + ':' + encrypted;
}

function decryptJSON(payload) {
  try {
    const [ivHex, encrypted] = payload.split(':');
    const iv = Buffer.from(ivHex, 'hex');
    const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(SECRET), iv);
    let dec = decipher.update(encrypted, 'hex', 'utf8');
    dec += decipher.final('utf8');
    return JSON.parse(dec);
  } catch (e) {
    console.error('Decrypt error', e);
    return null;
  }
}

module.exports = { encryptJSON, decryptJSON };