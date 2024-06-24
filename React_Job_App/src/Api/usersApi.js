// api/usersApi.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3001',  // Replace with your JSON Server URL
  timeout: 10000,  // Timeout in milliseconds (optional)
  headers: {
    'Content-Type': 'application/json',
  },
});

//#region Registration API
export const checkUserExists = async (email) => {
  try {
    const response = await instance.get(`/users?email=${email}`);
    return response.data.length > 0; // Return true if user with email exists, false otherwise
  } catch (error) {
    console.error('Error checking user existence:', error);
    throw error;
  }
};
export const registerUser = async (userData) => {
  try {
    const response = await instance.post('/users', userData);
    return response.data;  // Assuming JSON Server returns created user data
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;  // Optionally handle error as needed
  }
};
//#endregion

//#region login api
export const validateLogin = async (email, password) => {
  try {
    const response = await instance.get(`/users?email=${email}`);
    const users = response.data;
    // Find user with matching email
    const user = users.find(user => user.email === email);
    if (!user) {
      return false; // If user with email not found, return false
    }
    // Check if password matches
    return user.password === password;
  } catch (error) {
    console.error('Validate login error:', error);
    throw error;
  }
};

// Login user function to fetch user data upon successful login
export const loginUser = async (email) => {
  try {
    const response = await instance.get(`/users?email=${email}`);
    return response.data[0]; // Return user data upon successful login
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

//#endregion

export const getUserProfile = async (email) => {
  try {
    const response = await instance.get(`/profiles?email=${email}`);
    return response.data[0]; // Assuming you fetch a single profile based on email
  } catch (error) {
    throw error; // Handle error in component where this function is called
  }
}



export default instance;
