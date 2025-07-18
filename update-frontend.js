const fs = require('fs');

// Read the HTML file
const htmlContent = fs.readFileSync('index.html', 'utf8');

// Function to get exercise coefficient from API
const apiFunction = `
// Function to get exercise coefficient from API
async function getExerciseCoefficient(exerciseName) {
    try {
        const response = await fetch('/.netlify/functions/exercise-coefficient?exercise=' + encodeURIComponent(exerciseName));
        const data = await response.json();
        if (data.error) {
            console.error('Exercise not found:', exerciseName);
            return null;
        }
        return data.coefficient;
    } catch (error) {
        console.error('Error fetching exercise coefficient:', error);
        return null;
    }
}

// Function to get all exercises from API
async function getAllExercises() {
    try {
        const response = await fetch('/.netlify/functions/exercise-coefficient');
        const data = await response.json();
        return data.exercises || [];
    } catch (error) {
        console.error('Error fetching exercises:', error);
        return [];
    }
}
`;

// Find where the exercisedatabase is defined and replace it
const startMarker = 'const exercisedatabase = {';
const endMarker = '};';

const startIndex = htmlContent.indexOf(startMarker);
const endIndex = htmlContent.indexOf(endMarker, startIndex);

if (startIndex !== -1 && endIndex !== -1) {
    // Replace the exercisedatabase with API functions
    const newContent = htmlContent.substring(0, startIndex) + 
                      apiFunction + 
                      htmlContent.substring(endIndex + 2);
    
    // Write the updated content
    fs.writeFileSync('index-api.html', newContent);
    
    console.log('✅ Updated HTML file created as index-api.html');
    console.log('📋 You can now:');
    console.log('   1. Review the changes in index-api.html');
    console.log('   2. Replace your current index.html with the new version');
    console.log('   3. Update any code that uses exercisedatabase to use the new API functions');
} else {
    console.log('❌ Could not find exercisedatabase in the HTML file');
} 