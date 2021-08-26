import React from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

export const ToppingOption = ({ name, imagePath, updateItemCount }) => {
  const handleChange = () => {
    updateItemCount(name, event.target.value);
  };
  return (
    <Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: 'center' }}>
      <img
        style={{ width: '75%' }}
        src={`http://localhost3030/${imagePath}`}
        alt={`${name} topping`}
      />

      <Form.Group controlId={`${name}-topping-checkbox`} as={Row} style={{ marginTop: '10px' }}>
        <Form.Check
          type='checkbox'
          label={name}
          onChange={(e) => updateItemCount(name, e.target.checked ? 1 : 0)}
        ></Form.Check>
      </Form.Group>
    </Col>
  );
};
