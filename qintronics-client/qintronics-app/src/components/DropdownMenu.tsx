import { motion, AnimatePresence } from "framer-motion";
import { Globe, DollarSign } from "lucide-react";
import { useRef } from "react";

interface DropdownMenuProps {
  isMenuOpen: boolean;
  language: string;
  currency: string;
  toggleLanguage: () => void;
  toggleCurrency: () => void;
}

const DropdownMenu = ({
  isMenuOpen,
  language,
  currency,
  toggleLanguage,
  toggleCurrency,
}: DropdownMenuProps) => {
  const menuRef = useRef<HTMLDivElement>(null);

  return (
    <AnimatePresence>
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute right-0 top-16 bg-white border border-gray-300 shadow-lg rounded-md w-56"
          ref={menuRef}
        >
          <nav className="px-4 py-3 space-y-2">
            <a
              href="/"
              className="block py-2 hover:text-blue-500 text-gray-800 transition-colors duration-300"
            >
              Home
            </a>
            <a
              href="/about"
              className="block py-2 hover:text-blue-500 text-gray-800 transition-colors duration-300"
            >
              About
            </a>
            <a
              href="/contact"
              className="block py-2 hover:text-blue-500 text-gray-800 transition-colors duration-300"
            >
              Contact
            </a>
            <div className="flex items-center justify-between py-2">
              <button
                onClick={toggleLanguage}
                className="flex items-center space-x-2 text-gray-800"
              >
                <Globe size={20} />
                <span>{language}</span>
              </button>
              <button
                onClick={toggleCurrency}
                className="flex items-center space-x-2 text-gray-800"
              >
                <DollarSign size={20} />
                <span>{currency}</span>
              </button>
            </div>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DropdownMenu;
