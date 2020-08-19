import React from "react";
import { Badge } from "reactstrap";
/* const getRandomString = () => {
  const randomNumber = Math.random() * 100;
  if (randomNumber > 90) {
    return "dark";
  } else if (randomNumber > 80) {
    return "danger";
  } else if (randomNumber > 70) {
    return "success";
  } else if (randomNumber > 60) {
    return "danger";
  } else if (randomNumber > 50) {
    return "warning";
  } else if (randomNumber > 40) {
    return "info";
  } else if (randomNumber > 30) {
    return "light";
  } else if (randomNumber > 20) {
    return "primary";
  } else {
    return "success";
  }
}; */
const CustomBadge = (props: any) => {
  return (
    <div>
      <Badge
        style={{
          padding: "8px",
          borderRadius: "2rem",
          margin: "5px",
        }}
        href="#"
        color={"info"}
      >
        {props.title}
      </Badge>
    </div>
  );
};

export default CustomBadge;
