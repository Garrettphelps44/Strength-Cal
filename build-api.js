const fs = require('fs');

// Read the complete exercise database
const exerciseDatabase = fs.readFileSync('exercise-database-extracted.js', 'utf8');

// Create the Netlify function wrapper
const apiFunction = `exports.handler = async (event, context) => {
  // Enable CORS for web requests
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  // Your complete exercise database
  ${exerciseDatabase}

  try {
    if (event.httpMethod === 'GET') {
      const { exercise } = event.queryStringParameters || {};
      
      if (exercise) {
        // Return specific exercise coefficient
        const coefficient = exercisedatabase[exercise.toLowerCase()];
        
        if (coefficient !== undefined) {
          return {
            statusCode: 200,
            headers: {
              ...headers,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              exercise: exercise,
              coefficient: coefficient
            })
          };
        } else {
          return {
            statusCode: 404,
            headers: {
              ...headers,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              error: 'Exercise not found',
              exercise: exercise
            })
          };
        }
      } else {
        // Return all exercises
        return {
          statusCode: 200,
          headers: {
            ...headers,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            exercises: Object.keys(exercisedatabase),
            total: Object.keys(exercisedatabase).length
          })
        };
      }
    }

    return {
      statusCode: 405,
      headers: {
        ...headers,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        error: 'Method not allowed'
      })
    };

  } catch (error) {
    return {
      statusCode: 500,
      headers: {
        ...headers,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        error: 'Internal server error',
        message: error.message
      })
    };
  }
};`;

// Write the complete API function
fs.writeFileSync('netlify/functions/exercise-coefficient.js', apiFunction);

console.log('✅ API function built successfully with complete exercise database');
console.log(`📊 Total exercises: ${exerciseDatabase.split('\n').filter(line => line.includes(':')).length}`); 