import { authenticationService } from "./authenthication";

export function handleError(response) {
  console.log("This we got", response);
  return response;
}
