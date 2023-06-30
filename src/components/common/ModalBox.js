import FalconCloseButton from './FalconCloseButton';
import Flex from './Flex';
import React from 'react';
import { Modal } from 'react-bootstrap';

const ModalBox = ({ modal, setModal, children, size }) => {
  return (
    <Modal show={modal} size={size} centered>
      <Modal.Body className="p-2">
        <FalconCloseButton
          size="sm"
          className="position-absolute top-0 end-0 me-2 mt-2"
          onClick={() => setModal(!modal)}
        />
        <div className="d-flex flex-column">{children}</div>
      </Modal.Body>
    </Modal>
  );
};

export default ModalBox;
