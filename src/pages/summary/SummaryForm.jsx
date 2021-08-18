import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const checkBoxLabel = (
  <span>
    I agree to <span style={{ color: 'blue' }}>Terms and Conditions</span>
  </span>
);

const SummaryForm = () => {
  const [tcChecked, setTcChecked] = useState(false);
  return (
    <Form>
      <Form.Group controlId='terms-and-conditions'>
        <Form.Check
          type='checkbox'
          checked={tcChecked}
          onChange={(e) => setTcChecked(e.target.checked)}
          label={checkBoxLabel}
        ></Form.Check>
      </Form.Group>
      <Button variant='primary' type='submit' disabled={!tcChecked}>
        Confirm Order
      </Button>
    </Form>
  );
};

export default SummaryForm;
