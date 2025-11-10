require('dotenv').config();
const cloudinary = require('./config/cloudinary');

console.log('Testing Cloudinary Configuration...');
console.log('Cloud Name:', process.env.CLOUDINARY_CLOUD_NAME);
console.log('API Key:', process.env.CLOUDINARY_API_KEY);
console.log('API Secret:', process.env.CLOUDINARY_API_SECRET ? '***configured***' : 'MISSING');

// Test connection
cloudinary.api.ping()
  .then(result => {
    console.log('\n✅ Cloudinary connection successful!');
    console.log('Response:', result);
  })
  .catch(error => {
    console.error('\n❌ Cloudinary connection failed!');
    console.error('Error:', error.message);
    if (error.error) {
      console.error('Details:', error.error);
    }
  });
