import Spinner from "react-bootstrap/Spinner";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
const Loading = () => {
  return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Col xs={2} className="justify-content-md-center">
          <Spinner animation="border" size="lg" />
        </Col>
      </Row>
    </Container>
  );
};

export default Loading;
