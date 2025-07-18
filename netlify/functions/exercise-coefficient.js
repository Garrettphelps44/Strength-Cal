exports.handler = async (event, context) => {
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

  // Your exercise database - COPY AND PASTE YOUR ENTIRE exercisedatabase OBJECT HERE
  const exercisedatabase = {
    // ============================================
    // COPY YOUR ENTIRE EXERCISE DATABASE HERE
    // Replace this comment with your actual exercisedatabase object
    // ============================================
    
    // Example format (replace with your actual data):
    "two dowel stationary lunge": 0.540942 * 0.53,
    "contralateral dowel stationary lunge": 0.622004 * 0.53,
    "ipsilateral dowel stationary lunge": 0.647742 * 0.53,
    // ... paste all your exercises here
  };

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
}; 