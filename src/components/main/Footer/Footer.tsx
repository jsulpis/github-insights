import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Container, Row } from "reactstrap";

function Footer() {
  return (
    <footer className={"footer"}>
      <Container>
        <Row>
          <div className="credits m-auto">
            <div className="copyright">
              &copy; 2019-{new Date().getFullYear()}, made with{" "}
              <FontAwesomeIcon
                icon={faHeart}
                style={{ height: "10px", verticalAlign: "initial" }}
              />{" "}
              by <a href="https://github.com/jsulpis">Julien Sulpis</a>
            </div>
          </div>
        </Row>
        <Row>
          <div className="copyright m-auto">
            Code available on{" "}
            <a href="https://github.com/jsulpis/github-insights">GitHub</a>
          </div>
        </Row>
        <Row>
          <div className="copyright m-auto">
            Theme{" "}
            <a href="https://www.creative-tim.com/product/paper-dashboard-react">
              Paper Dashboard React
            </a>{" "}
            by <a href="https://www.creative-tim.com">Creative Tim</a>
          </div>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
