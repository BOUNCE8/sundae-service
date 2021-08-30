import { render, screen } from '../../../test-utils/testing-library-utils';
import userEvent from '@testing-library/user-event';
import { Options } from '../Options';
import { OrderEntry } from '../OrderEntry';

test('update scoop sub-total when scoops change', async () => {
  // make sure to wrap component in provider that has the context needed.
  render(<Options optionType='scoops' />);

  // make sure the scoops sub-total starts at £0.00 - partial mach
  const scoopsSubTotal = screen.getByText('Scoops total: £', { exact: false });
  expect(scoopsSubTotal).toHaveTextContent('0.00');

  // update vanilla scoops by 1 and update scoops sub-total
  const vanillaScoop = await screen.findByRole('spinbutton', { name: 'Vanilla' });
  userEvent.clear(vanillaScoop);
  userEvent.type(vanillaScoop, '1');
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

  // select another topping 'Mochi' and update the topping sub-total
  const mochiTopping = await screen.findByRole('checkbox', { name: 'Mochi' });
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

describe('grand total', () => {
  test('grand total to start off at 0.00', () => {
    render(<OrderEntry />);
    const grandTotal = screen.getByRole('heading', { name: /Grand Total: \£/i });

    expect(grandTotal).toHaveTextContent('0.00');
  });

  test('grand total updates when scoops are added first', async () => {
    render(<OrderEntry />);
    const grandTotal = screen.getByRole('heading', { name: /Grand Total: \£/i });

    // scoops added, then check grand total
    const vanillaScoop = await screen.findByRole('spinbutton', { name: 'Vanilla' });
    userEvent.clear(vanillaScoop);
    userEvent.type(vanillaScoop, '1');
    expect(grandTotal).toHaveTextContent('1.50');

    // topping added, then check grand total
    const cherryTopping = await screen.findByRole('checkbox', { name: 'Cherries' });
    userEvent.click(cherryTopping);
    expect(grandTotal).toHaveTextContent('2.50');
  });

  test('grand total updates when toppings is added first', async () => {
    render(<OrderEntry />);
    const grandTotal = screen.getByRole('heading', { name: /Grand Total: \£/i });

    // topping added, then check grand total
    const cherryTopping = await screen.findByRole('checkbox', { name: 'Cherries' });
    userEvent.click(cherryTopping);
    expect(grandTotal).toHaveTextContent('1.00');

    // scoops added, then check grand total
    const vanillaScoop = await screen.findByRole('spinbutton', { name: 'Vanilla' });
    userEvent.clear(vanillaScoop);
    userEvent.type(vanillaScoop, '2');
    expect(grandTotal).toHaveTextContent('4.00');
  });

  test('grand total updates correctly when items from both scoop and toppings have been added and again when an item is removed', async () => {
    render(<OrderEntry />);
    const grandTotal = screen.getByRole('heading', { name: /Grand Total: \£/i });

    // scoops added, then check grand total
    const chocolateScoop = await screen.findByRole('spinbutton', { name: 'Chocolate' });
    userEvent.clear(chocolateScoop);
    userEvent.type(chocolateScoop, '3');
    expect(grandTotal).toHaveTextContent('4.50');

    // topping added, then check grand total
    const mochiTopping = await screen.findByRole('checkbox', { name: 'Mochi' });
    userEvent.click(mochiTopping);
    expect(grandTotal).toHaveTextContent('5.50');

    // removing 2 scoops, then check grand total
    userEvent.clear(chocolateScoop);
    userEvent.type(chocolateScoop, '2');
    expect(grandTotal).toHaveTextContent('4.00');

    // remove topping, then check grand total
    userEvent.click(mochiTopping);
    expect(grandTotal).toHaveTextContent('3.00');
  });
});
