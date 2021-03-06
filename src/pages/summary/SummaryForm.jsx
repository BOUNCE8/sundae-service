import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Popover from 'react-bootstrap/Popover';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';

const popover = (
  <Popover>
    <Popover.Content>No ice cream will actually be delivered</Popover.Content>
  </Popover>
);

const checkBoxLabel = (
  <span>
    I agree to
    <OverlayTrigger placement='right' overlay={popover}>
      <span style={{ color: 'blue' }}> Terms and Conditions</span>
    </OverlayTrigger>
  </span>
);

export const SummaryForm = () => {
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
