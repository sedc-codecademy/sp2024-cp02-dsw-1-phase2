import {
  FaStar,
  FaHeadset,
  FaTruck,
  FaLightbulb,
  FaShieldAlt,
  FaUserCheck,
  FaBatteryFull,
} from "react-icons/fa";

const AboutUs = () => {
  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        {/* Introduction Section */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-extrabold text-gray-900 mb-6">
            About Us
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Welcome to Qintronics, where innovation meets reliability. Learn
            about our mission, values, and dedication to delivering the latest
            technological advancements to our customers worldwide.
          </p>
        </div>

        {/* Our Story Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-16">
          <div className="space-y-8 text-gray-800">
            <h3 className="text-4xl font-bold">Our Story</h3>
            <p className="text-lg leading-relaxed">
              Founded on the principle of bringing the latest technological
              innovations to consumers, Qintronics has grown into a leading tech
              retailer. Our journey began with a small team of passionate
              technology enthusiasts, and today, we are a global organization
              committed to delivering high-quality products and services.
            </p>
            <p className="text-lg leading-relaxed">
              We collaborate with world-class brands to provide a wide selection
              of products, ensuring our customers always have access to the most
              advanced technologies. Our mission is to make cutting-edge
              technology accessible to everyone, no matter where they are.
            </p>
          </div>
          <div className="relative">
            <img
              src="https://via.placeholder.com/600x400"
              alt="Our Story"
              className="w-full h-auto rounded-lg shadow-xl transition-transform transform hover:scale-105 duration-300"
            />
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div className="mb-16">
          <h3 className="text-4xl font-bold text-gray-900 text-center mb-12">
            Why Choose Qintronics
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="p-8 rounded-lg shadow-lg transition-transform transform hover:scale-105 duration-300">
              <h4 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                <FaStar className="mr-3 text-[#1BD8C4]" /> Premium Products
              </h4>
              <p className="text-gray-600 leading-relaxed">
                We partner with renowned brands to offer products that meet the
                highest standards of quality and innovation. Each product
                undergoes rigorous testing to ensure reliability and
                performance.
              </p>
            </div>
            <div className="p-8 rounded-lg shadow-lg transition-transform transform hover:scale-105 duration-300">
              <h4 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                <FaHeadset className="mr-3 text-[#1BD8C4]" /> Outstanding
                Customer Support
              </h4>
              <p className="text-gray-600 leading-relaxed">
                Our dedicated customer service team is here to help with any
                questions or issues, ensuring a smooth and pleasant shopping
                experience from start to finish.
              </p>
            </div>
            <div className="p-8 rounded-lg shadow-lg transition-transform transform hover:scale-105 duration-300">
              <h4 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                <FaTruck className="mr-3 text-[#1BD8C4]" /> Fast and Secure
                Delivery
              </h4>
              <p className="text-gray-600 leading-relaxed">
                We prioritize secure and timely delivery, ensuring that your
                purchases arrive at your doorstep without delay, no matter where
                you are.
              </p>
            </div>
          </div>
        </div>

        {/* Our Mission and Values Section */}
        <div className="mb-16">
          <h3 className="text-4xl font-bold text-gray-900 text-center mb-12">
            Our Mission and Values
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="p-8 bg-white border border-gray-200 rounded-lg shadow-lg transition-transform transform hover:scale-105 duration-300">
              <h4 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                <FaLightbulb className="mr-3 text-[#1BD8C4]" /> Innovation
              </h4>
              <p className="text-gray-600 leading-relaxed">
                We continuously seek out the latest technological advancements
                to bring innovative solutions to our customers. Our commitment
                to innovation drives everything we do.
              </p>
            </div>
            <div className="p-8 bg-white border border-gray-200 rounded-lg shadow-lg transition-transform transform hover:scale-105 duration-300">
              <h4 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                <FaShieldAlt className="mr-3 text-[#1BD8C4]" /> Integrity
              </h4>
              <p className="text-gray-600 leading-relaxed">
                We believe in honest, transparent business practices. Our
                customers trust us to deliver products and services that meet
                their expectations, with no compromises on quality or ethics.
              </p>
            </div>
            <div className="p-8 bg-white border border-gray-200 rounded-lg shadow-lg transition-transform transform hover:scale-105 duration-300">
              <h4 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                <FaUserCheck className="mr-3 text-[#1BD8C4]" /> Customer Focus
              </h4>
              <p className="text-gray-600 leading-relaxed">
                We put our customers at the center of everything we do,
                providing personalized experiences, dedicated support, and a
                carefully curated selection of the best products on the market.
              </p>
            </div>
            <div className="p-8 bg-white border border-gray-200 rounded-lg shadow-lg transition-transform transform hover:scale-105 duration-300">
              <h4 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                <FaBatteryFull className="mr-3 text-[#1BD8C4]" /> Sustainability
              </h4>
              <p className="text-gray-600 leading-relaxed">
                We are committed to sustainable practices, working with partners
                who share our vision of responsible sourcing and environmental
                stewardship to minimize our impact on the planet.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
