import Container from 'react-bootstrap/Container';
import OrderEntry from './pages/entry/OrderEntry';
import SummaryForm from './pages/summary/SummaryForm';
import { OrderDetailsProvider } from './contexts/OrderDetails';

const App = () => {
  return (
    <Container>
      <OrderDetailsProvider>
        <OrderEntry />
        <SummaryForm />
      </OrderDetailsProvider>
      {/* Confirmation does not need provider context */}
    </Container>
  );
};

export default App;
