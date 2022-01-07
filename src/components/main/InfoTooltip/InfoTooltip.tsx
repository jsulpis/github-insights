import { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfo } from "@fortawesome/free-solid-svg-icons";
import { UncontrolledTooltip } from "reactstrap";
import styles from "./InfoTooltip.module.scss";

export const InfoTooltip: FC = ({ children }) => {
  const randomId = Math.random()
    .toString(36)
    .replace(/[^a-z]+/g, "")
    .slice(2, 10);
  return (
    <>
      <FontAwesomeIcon icon={faInfo} className={styles.icon} id={randomId} />
      <UncontrolledTooltip
        placement="bottom"
        target={randomId}
        innerClassName={styles.info}
        arrowClassName={styles.arrow}
      >
        {children}
      </UncontrolledTooltip>
    </>
  );
};
