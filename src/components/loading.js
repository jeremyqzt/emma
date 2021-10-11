import Spinner from "react-bootstrap/Spinner";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
const Loading = () => {
  return (
    <Row
      className="justify-content-md-center mt-5"
      data-testid="loading-element"
    >
      <Col xs={2} className="justify-content-md-center">
        <Spinner animation="border" size="lg" />
      </Col>
    </Row>
  );
};

export default Loading;
