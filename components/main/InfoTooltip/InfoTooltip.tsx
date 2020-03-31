import { faInfo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { UncontrolledTooltip } from "reactstrap";
import "./InfoTooltip.scss";

export default function InfoTooltip(props) {
  const randomId = Math.random()
    .toString(36)
    .replace(/[^a-z]+/g, "")
    .substr(2, 10);
  return (
    <>
      <FontAwesomeIcon icon={faInfo} className="info-icon" id={randomId} />
      <UncontrolledTooltip
        placement="bottom"
        target={randomId}
        innerClassName="info-tooltip"
        arrowClassName="info-tooltip-arrow"
      >
        {props.children}
      </UncontrolledTooltip>
    </>
  );
}
