import { render, screen, userEvent } from '@testing-library/react';
import Options from '../Options';
import { OrderDetailsProvider } from '../../../contexts/OrderDetails';

test('update scoop sub-total when scoops change', async () => {
  // make sure to wrap component in provider that has the context needed.
  render(<Options optionType='scoops' />, { wrapper: OrderDetailsProvider });

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
