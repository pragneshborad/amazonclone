// import axios from "axios";

// const instance = axios.create({
//   baseURL: "https://amazon-backend-app.herokuapp.com",
// });

// export default instance;
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8000',  // Set this to your local backend
});

export default instance;
