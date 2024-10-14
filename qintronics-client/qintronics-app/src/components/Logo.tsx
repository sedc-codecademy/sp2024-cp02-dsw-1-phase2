import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/" className="flex-shrink-0">
      <img
        src="../../public/images/qintronics-logo-removebg-preview.png" // Replace with the actual path to your logo image
        alt="Logo"
        className="h-12 w-auto" // Adjust the size of the logo as needed
      />
    </Link>
  );
};

export default Logo;
