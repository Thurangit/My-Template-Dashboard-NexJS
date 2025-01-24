import Axios from "axios";
import settings, { headers } from "./config";



const API = Axios.create({
  baseURL: settings.baseUrl,
  headers: headers
});

API.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error(
        error.response.status,
        error.response.data,
        error.response.headers
      );

      // 400 ==  bad request
      if (error && error.response && error.response.status === 400) {
        Object.values(error.response.data.errors).forEach((value) => {
          let arr = new Array(value);//conver to array
          arr.map((val) => {
            let text = new String(val);//convert to string
            console.error(text.toString());
          });
        });
      }

      // 404 ==  not found
      if (error && error.response && error.response.status === 404) {
        console.error(error.reponse);
      }

      // 500 ==  internal server error
      if (error && error.response && error.response.status === 500) {
        console.error(error.reponse);
      }


    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.error(error.request);
    }


    // 401 ==  token expired code
    if (error && error.response && error.response.status === 401) {
      //signIn(env.auth.nextAuthId, { callbackUrl: "/" });
      // logout when token expire
    }
    console.log((error && error.toJSON && error.toJSON()) || undefined);

    return Promise.reject(error);
  }
);

export default API;
