import { motion } from "framer-motion";

const testimonials = [
  {
    name: "John Doe",
    comment: "Great selection of products and excellent customer service!",
    rating: 5,
  },
  {
    name: "Jane Smith",
    comment:
      "Fast shipping and high-quality items. Will definitely shop here again.",
    rating: 4,
  },
  {
    name: "Mike Johnson",
    comment:
      "The tech support team was incredibly helpful. Outstanding experience!",
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {testimonials.map((testimonial, index) => (
        <motion.div
          key={index}
          className="bg-white p-6 rounded-lg shadow-md"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.2 }}
        >
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
              {testimonial.name[0]}
            </div>
            <div className="ml-4">
              <h4 className="font-semibold">{testimonial.name}</h4>
              <div className="flex">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-400">
                    ★
                  </span>
                ))}
              </div>
            </div>
          </div>
          <p className="text-gray-600">{testimonial.comment}</p>
        </motion.div>
      ))}
    </div>
  );
};

export default Testimonials;
