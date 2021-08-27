import { render, screen } from '../../../test-utils/testing-library-utils';
import userEvent from '@testing-library/user-event';

import { Options } from '../Options';

test('displays image for each scoop option from the server', async () => {
  render(<Options optionType='scoops' />);

  // find images
  const scoopImages = await screen.findAllByRole('img', { name: /scoop$/i });
  expect(scoopImages).toHaveLength(2);

  // confirm alt text of scoops's images
  const altText = await scoopImages.map((element) => element.alt);
  expect(altText).toEqual(['Chocolate scoop', 'Vanilla scoop']);
});

test('displays image for each topping option from the server', async () => {
  render(<Options optionType='toppings' />);
  // find images of toppings
  const toppingImages = await screen.findAllByRole('img', { name: /topping$/i });
  expect(toppingImages).toHaveLength(4);

  // find alt text of topping's images
  const altText = toppingImages.map((element) => element.alt);
  expect(altText).toEqual([
    'Cherries topping',
    'M&Ms topping',
    'Hot fudge topping',
    'Mochi topping',
  ]);
});

// test("don't update total if scoops input is invalid", async () => {
//   render(<Options optionType='scoops' />);

//   // expect button to be enabled after adding scoop
//   const vanillaInput = await screen.findByRole('spinbutton', {
//     name: 'Vanilla',
//   });
//   userEvent.clear(vanillaInput);
//   userEvent.type(vanillaInput, '-1');

//   // make sure scoops subtotal hasn't updated
//   const scoopsSubtotal = screen.getByText('Scoops total: £0.00');
//   expect(scoopsSubtotal).toBeInTheDocument();
// });
