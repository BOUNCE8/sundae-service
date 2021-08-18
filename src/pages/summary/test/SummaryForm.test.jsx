import { render, screen, fireEvent } from '@testing-library/react';
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
