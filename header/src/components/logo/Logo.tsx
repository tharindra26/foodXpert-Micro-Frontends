import { Row, Col } from 'antd';
import './Logo.css';
import logo from './foodXpertLogo3.png';

const Logo = () => {
  return (
    <Row className="logo-container">
      {/* <Col>
        <img src={logo} alt="Logo" className="logo-image" />
      </Col> */}
      <Col>
        <div className="logo-text">foodXpert</div>
      </Col>
      
      
    </Row>
  );
};

export default Logo;
