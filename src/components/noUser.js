import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Empty from "../assets/suchEmpty.png";

const NoUser = () => {
  return (
    <>
      <Row className="justify-content-md-center mt-5">
        <Col xs={6} className="justify-content-md-center">
          <img className={"splash-img"} src={Empty} alt="Empty" />
        </Col>
      </Row>
      <Row className="justify-content-md-center mt-5">
        <Col xs={12} className="justify-content-md-center text-center">
          ❌ No Such User (Wow, Such Missing)
        </Col>
      </Row>
    </>
  );
};

export default NoUser;
