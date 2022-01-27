import { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfo } from "@fortawesome/free-solid-svg-icons";
import { UncontrolledTooltip } from "reactstrap";
import styles from "./InfoTooltip.module.scss";

export const InfoTooltip: FC<{ id: string }> = ({ children, id }) => {
  return (
    <>
      <FontAwesomeIcon icon={faInfo} className={styles.icon} id={id} />
      <UncontrolledTooltip
        placement="bottom"
        target={id}
        innerClassName={styles.info}
        arrowClassName={styles.arrow}
      >
        {children}
      </UncontrolledTooltip>
    </>
  );
};
