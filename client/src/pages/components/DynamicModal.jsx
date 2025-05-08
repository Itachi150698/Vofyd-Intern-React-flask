import React from "react";
import { Modal, Button } from "react-bootstrap";

const DynamicModal = ({ show, onHide, title, content, footer, size = "md" }) => {
  return (
    <Modal show={show} onHide={onHide} centered size={size}>
      <div className="px-4 py-3">
        <Modal.Header closeButton className="p-0 mb-3">
          <Modal.Title className="text-16">{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-0">{content}</Modal.Body>
        {footer && (
          <Modal.Footer className="p-0 pt-3 border-0">
            {typeof footer === "string" ? (
              <Button variant="secondary">{footer}</Button>
            ) : (
              footer
            )}
          </Modal.Footer>
        )}
      </div>
    </Modal>
  );
};

export default DynamicModal;
