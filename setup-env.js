const fs = require('fs');

const envContent = `DATABASE_URL="postgresql://postgres:password@localhost:5432/buildgaming"
JWT_SECRET="build-gaming-super-secret-jwt-secret-key-2024"
JWT_EXPIRES_IN="7d"
NEXTAUTH_SECRET="build-gaming-nextauth-secret-key-2024"
NEXTAUTH_URL="http://localhost:3000"`;

fs.writeFileSync('.env', envContent);
console.log('Created .env file with required variables'); 