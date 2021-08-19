import React, { useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row';
import axios from 'axios';
import ScoopOption from './ScoopOption';
import ToppingOption from './ToppingOption';

export const Options = ({ optionType }) => {
  const [items, setItems] = useState([]);
  // optionType is 'scoops' or 'toppings' - create enum to limit this instead
  useEffect(() => {
    axios
      .get(`http://localhost:3030/${optionType}`)
      .then((response) => setItems(response.data))
      .catch((error) => {
        error.log(error);
      });
  }, [optionType]);

  const ItemComponent = optionType === 'scoops' ? ScoopOption : ToppingOption;

  const OptionItems = items.map((item) => (
    <ItemComponent key={item.name} name={item.name} imagePath={item.imagePath} />
  ));

  return <Row>{OptionItems}</Row>;
};

export default Options;
