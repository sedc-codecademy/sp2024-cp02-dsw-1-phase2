import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import {
  FaLaptop,
  FaMobileAlt,
  FaTv,
  FaGamepad,
  FaHeadphones,
  FaKeyboard,
  FaGift,
  FaCamera,
  FaVideo,
  FaMicrophone,
  FaMouse,
  FaClock,
  FaMemory,
  FaDesktop,
  FaMicrochip,
  FaTabletAlt,
  FaPaperPlane,
  FaSquare,
} from "react-icons/fa";

const categories = [
  {
    name: "Electronics",
    subCategories: [
      { name: "Laptops", route: "/category/laptops", icon: <FaLaptop /> },
      { name: "Phones", route: "/category/phones", icon: <FaMobileAlt /> },
      { name: "TVs", route: "/category/tvs", icon: <FaTv /> },
      { name: "Tablets", route: "/category/tablets", icon: <FaTabletAlt /> },
      {
        name: "Smartwatches",
        route: "/category/smartwatches",
        icon: <FaClock />,
      },
    ],
  },
  {
    name: "Accessories",
    subCategories: [
      { name: "Keyboards", route: "/category/keyboards", icon: <FaKeyboard /> },
      { name: "Mouses", route: "/category/mouse", icon: <FaMouse /> },
      { name: "Mouse Pads", route: "/category/mouse-pads", icon: <FaSquare /> },
      {
        name: "Headphones",
        route: "/category/headphones",
        icon: <FaHeadphones />,
      },
      {
        name: "Microphones",
        route: "/category/microphones",
        icon: <FaMicrophone />,
      },
      {
        name: "Web Cameras",
        route: "/category/web-cameras",
        icon: <FaVideo />,
      },
    ],
  },
  {
    name: "PC Components",
    subCategories: [
      { name: "RAM", route: "/category/ram", icon: <FaMemory /> },
      {
        name: "Graphic Cards",
        route: "/category/graphics-cards",
        icon: <FaDesktop />,
      },
      {
        name: "Processors",
        route: "/category/processors",
        icon: <FaMicrochip />,
      },
    ],
  },
  {
    name: "Gaming",
    subCategories: [
      {
        name: "Controllers",
        route: "/category/controllers",
        icon: <FaGamepad />,
      },
      { name: "Games", route: "/category/games", icon: <FaGamepad /> },
      {
        name: "Gaming Chairs",
        route: "/category/gaming-chair",
        icon: <FaGamepad />,
      },
    ],
  },
  {
    name: "Photo, Video and Drones",
    subCategories: [
      { name: "Cameras", route: "/category/cameras", icon: <FaCamera /> },
      {
        name: "Action Cameras",
        route: "/category/action-cameras",
        icon: <FaVideo />,
      },
      { name: "Drones", route: "/category/drones", icon: <FaPaperPlane /> },
    ],
  },
  {
    name: "Gift Cards",
    subCategories: [
      { name: "Gift Cards", route: "/category/gift-cards", icon: <FaGift /> },
    ],
  },
];

const Sidebar = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);

  const handleCategoryClick = (route: string, categoryName: string) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setSelectedCategory(categoryName);
    navigate(route);
    setIsOpen(false); // Close the menu when a product is selected
  };

  return (
    <>
      {/* Mobile and tablet menu button */}
      <button
        className="md:hidden fixed top-5 left-5 z-50 bg-[#1BD8C4] text-white p-3 rounded-full shadow-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        {/* Hamburger icon when menu is closed, close icon when menu is open */}
        {isOpen ? (
          <FaTimes className="text-xl" />
        ) : (
          <FaBars className="text-xl" />
        )}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 w-64 h-full bg-gray-100 transition-transform transform z-50 md:z-40 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:w-64 md:relative flex flex-col`}
      >
        <div className="p-6 bg-gradient-to-b from-[#1BD8C4] to-[#1A3F6B] shadow-2xl flex flex-col overflow-y-auto h-full">
          <h2 className="text-3xl font-extrabold text-white mb-8 tracking-wider">
            Categories
          </h2>
          <div className="space-y-6 flex-1 overflow-y-auto">
            {categories.map((category) => (
              <div key={category.name}>
                <h3 className="text-xl font-semibold text-white mb-4 uppercase tracking-wide">
                  {category.name}
                </h3>
                <ul className="pl-4 space-y-3">
                  {category.subCategories.map((subCategory) => (
                    <li
                      key={subCategory.name}
                      className={`cursor-pointer transition-all duration-300 py-2 px-4 rounded-lg relative overflow-hidden group flex items-center
                      ${
                        selectedCategory === subCategory.name
                          ? "bg-white text-[#1BD8C4]"
                          : "text-white hover:bg-white hover:text-[#1BD8C4]"
                      }`}
                      onClick={() =>
                        handleCategoryClick(subCategory.route, subCategory.name)
                      }
                    >
                      <span className="mr-3 text-lg">{subCategory.icon}</span>
                      <span
                        className={`relative z-10 group-hover:text-transparent bg-clip-text bg-gradient-to-r from-[#1BD8C4] to-[#1A3F6B] transition-colors duration-300 ${
                          selectedCategory === subCategory.name
                            ? "text-transparent bg-clip-text bg-gradient-to-r from-[#1BD8C4] to-[#1A3F6B]"
                            : "text-white"
                        }`}
                      >
                        {subCategory.name}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Overlay for mobile menu */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
