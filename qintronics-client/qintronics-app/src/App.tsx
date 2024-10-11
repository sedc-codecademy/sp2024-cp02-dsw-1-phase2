import { Route, Routes } from "react-router-dom";
import CardPaymentForm from "./components/CardPaymentForm";
import CartPage from "./components/CartPage";
import ContactForm from "./components/ContactPage";
import OrderPage from "./components/OrderPage";
import { CardPaymentProvider } from "./context/CardPaymentContext";
import { useState } from "react";
import Header from "./components/Header";
import CompareProducts from "./components/CompareProducts";
import Dashboard from "./components/Dashboard";
import MainComponent from "./components/MainComponent";
import LoginPopup from "./components/LoginPopup";
import Footer from "./components/Footer";
import { motion } from "framer-motion";
import Chatbot from "./components/Chatbot";

function App() {
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false); // Manage chat visibility

  const toggleLoginPopup = () => setIsLoginPopupOpen(!isLoginPopupOpen);
  const toggleChat = () => setIsChatOpen(!isChatOpen); // Toggle chat window
  return (
    <div className="App">
      <Header onLoginClick={toggleLoginPopup} />
      <div className="content">
        <CardPaymentProvider>
          <Routes>
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<OrderPage />} />
            <Route path="/payment" element={<CardPaymentForm />} />
            <Route path="/contact" element={<ContactForm />} />
            <Route path="/" element={<MainComponent />} />
            <Route path="/compare" element={<CompareProducts />} />
            <Route path="/dashboard" element={<Dashboard />} />{" "}
          </Routes>
        </CardPaymentProvider>
      </div>
      <LoginPopup isOpen={isLoginPopupOpen} onClose={toggleLoginPopup} />
      <Footer />

      {/* Chatbot bubble */}
      <div className="fixed bottom-4 right-4">
        <motion.button
          onClick={toggleChat} // Opens the chat on button click
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="bg-blue-600 text-white p-4 rounded-full shadow-lg focus:outline-none"
        >
          💬 Chat
        </motion.button>
      </div>

      {/* Chatbot window */}
      {isChatOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-16 right-4 w-80 h-96 bg-white border border-gray-300 shadow-lg rounded-lg"
        >
          <Chatbot toggleChat={toggleChat} />
        </motion.div>
      )}
    </div>
  );
}

export default App;
