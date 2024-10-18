import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
      <h1 className="text-6xl font-bold text-[#1A3F6B] mb-4">404</h1>
      <h2 className="text-3xl font-semibold text-gray-800 mb-2">
        Oops! You're lost.
      </h2>
      <p className="text-lg text-gray-600 mb-6">
        Looks like you've taken a wrong turn. But don’t worry, even the best
        explorers get lost sometimes.
      </p>
      <p className="text-lg text-gray-600 mb-6">
        Let’s get you back on track before the internet police show up! 🚓💨
      </p>
      <button
        onClick={() => navigate("/")}
        className="bg-[#1A3F6B] text-white font-bold py-2 px-6 rounded-lg hover:bg-white hover:text-[#1A3F6B] border border-transparent hover:border-[#1A3F6B] transition-all duration-300"
      >
        Take Me Home
      </button>
    </div>
  );
};

export default NotFound;
