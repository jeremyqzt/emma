import Empty from "../assets/suchEmpty.png";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const NoGists = () => {
  return (
    <>
      <Row className="justify-content-md-center mt-5">
        <Col xs={6} className="justify-content-md-center">
          <img className={"splash-img"} src={Empty} alt="Empty" />
        </Col>
      </Row>
      <Row className="justify-content-md-center mt-5">
        <Col xs={12} className="justify-content-md-center text-center">
          ❌ No Gists For This User (Wow, Such Empty)
        </Col>
      </Row>
    </>
  );
};

export default NoGists;
