const fs = require('fs');

// Read the HTML file
const htmlContent = fs.readFileSync('index.html', 'utf8');

// Find the exercisedatabase object
const startMarker = 'const exercisedatabase = {';
const endMarker = '};';

const startIndex = htmlContent.indexOf(startMarker);
const endIndex = htmlContent.indexOf(endMarker, startIndex);

if (startIndex !== -1 && endIndex !== -1) {
  // Extract the database content
  const databaseContent = htmlContent.substring(
    startIndex + startMarker.length,
    endIndex
  );
  
  console.log('// Copy this entire object and replace the exercisedatabase in netlify/functions/exercise-coefficient.js:');
  console.log('const exercisedatabase = {');
  console.log(databaseContent);
  console.log('};');
  
  // Also save to a file for easy copying
  fs.writeFileSync('exercise-database-extracted.js', 
    'const exercisedatabase = {\n' + databaseContent + '\n};'
  );
  
  console.log('\n✅ Exercise database extracted and saved to exercise-database-extracted.js');
  console.log('📋 You can now copy the content from that file to your API function');
} else {
  console.log('❌ Could not find exercisedatabase in the HTML file');
} 