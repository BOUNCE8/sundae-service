import { render, screen, fireEvent } from '@testing-library/react';
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

  fireEvent.click(checkBox);
  expect(checkBox).toBeChecked();
  expect(confirmButton).toBeEnabled();

  fireEvent.click(checkBox);
  expect(checkBox).not.toBeChecked();
  expect(confirmButton).toBeDisabled();
});
