import { useEffect } from "react";
import "./FadeTransition.scss";

function FadeTransition(props) {
  useEffect(() => {
    document
      .querySelector(".fade-transition")
      .setAttribute("style", "opacity: 1;");
  });

  return <div className="fade-transition">{props.children}</div>;
}

export default FadeTransition;
