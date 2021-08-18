import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SummaryForm from '../SummaryForm';

test('initial checks', () => {
  render(<SummaryForm />);
  const confirmButton = screen.getByRole('button', { name: /confirm order/i });
  const checkBox = screen.getByRole('checkbox', { name: 'I agree to Terms and Conditions' });

  expect(checkBox).not.toBeChecked();
  expect(confirmButton).toBeDisabled();
});

test('checking checkbox enables button, and un-checking disables it once more', () => {
  render(<SummaryForm />);
  const confirmButton = screen.getByRole('button', { name: /confirm order/i });
  const checkBox = screen.getByRole('checkbox', { name: 'I agree to Terms and Conditions' });

  userEvent.click(checkBox);
  expect(confirmButton).toBeEnabled();

  userEvent.click(checkBox);
  expect(confirmButton).toBeDisabled();
});

test('pop-over responds to hover/un-hover', async () => {
  render(<SummaryForm />);
  const nullPopover = screen.queryByText(/no ice cream will actually be delivered/i);
  expect(nullPopover).not.toBeInTheDocument();

  // popover appears when user hovers over terms and conditions

  const termsAndCondtions = screen.getByText(/Terms and Conditions/i);
  userEvent.hover(termsAndCondtions);
  const popover = screen.getByText(/no ice cream will actually be delivered/i);
  expect(popover).toBeInTheDocument();

  // popover disapears when user is no longer hovering over terms and conditions
  userEvent.unhover(termsAndCondtions);
  await waitForElementToBeRemoved(() =>
    screen.queryByText(/no ice cream will actually be delivered/i)
  );
});
