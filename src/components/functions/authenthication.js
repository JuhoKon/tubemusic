import axios from "axios";
import { BehaviorSubject } from "rxjs";
import { handleError } from "./handleError";
import { tokenConfig } from "./functions";
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
  newToken,
  currentUser: currentUserSubject.asObservable(),
  get currentUserValue() {
    return currentUserSubject.value;
  }
};
function newToken(token) {
  currentUserSubject.next(token);
  localStorage.setItem("token", JSON.stringify(token));
}
function login(email, password) {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  const body = JSON.stringify({ email, password });
  return axios
    .post("http://localhost:8080/auth", body, config)
    .then(res => {
      currentUserSubject.next(res.data);
      localStorage.setItem("token", JSON.stringify(res.data));
    })
    .catch(e => {
      return e.response.data.msg;
    });
  //error handling?
}
function logout() {
  localStorage.removeItem("token");
  currentUserSubject.next(null);
}
function signup() {} //TODO ..duh

async function loadUser() {
  return axios
    .get("http://localhost:8080/auth/user", tokenConfig())
    .then(res => {
      return res.data;
    })
    .catch(err => {
      handleError(err);
    });
}
