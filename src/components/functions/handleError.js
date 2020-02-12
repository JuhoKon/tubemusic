import { authenticationService } from "./authenthication";

export function handleError(err) {
  if (err.response.status === 400 || err.response.status === 401) {
    alert(
      "You are unauthorized, please login again. If this issue persists, please be in contact with the administrators."
    );
    authenticationService.logout();
    window.location.reload(true);
  }
  return err.response;
}
