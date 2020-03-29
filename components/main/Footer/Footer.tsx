import React from "react";
import { Container, Row } from "reactstrap";

function Footer() {
  return (
    <footer className={"footer"}>
      <Container>
        <Row>
          <div className="credits m-auto">
            <div className="copyright">
              &copy; {new Date().getFullYear()}, made with{" "}
              <i className="fa fa-heart heart" /> by Julien Sulpis
            </div>
          </div>
        </Row>
        <Row>
          <div className="copyright m-auto">
            Theme{" "}
            <a
              href="https://www.creative-tim.com/product/paper-dashboard-react"
              target="_blank"
            >
              Paper Dashboard React
            </a>{" "}
            by{" "}
            <a href="https://www.creative-tim.com" target="_blank">
              Creative Tim
            </a>
          </div>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
