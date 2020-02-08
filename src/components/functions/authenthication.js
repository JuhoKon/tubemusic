import axios from "axios";

export const login = (email, password) => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  const body = JSON.stringify({ email, password });
  console.log("Hello");
  axios
    .post("http://localhost:8080/auth", body, config)
    .then(res => localStorage.setItem("token", res.data.token));
};
export const logout = () => {
  localStorage.removeItem("token");
};
export const signup = () => {};

export const loadUser = async () => {
  //Load user

  const config = {
    headers: {
      "Content-type": "application/json"
    }
  };
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["x-auth-token"] = token;
    let res = await axios.get("http://localhost:8080/auth/user", config);

    return res;
  } else {
    return null;
  }
};
