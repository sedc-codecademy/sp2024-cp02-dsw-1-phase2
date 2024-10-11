import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import ForgotPasswordForm from "./ForgotPasswordForm";

interface LoginPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginPopup = ({ isOpen, onClose }: LoginPopupProps) => {
  const [isLogin, setIsLogin] = useState(true);
  const [isForgotPassword, setIsForgotPassword] = useState(false); // New state for forgot password form
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessages, setErrorMessages] = useState<string[]>([]);

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setName("");
    setEmail("");
    setPassword("");
    setErrorMessages([]);
  };

  const openForgotPasswordForm = () => {
    setIsForgotPassword(true); // Open forgot password form
  };

  const closeForgotPasswordForm = () => {
    setIsForgotPassword(false); // Close forgot password form
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: string[] = [];

    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      errors.push("Email is not valid.");
    }
    if (password.length < 6) {
      errors.push("Password must be at least 6 characters long.");
    }

    if (errors.length > 0) {
      setErrorMessages(errors);
      return;
    }

    setErrorMessages([]);
    if (isLogin) {
      console.log("Logging in with:", email, password);
    } else {
      console.log("Registering with:", name, email, password);
    }

    setName("");
    setEmail("");
    setPassword("");
    onClose();
  };

  const handleForgotPasswordEmailSent = (email: string) => {
    console.log(`Password reset email sent to: ${email}`);
    closeForgotPasswordForm(); // Close the form after email is sent
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            className="bg-white rounded-lg p-8 max-w-md w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">
                {isLogin ? "Login" : "Create Account"}
              </h2>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-gray-100"
              >
                <X size={24} />
              </button>
            </div>

            {!isForgotPassword ? (
              <form className="space-y-4" onSubmit={handleSubmit}>
                {!isLogin && (
                  <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                    required
                  />
                )}
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                  required
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                  required
                />
                {errorMessages.length > 0 && (
                  <div className="text-red-500">
                    {errorMessages.map((msg, index) => (
                      <p key={index}>{msg}</p>
                    ))}
                  </div>
                )}
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors duration-300"
                >
                  {isLogin ? "Login" : "Create Account"}
                </button>
              </form>
            ) : (
              <ForgotPasswordForm
                onClose={closeForgotPasswordForm}
                onEmailSent={handleForgotPasswordEmailSent}
              />
            )}

            {!isForgotPassword && (
              <p className="mt-4 text-center">
                {isLogin
                  ? "Don't have an account?"
                  : "Already have an account?"}
                <button
                  onClick={toggleForm}
                  className="ml-1 text-blue-600 hover:underline"
                >
                  {isLogin ? "Sign up" : "Log in"}
                </button>
              </p>
            )}

            {!isForgotPassword && (
              <p className="mt-2 text-center">
                <button
                  onClick={openForgotPasswordForm}
                  className="text-blue-600 hover:underline text-sm"
                >
                  Forgot Password?
                </button>
              </p>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoginPopup;
