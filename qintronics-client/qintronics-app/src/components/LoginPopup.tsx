import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useContext, useState } from "react";
import axiosInstance from "../common/utils/axios-instance.util";
import { AuthContext } from "../context/auth.context";
import ForgotPasswordForm from "./ForgotPasswordForm";

interface LoginPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginPopup = ({ isOpen, onClose }: LoginPopupProps) => {
  const { setUser } = useContext(AuthContext);
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

    axiosInstance
      .post("/auth/login", { email, password })
      .then((res) => {
        //do something with response
        setUser(res.data);
      })
      .catch((err) => {
        // do something if you get error
      });
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
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-lg shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <SimpleLogin onClose={onClose} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoginPopup;
