import { useState } from "react";
import { Link } from "react-router-dom";
import { LayoutDashboard } from "lucide-react";
import Logo from "./Logo";
import SearchBar from "./SearchBar";
import IconButtons from "./IconButtons";
import DropdownMenu from "./DropdownMenu";

interface HeaderProps {
  onLoginClick: () => void;
}

const Header = ({ onLoginClick }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [language, setLanguage] = useState("EN");
  const [currency, setCurrency] = useState("USD");

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleLanguage = () => setLanguage(language === "EN" ? "MKD" : "EN");
  const toggleCurrency = () => setCurrency(currency === "USD" ? "MKD" : "USD");

  return (
    <header className="bg-white shadow-md sticky top-0 z-50 py-3">
      <div className="container mx-auto px-4 flex items-center justify-between relative">
        <Logo />
        <SearchBar />
        <div className="flex items-center space-x-4">
          {/* Other icons and buttons */}
          <IconButtons onLoginClick={onLoginClick} toggleMenu={toggleMenu} />
          {/* Dashboard Link */}
          <Link
            to="/dashboard"
            className="flex items-center space-x-1 text-gray-500 hover:text-gray-900"
          >
            <LayoutDashboard className="h-6 w-6" />
            <span className="hidden sm:inline-block">Dashboard</span>
          </Link>
        </div>
      </div>
      <DropdownMenu
        isMenuOpen={isMenuOpen}
        language={language}
        currency={currency}
        toggleLanguage={toggleLanguage}
        toggleCurrency={toggleCurrency}
      />
    </header>
  );
};

export default Header;
