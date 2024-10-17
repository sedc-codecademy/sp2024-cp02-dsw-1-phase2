import React, { ChangeEvent, FormEvent, useState } from "react";
import {
  FaCcVisa,
  FaCcMastercard,
  FaExclamationCircle,
  FaUser,
  FaCreditCard,
  FaLock,
  FaCalendarAlt,
} from "react-icons/fa";
import { BsCalendar2MonthFill } from "react-icons/bs";
import { TbCreditCardPay } from "react-icons/tb";
import { AiOutlinePlus } from "react-icons/ai";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import "../styles/card.css";

// Sample saved cards data
const savedCards = [
  {
    id: 1,
    cardNumber: "**** **** **** 1193",
    name: "Filip Mladenovski",
    expiry: "05/2022",
    expired: true,
    type: "MasterCard",
  },
  {
    id: 2,
    cardNumber: "**** **** **** 5123",
    name: "John Doe",
    expiry: "08/2024",
    expired: false,
    type: "Visa",
  },
];

const CardPaymentForm: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCardId, setSelectedCardId] = useState<number | null>(null);
  const [cardType, setCardType] = useState<string>("");
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  const [cardData, setCardData] = useState({
    cardHolderName: "",
    cardNumber: "",
    expiryMonth: "",
    expiryYear: "",
    cvv: "",
  });

  const detectCardType = (cardNumber: string) => {
    const firstDigit = cardNumber[0];
    const firstTwoDigits = cardNumber.slice(0, 2);

    if (firstDigit === "4") return "Visa";
    if (firstTwoDigits >= "51" && firstTwoDigits <= "55") return "MasterCard";
    return ""; // Return empty string if no match
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "cardNumber") {
      const cleaned = value.replace(/\D/g, "");
      const formattedValue = cleaned.replace(/(.{4})/g, "$1 ").trim();
      setCardData((prevData) => ({
        ...prevData,
        cardNumber: formattedValue,
      }));

      const detectedType = detectCardType(cleaned);
      setCardType(detectedType);
    } else if (name === "expiryMonth" || name === "expiryYear") {
      const cleaned = value.replace(/\D/g, "");
      setCardData((prevData) => ({
        ...prevData,
        [name]: cleaned.slice(0, 2),
      }));
    } else if (name === "cvv") {
      const cleaned = value.replace(/\D/g, "");
      setCardData((prevData) => ({
        ...prevData,
        cvv: cleaned.slice(0, 4), // Limit the CVV to 4 digits
      }));
    } else {
      setCardData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handlePaymentSubmit = (e: FormEvent) => {
    e.preventDefault();
    const expirationDate = `${cardData.expiryMonth}/${cardData.expiryYear}`;
    const cardNumberWithoutSpaces = cardData.cardNumber.replace(/\s+/g, "");

    if (
      cardNumberWithoutSpaces.length !== 16 ||
      isNaN(Number(cardNumberWithoutSpaces))
    ) {
      Swal.fire(
        "Invalid Card Number",
        "Please enter a valid 16-digit card number.",
        "error"
      );
      return;
    }

    if (
      parseInt(cardData.expiryMonth) < 1 ||
      parseInt(cardData.expiryMonth) > 12 ||
      cardData.expiryMonth.length !== 2
    ) {
      Swal.fire(
        "Invalid Expiry Month",
        "Please enter a valid expiry month (01-12).",
        "error"
      );
      return;
    }

    if (cardData.expiryYear.length !== 2) {
      Swal.fire(
        "Invalid Expiry Year",
        "Please enter a valid 2-digit expiry year.",
        "error"
      );
      return;
    }

    Swal.fire({
      icon: "success",
      title: "Payment Successful!",
      text: "Your payment has been processed successfully. Thank you!",
      timer: 3000,
      timerProgressBar: true,
      showConfirmButton: false,
    }).then(() => {
      navigate("/");
    });
  };

  const handleUseSelectedCard = () => {
    Swal.fire({
      icon: "success",
      title: "Payment Successful!",
      text: "Your payment has been processed successfully. Thank you!",
      timer: 3000,
      timerProgressBar: true,
      showConfirmButton: false,
    }).then(() => {
      navigate("/");
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-xl mx-auto">
      <h2 className="text-3xl font-bold text-primary mb-6 text-center" >Card Payment</h2>

      <h3 className="text-lg font-medium mb-4">Your Credit or Debit Cards</h3>
      <ul className="space-y-4">
        {savedCards.map((card) => (
          <li
            key={card.id}
            className={`flex items-center justify-between p-4 rounded-lg border ${
              card.expired ? "border-red-500 bg-red-50" : "border-gray-300"
            }`}
          >
            <div className="flex items-center">
              {card.type === "Visa" && (
                <FaCcVisa className="text-blue-600 text-3xl mr-4" />
              )}
              {card.type === "MasterCard" && (
                <FaCcMastercard className="text-yellow-500 text-3xl mr-4" />
              )}
              <input
                type="radio"
                name="savedCard"
                id={`card-${card.id}`}
                className="mr-4"
                onChange={() => setSelectedCardId(card.id)}
              />
              <label
                htmlFor={`card-${card.id}`}
                className="flex flex-col space-y-1"
              >
                <span className="font-medium text-lg">
                  {card.cardNumber} — {card.name}
                </span>
                {card.expired ? (
                  <span className="text-red-500 text-sm flex items-center">
                    <FaExclamationCircle className="mr-2" />
                    Expired
                  </span>
                ) : (
                  <span className="text-gray-500 text-sm">
                    Valid until {card.expiry}
                  </span>
                )}
              </label>
            </div>
          </li>
        ))}
      </ul>

      {selectedCardId ? (
        <div className="mt-6 flex justify-center">
          <button
            onClick={handleUseSelectedCard}
            className="flex items-center justify-center bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold px-8 py-4 text-lg rounded-full shadow-lg transform transition-all hover:scale-105 hover:shadow-2xl duration-300 ease-in-out"
          >
            <TbCreditCardPay className="mr-2" size={18} />
            Use Selected Card to Pay
          </button>
        </div>
      ) : (
        <div className="mt-10">
          <h3 className="text-xl font-semibold mb-6 flex items-center">
            <AiOutlinePlus className="mr-2 text-secondary text-lg" />
            Add a New Card
          </h3>
          {/* Credit Card Preview */}
          <div className="card-container">
            <div
              className="card"
              onClick={() => setIsCardFlipped(!isCardFlipped)}
            >
              <div className={`card-inner ${isCardFlipped ? "flipped" : ""}`}>
                <div className="front">
                  <img
                    src="https://i.ibb.co/PYss3yv/map.png"
                    className="map-img"
                    alt="map"
                  />
                  <div className="row">
                    <img
                      src="https://i.ibb.co/G9pDnYJ/chip.png"
                      width="60px"
                      alt="chip"
                    />
                    {cardType === "Visa" && (
                      <img
                        src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg"
                        width="60px"
                        alt="Visa"
                      />
                    )}
                    {cardType === "MasterCard" && (
                      <img
                        src="https://upload.wikimedia.org/wikipedia/commons/b/b7/MasterCard_Logo.svg"
                        width="60px"
                        alt="MasterCard"
                      />
                    )}
                  </div>
                  <div className="row card-no">
                    <p>{cardData.cardNumber || "xxxx xxxx xxxx xxxx"}</p>
                  </div>
                  <div className="row card-holder">
                    <p>CARD HOLDER</p>
                    <p>VALID TILL</p>
                  </div>
                  <div className="row name">
                    <p>{cardData.cardHolderName || "Cardholder Name"}</p>
                    <p>
                      {cardData.expiryMonth && cardData.expiryYear
                        ? `${cardData.expiryMonth} / ${cardData.expiryYear}`
                        : "MM/YY"}
                    </p>
                  </div>
                </div>
                <div className="back">
                  <img
                    src="https://i.ibb.co/PYss3yv/map.png"
                    className="map-img"
                    alt="map"
                  />
                  <div className="bar"></div>
                  <div className="row card-cvv">
                    <div>
                      <img
                        src="https://i.ibb.co/S6JG8px/pattern.png"
                        alt="pattern"
                      />
                    </div>
                    <p>{cardData.cvv || "****"}</p>
                  </div>
                  <div className="row card-text"></div>
                  <div className="row signature">
                    <p>CUSTOMER SIGNATURE</p>
                    <img
                      src="https://i.ibb.co/WHZ3nRJ/visa.png"
                      width="80px"
                      alt="visa"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={handlePaymentSubmit} className="space-y-6 mt-8">
            <div className="relative">
              <div className="flex items-center">
                <FaUser className="mr-2 text-secondary text-lg" />
                <label className="block text-sm text-primary">
                  Card Holder Name
                </label>
              </div>
              <input
                type="text"
                name="cardHolderName"
                value={cardData.cardHolderName}
                onChange={handleInputChange}
                className="pl-10 pr-4 py-3 border border-darkGray focus:ring-secondary focus:border-secondary w-full rounded-xl focus:outline-none"
                required
                placeholder="Cardholder Name"
                maxLength={30}
              />
            </div>

            <div className="relative">
              <div className="flex items-center">
                <FaCreditCard className="mr-2 text-secondary text-lg" />
                <label className="block text-sm text-primary">
                  Card Number
                </label>
              </div>
              <input
                type="tel"
                name="cardNumber"
                value={cardData.cardNumber}
                onChange={handleInputChange}
                className="pl-10 pr-4 py-3 border border-darkGray focus:ring-secondary focus:border-secondary w-full rounded-xl focus:outline-none"
                required
                placeholder="xxxx xxxx xxxx xxxx"
                maxLength={19}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <BsCalendar2MonthFill className="mr-2 text-secondary text-lg" />
                <label className="block text-sm text-primary">
                  Expiry Month
                </label>
                <input
                  type="text"
                  name="expiryMonth"
                  value={cardData.expiryMonth}
                  onChange={handleInputChange}
                  className="pl-10 pr-4 py-3 border border-darkGray focus:ring-secondary focus:border-secondary w-full rounded-xl focus:outline-none"
                  required
                  placeholder="MM"
                  maxLength={2}
                />
              </div>

              <div className="relative">
                <FaCalendarAlt className="mr-2 text-secondary text-lg" />
                <label className="block text-sm text-primary">
                  Expiry Year
                </label>
                <input
                  type="text"
                  name="expiryYear"
                  value={cardData.expiryYear}
                  onChange={handleInputChange}
                  className="pl-10 pr-4 py-3 border border-darkGray focus:ring-secondary focus:border-secondary w-full rounded-xl focus:outline-none"
                  required
                  placeholder="YY"
                  maxLength={2}
                />
              </div>
            </div>

            <div className="relative">
              <div className="flex items-center">
                <FaLock className="mr-2 text-secondary text-lg" />
                <label className="block text-sm text-primary">CVV / CVC</label>
              </div>
              <input
                type="text"
                name="cvv"
                value={cardData.cvv}
                onChange={(e) => {
                  handleInputChange(e);
                  setIsCardFlipped(true); // Flip the card when typing
                }}
                onFocus={() => setIsCardFlipped(true)} // Flip the card when clicking into the CVV input
                onBlur={() => setIsCardFlipped(false)} // Flip back when leaving the CVV input
                className="pl-10 pr-4 py-3 border border-darkGray focus:ring-secondary focus:border-secondary w-full rounded-xl focus:outline-none"
                required
                placeholder="* * * *"
                maxLength={4}
              />
            </div>

            <div className="mt-6 flex justify-center">
              <button
                type="submit"
                className="flex items-center justify-center bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold px-8 py-4 text-lg rounded-full shadow-lg transform transition-all hover:scale-105 hover:shadow-2xl duration-300 ease-in-out"
              >
                <TbCreditCardPay className="mr-2" size={18} />
                Pay Now
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default CardPaymentForm;
