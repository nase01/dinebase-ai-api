import crypto from 'crypto';

const generateSessionToken = () => {
  const randomData = crypto.randomBytes(16).toString('hex');
  return crypto.createHash('md5').update(randomData).digest('hex');
}

export {
  generateSessionToken,
};