import React from 'react';
import { Options } from './Options';
import { useOrderDetails } from '../../contexts/OrderDetails';

export const OrderEntry = () => {
  const [orderDetails] = useOrderDetails();
  return (
    <div>
      <h1>Design your Sundae!</h1>
      <Options optionType='scoops' />
      <Options optionType='toppings' />
      <h2>Grand Total: {orderDetails.totals.grandTotal}</h2>
    </div>
  );
};
