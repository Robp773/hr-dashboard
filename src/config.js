let API_BASE_URL; 
if(process.env.NODE_ENV==='production') { 
  API_BASE_URL= 'https://lit-hamlet-54666.herokuapp.com';
} else {  
  API_BASE_URL='http://localhost:8080';
} 

module.exports = {
  PORT: process.env.PORT || 8080,
  // other stuff
  API_BASE_URL: API_BASE_URL
}; 