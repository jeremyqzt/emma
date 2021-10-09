import { useState, useRef } from "react";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import Overlay from "react-bootstrap/Overlay";
import Tooltip from "react-bootstrap/Tooltip";

import SyntaxHighlight from "./syntaxHighlighter";

import "../styles/gists.css";

const GistRenderer = (props) => {
  const files_obj = props.gist.files || {};
  const files = Object.keys(files_obj);
  const [show, setShow] = useState(false);
  const target = useRef(null);

  return (
    <>
      <Row className={"mt-5 align-items-center"}>
        <Row>
          <Col xs={1}>
            <Image
              src={props.gist.owner.avatar_url}
              className={"avatar_image"}
              roundedCircle
            />
          </Col>
          <Col xs={4}>
            <Row>
              <p>
                <b>{props.gist.owner.login}</b>
              </p>
            </Row>
            <Row>
              <p>{`${props.gist.description}`}</p>
            </Row>
          </Col>
          <Col xs={5}>
            <Row>
              <p>
                <a
                  href={`${props.gist?.html_url}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  Visit Gist Page
                </a>
              </p>
            </Row>
            <Row>
              <p>{`${files.length} File${
                files.length > 1 ? "s" : ""
              } in this Gist${
                files.length > 2 ? " - Some files truncated." : ""
              }`}</p>
            </Row>
          </Col>
          <Col xs={2} className={"favourite-btn-container"}>
            <Button
              ref={target}
              variant="light"
              onClick={() => {
                setShow(!show);
                props.addFavs({ ...props.gist });
              }}
            >
              🌟 Favourite
            </Button>
            <Overlay target={target.current} show={show} placement="left">
              {(props) => (
                <Tooltip id="overlay-example" {...props}>
                  Added To Favourites
                </Tooltip>
              )}
            </Overlay>
          </Col>
        </Row>
      </Row>
      <Row className={"gist-container mt-1 mb-1"}>
        {files.slice(0, 2).map((file, idx) => (
          <Col xs={files.length === 1 ? 12 : 6} key={`syn-${idx}`}>
            <SyntaxHighlight file={files_obj[file]} skip={idx >= 3} />
          </Col>
        ))}
      </Row>
      <hr className={"mb-5"} />
    </>
  );
};

export default GistRenderer;
