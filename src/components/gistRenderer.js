import { useRef, useState } from "react";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";

import SyntaxHighlight from "./syntaxHighlighter";

import "../styles/gists.css";

const GistRenderer = (props) => {
  const files_obj = props.gist.files || {};
  const files = Object.keys(files_obj);
  const target = useRef(null);
  const isFavourites = props.isFavourites || false;
  const [loadFavs, setLoadFavs] = useState(Boolean(props.shouldFetchGists));

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
          <Col xs={4}>
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
          <Col xs={3} className={"favourite-btn-container"}>
            <Row>
              <Col xs={12}>
                {!isFavourites ? (
                  <Button
                    variant={
                      props.alreadyFaved ? "outline-info" : "outline-success"
                    }
                    ref={target}
                    disabled={props.alreadyFaved}
                    onClick={() => {
                      props.addFavs({ ...props.gist });
                    }}
                  >
                    {!props.alreadyFaved ? "🌟 Favourite" : "✔️ Favourited"}
                  </Button>
                ) : (
                  <Button
                    variant="outline-danger"
                    ref={target}
                    onClick={() => {
                      props.removeFav(props.gist.id);
                    }}
                  >
                    {"🛑 Un-Favourite"}
                  </Button>
                )}
              </Col>
              <Col xs={12} className={"mt-1"}>
                {!loadFavs ? (
                  <Button
                    variant="outline-info"
                    ref={target}
                    onClick={() => {
                      setLoadFavs(true);
                    }}
                  >
                    {"⚓ Load Files"}
                  </Button>
                ) : null}
              </Col>
            </Row>
          </Col>
        </Row>
      </Row>
      <Row className={"gist-container mt-1 mb-1"}>
        {files.slice(0, 2).map((file, idx) => (
          <Col xs={files.length === 1 ? 12 : 6} key={`syn-${idx}`}>
            <SyntaxHighlight file={files_obj[file]} skip={!loadFavs} />
          </Col>
        ))}
      </Row>
      <hr className={"mb-5"} />
    </>
  );
};

export default GistRenderer;
