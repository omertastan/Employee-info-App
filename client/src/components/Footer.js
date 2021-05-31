import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer>
      <Container>
        <Row>
          <Col>
            <div className='bg-primary text-center p-2'>
              <strong>by Ömer Taştan</strong>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
