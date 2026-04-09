import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Shield, Zap, TrendingUp, Clock, Award, Users, ArrowRight, Star, Phone, Mail } from 'lucide-react';

export default function Home() {
  const features = [
    { icon: Zap, title: 'Instant Decision', desc: 'AI-powered loan approval in seconds', color: 'from-yellow-500 to-orange-500', delay: 0 },
    { icon: Shield, title: 'Secure & Safe', desc: 'Bank-grade security for your data', color: 'from-green-500 to-emerald-500', delay: 0.1 },
    { icon: TrendingUp, title: 'Best Rates', desc: 'Competitive interest rates starting at 9.9%', color: 'from-blue-500 to-indigo-500', delay: 0.2 },
    { icon: Clock, title: 'Quick Disbursal', desc: 'Funds within 24 hours of approval', color: 'from-purple-500 to-pink-500', delay: 0.3 },
    { icon: Award, title: 'Trusted Partner', desc: '10,000+ MSMEs served across India', color: 'from-red-500 to-rose-500', delay: 0.4 },
    { icon: Users, title: '24/7 Support', desc: 'Dedicated relationship manager', color: 'from-teal-500 to-cyan-500', delay: 0.5 },
  ];

  const stats = [
    { value: '₹500Cr+', label: 'Loans Disbursed', icon: TrendingUp },
    { value: '10,000+', label: 'Happy Customers', icon: Users },
    { value: '98%', label: 'Approval Rate', icon: Award },
    { value: '24hrs', label: 'Average Disbursal', icon: Clock },
  ];

  const testimonials = [
    { name: 'Rajesh Sharma', business: 'Textile Manufacturer', rating: 5, text: 'Vitto helped us get funding when banks rejected us. Process was smooth!' },
    { name: 'Priya Patel', business: 'Retail Store Owner', rating: 5, text: 'Got approval in 2 minutes! Best lending experience ever.' },
    { name: 'Amit Kumar', business: 'Tech Startup', rating: 4, text: 'Great platform for MSMEs. Highly recommend!' },
  ];

  return (
    <div>
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 text-white"
      >
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556742049-0cfed2f6f4d0?w=1600')] bg-cover bg-center opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-24 sm:py-32">
          <div className="text-center">
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-1 bg-white/20 rounded-full text-sm mb-6 backdrop-blur-sm">
                🚀 India's Most Trusted MSME Lending Platform
              </span>
            </motion.div>
            <motion.h1 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-5xl sm:text-7xl font-bold mb-6"
            >
              Smart Lending for
              <span className="block text-yellow-300 mt-2">Indian MSMEs</span>
            </motion.h1>
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-xl mb-8 max-w-2xl mx-auto text-blue-100"
            >
              Get instant loan decisions powered by AI. No paperwork, no hassle. 
              From ₹50,000 to ₹5 Crore.
            </motion.p>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex gap-4 justify-center flex-wrap"
            >
              <Link to="/apply">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-yellow-400 text-gray-900 px-8 py-4 rounded-full font-semibold text-lg shadow-xl hover:bg-yellow-300 transition-all flex items-center gap-2"
                >
                  Apply Now <ArrowRight size={20} />
                </motion.button>
              </Link>
              <Link to="/dashboard">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white/20 backdrop-blur-sm border border-white/30 px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/30 transition-all"
                >
                  View Dashboard
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Stats Section */}
      <div className="bg-white py-12 shadow-lg relative z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="text-center"
                >
                  <div className="flex justify-center mb-3">
                    <div className="bg-blue-100 p-3 rounded-full">
                      <Icon className="text-blue-600" size={28} />
                    </div>
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-gray-600 mt-2">{stat.label}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
            >
              Why Choose Vitto?
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-xl text-gray-600"
            >
              India's most trusted lending platform for MSMEs
            </motion.p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: feature.delay }}
                  whileHover={{ y: -8 }}
                  className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 group cursor-pointer"
                >
                  <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                    <Icon className="text-white" size={32} />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
            >
              What Our Customers Say
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-xl text-gray-600"
            >
              Trusted by thousands of MSMEs across India
            </motion.p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-gray-50 rounded-2xl p-6"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, j) => (
                    <Star key={j} className="text-yellow-400 fill-yellow-400" size={18} />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.business}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 py-16">
        <div className="max-w-4xl mx-auto text-center px-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-white mb-4"
          >
            Ready to Grow Your Business?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-blue-100 mb-8"
          >
            Get funding up to ₹5 Crore with instant approval
          </motion.p>
          <Link to="/apply">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold text-lg shadow-xl hover:shadow-2xl transition-all"
            >
              Start Your Application →
            </motion.button>
          </Link>
        </div>
      </div>
    </div>
  );
}