import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const phrases = [
  "Graphisme exceptionnel",
  "Branding unique",
  "Vidéos captivantes"
];

const Hero: React.FC = () => {
  const [currentPhrase, setCurrentPhrase] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhrase((prev) => (prev + 1) % phrases.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background with overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary-dark opacity-90" />
      
      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 text-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Five Design Agency
          </h1>
          
          <div className="h-20 flex items-center justify-center">
            <motion.p
              key={currentPhrase}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-2xl md:text-4xl font-light"
            >
              {phrases[currentPhrase]}
            </motion.p>
          </div>

          <p className="text-lg md:text-xl mb-12 max-w-2xl mx-auto">
            Nous donnons vie à vos idées avec créativité et excellence
          </p>

          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link to="/devis" className="btn-secondary">
              Demander un devis
            </Link>
            <Link to="/services" className="btn border-2 border-white text-white hover:bg-white hover:text-primary">
              Nos services
            </Link>
            <Link to="/promotions" className="btn bg-white/10 backdrop-blur-sm text-white hover:bg-white/20">
              Promotions
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Animated shapes */}
      <motion.div
        animate={{
          rotate: 360,
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute -right-20 -bottom-20 w-96 h-96 bg-secondary/20 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          rotate: -360,
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute -left-20 -top-20 w-96 h-96 bg-primary-light/20 rounded-full blur-3xl"
      />
    </section>
  );
};

export default Hero;
