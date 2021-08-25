import { createContext, useContext, useState, useMemo, useEffect } from 'react';
import { pricePerItem } from '../constants';

// @ts-ignore
const OrderDetails = createContext();

//helper function to format number to currency
export const formatToCurrency = (amount) => {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: 2,
  }).format(amount);
};

// create custom hook to check if we are inside of a provider
export const useOrderDetails = () => {
  const context = useContext(OrderDetails);

  if (!context) {
    throw new Error('userOrderDetails must be used within an OrderDetailsProvider');
  }

  return context;
};

// helper function to return total of each category of items.
const calculateSubTotal = (optionType, optionCounts) => {
  let optionCountTally = 0;
  for (const count of optionCounts[optionType].values()) {
    // console.log(count);
    optionCountTally += count;
  }
  return optionCountTally * pricePerItem[optionType];
};

// create Provider
export const OrderDetailsProvider = (props) => {
  const [optionCounts, setOptionCounts] = useState({
    scoops: new Map(),
    toppings: new Map(),
  });

  // state for totals.
  const currencyConvert = formatToCurrency(0);

  const [totals, setTotals] = useState({
    scoops: currencyConvert,
    toppings: currencyConvert,
    grandTotal: currencyConvert,
  });

  useEffect(() => {
    const scoopsSubTotal = calculateSubTotal('scoops', optionCounts);
    const toppingsSubTotal = calculateSubTotal('toppings', optionCounts);
    const grandTotal = scoopsSubTotal + toppingsSubTotal;
    setTotals({
      scoops: formatToCurrency(scoopsSubTotal),
      toppings: formatToCurrency(toppingsSubTotal),
      grandTotal: formatToCurrency(grandTotal),
    });
  }, [optionCounts]);

  const value = useMemo(() => {
    const updateItemCount = (itemName, newItemCount, optionType) => {
      // create new copy of current state of option so to not mutate original.
      const newOptionCounts = { ...optionCounts };
      // update option count for this item with the new count value ex:(option = scoops, item = Vanilla, amount = 1).
      const optionCountMap = optionCounts[optionType];
      optionCountMap.set(itemName, parseInt(newItemCount));

      setOptionCounts(newOptionCounts);
    };

    // getter: object containing 'option count' for scoops and toppings, sub-totals & totals.
    // setter: update option count.
    return [{ ...optionCounts, totals }, updateItemCount];
  }, [optionCounts, totals]);

  return <OrderDetails.Provider value={value} {...props} />;
};
