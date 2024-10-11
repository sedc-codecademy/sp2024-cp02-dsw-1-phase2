import { Route, Routes } from 'react-router-dom';
import CardPaymentForm from './components/CardPaymentForm';
import CartPage from './components/CartPage';
import ContactForm from './components/ContactPage';
import OrderPage from './components/OrderPage';
import { CardPaymentProvider } from './context/CardPaymentContext';

function App() {
  return (
    <div className="App">
       <CardPaymentProvider>
          <Routes>
            <Route path="/" element={<CartPage />} />
            <Route path="/checkout" element={<OrderPage />} />
            <Route path="/payment" element={<CardPaymentForm />} />
            <Route path="/contact" element={<ContactForm />} />
          </Routes>
      </CardPaymentProvider>
    </div>
  );
}

export default App;
