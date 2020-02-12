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
async function login(email, password) {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  const body = JSON.stringify({ email, password });
  let res = await axios.post("http://localhost:8080/auth", body, config);
  //error handling?
  currentUserSubject.next(res.data);
  localStorage.setItem("token", JSON.stringify(res.data));
  return res.data.user;
}
function logout() {
  localStorage.removeItem("token");
  currentUserSubject.next(null);
}
function signup() {}

async function loadUser() {
  return axios
    .get("http://localhost:8080/auth/user", await tokenConfig())
    .then(res => {
      return res.data;
    })
    .catch(err => {
      handleError(err);
    });
}
