import { useState } from "react";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";

import { TAB } from "../utils/constants";

const Header = (props) => {
  const [name, setName] = useState("");
  return (
    <Navbar bg="light">
      <Navbar.Brand className="ms-5 nav-header">
        {props.tab === TAB.SEARCH ? "Search For A User" : "Favourites"}
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarScroll" />
      <Navbar.Collapse id="navbarScroll">
        <Nav
          fill
          variant="tabs"
          className="mr-auto my-2 my-lg-0"
          style={{ maxHeight: "100px" }}
          navbarScroll
        >
          <Nav.Item>
            <Nav.Link onClick={() => props.setTab(TAB.SEARCH)}>Search</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link onClick={() => props.setTab(TAB.FAVOURITE)}>
              Favourites
            </Nav.Link>
          </Nav.Item>
        </Nav>
        <Form className="ms-auto me-2">
          <Form.Control
            type="text"
            name="gistUsername"
            placeholder={"Enter Git Username"}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form>
        <Button
          className="me-2"
          variant="primary"
          onClick={() => {
            props.onClickSearch(name);
            props.setTab(TAB.SEARCH);
          }}
        >
          {props.loading ? (
            <Spinner
              as="span"
              animation="grow"
              size="sm"
              role="status"
              aria-hidden="true"
            />
          ) : null}
          Search Gists
        </Button>
        <Button
          className="me-5"
          variant="outline-secondary"
          onClick={() => {
            props.onRefresh();
            props.setTab(TAB.SEARCH);
          }}
        >
          Refresh
        </Button>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
