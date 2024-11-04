import React from "react";
import { Col } from "react-bootstrap";

import { NavLink } from "react-router-dom";
import "../Styles/ComponentStyles/footer.css";

function FooterComp() {
  return (
    <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
      <Col className="col-md-4 d-flex align-items-center">
        <span className="mb-3 mb-md-0 text-body-secondary custom-text-color">
          © 2024 rekeni, Inc
        </span>
      </Col>

      <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
        <li className="ms-3">
          <NavLink className="text-body-secondary" href="#">
            <svg className="bi" width="24" height="24"></svg>
          </NavLink>
        </li>
        <li className="ms-3">
          <NavLink className="text-body-secondary" href="#">
            <svg className="bi" width="24" height="24"></svg>
          </NavLink>
        </li>
        <li className="ms-3">
          <NavLink className="text-body-secondary" href="#">
            <svg className="bi" width="24" height="24"></svg>
          </NavLink>
        </li>
      </ul>
    </footer>
  );
}

export default FooterComp;
