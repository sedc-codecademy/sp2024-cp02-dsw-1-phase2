import { motion } from "framer-motion";

const blogPosts = [
  {
    title: "5G Technology: The Future of Mobile Connectivity",
    excerpt:
      "Explore how 5G is revolutionizing mobile networks and its potential impact on various industries.",
    image: "/api/placeholder/400/300",
  },
  {
    title: "The Rise of AI in Consumer Electronics",
    excerpt:
      "Discover how artificial intelligence is transforming everyday gadgets and improving user experiences.",
    image: "/api/placeholder/400/300",
  },
  {
    title:
      "'Sustainable Tech: Eco-Friendly Gadgets for a Greener Future', excerpt: 'Learn about the latest innovations in sustainable technology and how they're helping to reduce environmental impact.', image: '/api/placeholder/400/300'",
  },
];

const LatestBlogPosts = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {blogPosts.map((post, index) => (
        <motion.div
          key={index}
          className="bg-white rounded-lg shadow-md overflow-hidden"
          whileHover={{ y: -5 }}
        >
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-48 object-cover"
          />
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
            <p className="text-gray-600 mb-4">{post.excerpt}</p>
            <motion.button
              className="text-blue-600 font-semibold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Read More
            </motion.button>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default LatestBlogPosts;
