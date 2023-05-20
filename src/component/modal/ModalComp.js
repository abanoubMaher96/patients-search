import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";

const ModalComp = ({
  modaltitle,
  modalBody,
  btnText,
  onConfirm = () => {},
}) => {
  const [show, setShow] = useState(false);

  const handleToggle = () => setShow(!show);

  return (
    <>
      <Button variant="primary" onClick={handleToggle}>
        {btnText}
      </Button>

      <Modal show={show} onHide={handleToggle}>
        <Modal.Header closeButton>
          <Modal.Title>{modaltitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalBody}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleToggle}>
            Close
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              onConfirm();
              handleToggle();
            }}
          >
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalComp;
