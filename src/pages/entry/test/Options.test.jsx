import { render, screen } from '../../../test-utils/testing-library-utils';
import { Options } from '../Options';
// import { OrderDetailsProvider } from '../../../contexts/OrderDetails';

test('displays image for each scoop option from the server', async () => {
  render(<Options optionType='scoops' />);

  // find images
  const scoopImages = await screen.findAllByRole('img', { name: /scoop$/i });
  expect(scoopImages).toHaveLength(2);

  // confirm alt text of scoops's images
  const altText = scoopImages.map((element) => element.alt);
  expect(altText).toEqual(['Chocolate scoop', 'Vanilla scoop']);
});

test('displays image for each topping option from the server', async () => {
  render(<Options optionType='toppings' />);
  // find images of toppings
  const toppingImages = await screen.findAllByRole('img', { name: /topping$/i });
  expect(toppingImages).toHaveLength(3);

  // find alt text of topping's images
  const altText = toppingImages.map((element) => element.alt);
  expect(altText).toEqual(['Cherries topping', 'M&Ms topping', 'Hot fudge topping']);
});
