import { motion } from "framer-motion";
import { MdVerified } from "react-icons/md";

const testimonials = [
  {
    name: "John Doe",
    comment: "Great selection of products and excellent customer service!",
    rating: 5,
    verified: true,
  },
  {
    name: "Jane Smith",
    comment:
      "Fast shipping and high-quality items. Will definitely shop here again.",
    rating: 4,
    verified: true,
  },
  {
    name: "Mike Johnson",
    comment:
      "The tech support team was incredibly helpful. Outstanding experience!",
    rating: 5,
    verified: true,
  },
];

const Testimonials = () => {
  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            className="bg-white p-6 rounded-xl shadow-lg transition-shadow duration-300 ease-in-out hover:shadow-2xl"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
          >
            <div className="flex items-center mb-4">
              <div className="w-14 h-14 bg-[#1A3F6B] rounded-full flex items-center justify-center text-white font-bold text-2xl">
                {testimonial.name[0]}
              </div>
              <div className="ml-4">
                <h4 className="font-semibold text-xl text-gray-800 flex items-center">
                  {testimonial.name}
                  {testimonial.verified && (
                    <div className="ml-2 w-6 h-6 rounded-full bg-[#1BD8C4] flex items-center justify-center">
                      <MdVerified
                        className="text-white"
                        title="Verified Customer"
                      />
                    </div>
                  )}
                </h4>
                <div className="flex space-x-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-lg">
                      ★
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <p className="text-gray-600 italic">"{testimonial.comment}"</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
