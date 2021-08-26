import { render, screen } from '../../../test-utils/testing-library-utils';
import userEvent from '@testing-library/user-event';
import { Options } from '../Options';
// import { OrderDetailsProvider } from '../../../contexts/OrderDetails';

test('update scoop sub-total when scoops change', async () => {
  // make sure to wrap component in provider that has the context needed.
  render(<Options optionType='scoops' />);

  // make sure the scoops sub-total starts at £0.00 - partial mach
  const scoopsSubTotal = screen.getByText('Scoops total: £', { exact: false });
  expect(scoopsSubTotal).toHaveTextContent('0.00');

  // update vanilla scoops by 1 and update scoops sub-total
  const vanillaScoopInput = await screen.findByRole('spinbutton', { name: 'Vanilla' });
  userEvent.clear(vanillaScoopInput);
  userEvent.type(vanillaScoopInput, '1');
  expect(scoopsSubTotal).toHaveTextContent('1.50');

  // update chocolate scoops by 2 and update scoops sub-total
  const chocolateScoop = await screen.findByRole('spinbutton', { name: 'Chocolate' });
  userEvent.clear(chocolateScoop);
  userEvent.type(chocolateScoop, '2');
  expect(scoopsSubTotal).toHaveTextContent('4.50');
});

test('update toppings sub-total when toppings change', async () => {
  render(<Options optionType='toppings' />);

  const toppingSubtotal = screen.getByText('Toppings total: £', { exact: false });
  expect(toppingSubtotal).toHaveTextContent('0.00');

  // Select the 'Hot fudge' topping and update the toppings sub-total
  const fudgeTopping = await screen.findByRole('checkbox', { name: 'Hot fudge' });
  expect(fudgeTopping).not.toBeChecked();
  userEvent.click(fudgeTopping);
  expect(fudgeTopping).toBeChecked();
  expect(toppingSubtotal).toHaveTextContent('1.00');

  // select another topping 'Cherries' and update the topping sub-total
  const mochiTopping = await screen.findByRole('checkbox', { name: 'Cherries' });
  expect(mochiTopping).not.toBeChecked();
  userEvent.click(mochiTopping);
  expect(mochiTopping).toBeChecked();
  expect(toppingSubtotal).toHaveTextContent('2.00');

  // un-select an option i.e. 'Hot fudge' topping and update topping sub-total
  expect(fudgeTopping).toBeChecked();
  userEvent.click(fudgeTopping);
  expect(fudgeTopping).not.toBeChecked();
  expect(toppingSubtotal).toHaveTextContent('1.00');
});
