import axios from "axios";
import { BehaviorSubject } from "rxjs";
import { handleError } from "./handleError";
try {
  //in case that the token item is invalid, we delete it
  JSON.parse(localStorage.getItem("token"));
} catch {
  localStorage.removeItem("token");
}
const currentUserSubject = new BehaviorSubject(
  JSON.parse(localStorage.getItem("token"))
);

export const authenticationService = {
  login,
  logout,
  signup,
  loadUser,
  currentUser: currentUserSubject.asObservable(),
  get currentUserValue() {
    return currentUserSubject.value;
  }
};
async function login(email, password) {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  const body = JSON.stringify({ email, password });
  let res = await axios.post("http://localhost:8080/auth", body, config);
  currentUserSubject.next(res.data);
  localStorage.setItem("token", JSON.stringify(res.data));
  return res.data.user;
}
function logout() {
  localStorage.removeItem("token");
  currentUserSubject.next(null);
}
function signup() {}

async function loadUser(token) {
  //Load user
  const config = {
    headers: {
      "Content-type": "application/json"
    }
  };

  if (token) {
    config.headers["x-auth-token"] = token;
    return axios
      .get("http://localhost:8080/auth/user", config)
      .then(res => {
        return res.data;
      })
      .catch(err => {
        handleError(err).then(res => {
          return res;
        });
      });
  } else {
    return null;
  }
}
