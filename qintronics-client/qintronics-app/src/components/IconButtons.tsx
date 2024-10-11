import { ShoppingCart, Heart, User, ArrowRightLeft, Menu } from "lucide-react";
import { Link } from "react-router-dom";

interface IconButtonsProps {
  onLoginClick: () => void;
  toggleMenu: () => void;
}

const IconButtons = ({ onLoginClick, toggleMenu }: IconButtonsProps) => {
  return (
    <div className="flex items-center space-x-4 flex-shrink-0 z-20">
      <Link to="/cart">
        <button className="p-2 rounded-full hover:bg-blue-500 transition-colors duration-300 text-gray-800">
          <ShoppingCart size={20} />
        </button>
      </Link>
      <button className="p-2 rounded-full hover:bg-blue-500 transition-colors duration-300 text-gray-800">
        <Heart size={20} />
      </button>
      <Link to="/compare" className="relative group">
        <button className="p-2 rounded-full hover:bg-blue-500 transition-colors duration-300 text-gray-800">
          <ArrowRightLeft size={20} />
        </button>
        <span className="absolute top-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Compare
        </span>
      </Link>
      <button
        onClick={onLoginClick}
        className="p-2 rounded-full hover:bg-blue-500 transition-colors duration-300 text-gray-800"
      >
        <User size={20} />
      </button>
      <button
        onClick={toggleMenu}
        className="p-2 rounded-full hover:bg-blue-500 transition-colors duration-300 text-gray-800"
      >
        <Menu size={20} />
      </button>
    </div>
  );
};

export default IconButtons;
