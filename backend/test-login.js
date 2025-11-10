const fetch = require('node-fetch');

async function testLogin() {
  console.log('=== Testing Login Functionality ===\n');
  
  const testEmail = 'test@example.com';
  const testPassword = 'password123';
  
  try {
    console.log('1. Attempting to login with:');
    console.log('   Email:', testEmail);
    console.log('   Password:', testPassword);
    console.log('');
    
    const response = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: testEmail,
        password: testPassword,
      }),
    });
    
    console.log('2. Response Status:', response.status, response.statusText);
    console.log('');
    
    const data = await response.json();
    console.log('3. Response Data:');
    console.log(JSON.stringify(data, null, 2));
    console.log('');
    
    if (response.ok) {
      console.log('✅ LOGIN SUCCESSFUL!');
      console.log('Token received:', data.token ? 'Yes' : 'No');
      console.log('User data:', data.user ? 'Yes' : 'No');
    } else {
      console.log('❌ LOGIN FAILED!');
      console.log('Error message:', data.message);
      
      if (data.needsVerification) {
        console.log('⚠️  Email needs verification');
      }
    }
    
  } catch (error) {
    console.error('❌ ERROR:', error.message);
  }
  
  console.log('\n=== Test Complete ===');
}

// Also check what users exist in database
async function checkUsers() {
  try {
    console.log('\n=== Checking Users in Database ===\n');
    
    const response = await fetch('http://localhost:5000/api/auth/debug/users');
    const users = await response.json();
    
    console.log(`Found ${users.length} users:`);
    users.forEach((user, index) => {
      console.log(`\n${index + 1}. User:`);
      console.log('   Email:', user.email);
      console.log('   Name:', user.firstName, user.lastName);
      console.log('   Phone:', user.phone);
      console.log('   Verified:', user.isVerified);
      console.log('   Password Hash Length:', user.passwordLength);
    });
    
  } catch (error) {
    console.error('Error checking users:', error.message);
  }
}

async function runTests() {
  await checkUsers();
  await testLogin();
}

runTests();
