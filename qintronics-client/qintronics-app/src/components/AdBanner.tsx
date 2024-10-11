import { motion } from "framer-motion";

interface AdBannerProps {
  title: string;
  description: string;
  imageUrl: string;
}

const AdBanner = ({ title, description, imageUrl }: AdBannerProps) => {
  return (
    <motion.div
      className="bg-[#CBEDEE] p-6 rounded-lg shadow-md overflow-hidden"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-4 md:mb-0">
          <h3 className="text-2xl font-bold text-[#06255B] mb-2">{title}</h3>
          <p className="text-[#06255B]">{description}</p>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="mt-4 bg-[#23B3B6] text-white px-6 py-2 rounded-md hover:bg-[#06255B] transition-colors duration-300"
          >
            Learn More
          </motion.button>
        </div>
        <div className="md:w-1/2">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-auto rounded-lg"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default AdBanner;
