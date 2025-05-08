import React from "react";
import { Form } from "react-bootstrap";

const DynamicForm = ({ fields }) => {
  return (
    <Form>
      {fields.map((field) => (
        <Form.Group className="mb-3" controlId={field.id} key={field.id}>
          <Form.Label>{field.label}</Form.Label>
          {field.type === "textarea" ? (
            <Form.Control as="textarea" rows={field.rows || 3} placeholder={field.placeholder} />
          ) : (
            <Form.Control type={field.type} placeholder={field.placeholder} />
          )}
        </Form.Group>
      ))}
    </Form>
  );
};

export default DynamicForm;
