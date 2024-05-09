import { ReactNode } from "react";
import { Col, Container, Row } from "react-bootstrap";

export type FormContainerProps = {
  children: ReactNode;
};

export const FormContainer = ({ children }: FormContainerProps) => (
  <Container>
    <Row className="justify-content-md-center mt-5">
      <Col xs={12} md={6} className="card p-5">
        {children}
      </Col>
    </Row>
  </Container>
);
