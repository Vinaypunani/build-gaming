const { exec } = require('child_process');

console.log('Setting up the database...');

// Run Prisma commands in sequence
exec('npx prisma generate', (error, stdout, stderr) => {
  if (error) {
    console.error(`Error generating Prisma client: ${error.message}`);
    return;
  }
  console.log('Prisma client generated successfully');
  console.log(stdout);

  console.log('Trying to push the schema to the database...');
  exec('npx prisma db push', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error pushing schema to database: ${error.message}`);
      console.log('You may need to create the database manually or check connection details in .env');
      return;
    }
    console.log('Database schema pushed successfully');
    console.log(stdout);
    
    console.log('Database setup completed!');
  });
}); 