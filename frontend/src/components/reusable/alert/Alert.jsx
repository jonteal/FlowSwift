import { useState } from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";

export const Alert = ({ variant, content }) => {
  const [show, setShow] = useState(true);

  const { heading, content } = content;

  return (
    <>
      <Alert show={show} variant={variant} dismissible>
        <Alert.Heading>{heading}</Alert.Heading>
        <p>{body}</p>
        <hr />
        {/* <div className="d-flex justify-content-end">
          <Button onClick={() => setShow(false)} variant="outline-success">
            Close me
          </Button>
        </div> */}
      </Alert>

      {!show && <Button onClick={() => setShow(true)}>Show Alert</Button>}
    </>
  );
};
