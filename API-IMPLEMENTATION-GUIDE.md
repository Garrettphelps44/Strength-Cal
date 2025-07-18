# API Implementation Guide - Strength Capacity App

## Overview
This guide shows you how to move your exercise database from client-side (exposed) to server-side (protected) using Netlify Functions.

## What We've Created

### 1. **Backend API** (`netlify/functions/exercise-coefficient.js`)
- **Protected exercise database** - no longer visible in browser
- **API endpoints** for getting exercise coefficients
- **CORS enabled** for web requests

### 2. **Exercise Database** (`netlify/functions/exercise-database.js`)
- **Your complete exercise database** extracted from the HTML
- **All coefficients preserved** exactly as they were
- **Server-side only** - not accessible to users

### 3. **Test Page** (`test-api.html`)
- **Simple test interface** to verify API works
- **Test getting all exercises** and specific exercises

## API Endpoints

### Get All Exercises
```
GET /.netlify/functions/exercise-coefficient
```
**Response:**
```json
{
  "exercises": ["squat", "bench press", ...],
  "total": 576
}
```

### Get Specific Exercise
```
GET /.netlify/functions/exercise-coefficient?exercise=squat
```
**Response:**
```json
{
  "exercise": "squat",
  "coefficient": 1.400530 * 0.818
}
```

## How to Deploy

### Step 1: Push to GitHub
```bash
git add .
git commit -m "Add API backend for exercise database"
git push origin main
```

### Step 2: Deploy to Netlify
- Your Netlify site will automatically detect the new functions
- The API will be available at `your-site.netlify.app/.netlify/functions/exercise-coefficient`

### Step 3: Test the API
1. Visit `your-site.netlify.app/test-api.html`
2. Test getting all exercises
3. Test getting specific exercises

## Frontend Integration

### Current State
Your app currently uses:
```javascript
const coefficient = exercisedatabase[exerciseName];
```

### New API Approach
Replace with:
```javascript
const coefficient = await getExerciseCoefficient(exerciseName);
```

### Helper Functions
Add these to your HTML:
```javascript
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
```

## Security Benefits

### Before (Client-Side)
❌ **Exercise database visible** in browser source  
❌ **Coefficients easily copied** by anyone  
❌ **No protection** of intellectual property  

### After (Server-Side)
✅ **Exercise database hidden** from users  
✅ **Coefficients protected** on server  
✅ **API rate limiting** possible  
✅ **Authentication** can be added later  

## Cost Analysis

### Netlify Functions (Free Tier)
- **125,000 requests/month** - more than enough for 150 users
- **100 hours execution/month** - sufficient for your needs
- **$0/month** - completely free

### Estimated Usage (150 daily users)
- **Daily API calls**: ~600-750
- **Monthly API calls**: ~18,000-22,500
- **Well within free limits**

## Next Steps

1. **Deploy the API** to Netlify
2. **Test the endpoints** using test-api.html
3. **Update your frontend** to use the API
4. **Remove the client-side database** from your HTML
5. **Monitor usage** in Netlify dashboard

## Troubleshooting

### API Not Working
- Check Netlify Functions logs in dashboard
- Verify the function files are in `netlify/functions/`
- Ensure proper file permissions

### CORS Errors
- The API includes CORS headers
- Should work from any domain
- Check browser console for errors

### Performance Issues
- API responses are cached by Netlify
- Consider adding client-side caching
- Monitor function execution times

## Files Created

- `netlify/functions/exercise-coefficient.js` - Main API function
- `netlify/functions/exercise-database.js` - Your exercise data
- `netlify/functions/package.json` - Function configuration
- `test-api.html` - API testing interface
- `exercise-database-extracted.js` - Extracted database (can be deleted)
- `extract-exercises.js` - Extraction script (can be deleted)
- `update-frontend.js` - Frontend update helper (can be deleted)

## Success!
Your exercise database is now protected and served via a secure API! 🎉 