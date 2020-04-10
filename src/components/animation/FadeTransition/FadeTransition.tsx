import React from "react";
import "./FadeTransition.scss";

class FadeTransition extends React.Component {
  public componentDidMount(): void {
    if (process.browser) {
      document.querySelector(".fade-transition").setAttribute("style", "opacity: 1;");
    }
  }

  public render() {
    return <div className="fade-transition">{this.props.children}</div>;
  }
}

export default FadeTransition;
