import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Start from "../assets/start.png";

const NoSearch = () => {
  return (
    <>
      <Row className="justify-content-md-center mt-5">
        <Col xs={4} className="justify-content-md-center">
          <img className={"splash-img"} src={Start} alt="Start" />
        </Col>
      </Row>
      <Row className="justify-content-md-center mt-5">
        <Col xs={12} className="justify-content-md-center text-center">
          👋 Hello, Welcome to the Gist Demo App.
        </Col>
      </Row>
      <Row className="justify-content-md-center mt-5">
        <Col xs={12} className="justify-content-md-center text-center">
          ⌨️ Enter A Username In the Top Right to Get Started!
        </Col>
      </Row>
    </>
  );
};

export default NoSearch;
