import React from 'react';
import { motion } from 'framer-motion';
import { Container, Typography } from '@mui/material';
import PortfolioGrid from '../components/portfolio/PortfolioGrid';

const Portfolio: React.FC = () => {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="bg-primary text-white py-20">
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <Typography variant="h2" className="font-bold mb-4">
              Notre Portfolio
            </Typography>
            <Typography variant="h5" className="max-w-2xl mx-auto">
              Découvrez nos réalisations et laissez-vous inspirer par notre créativité
            </Typography>
          </motion.div>
        </Container>
      </section>

      {/* Portfolio Grid */}
      <PortfolioGrid />

      {/* Call to Action */}
      <section className="bg-primary/5 py-20">
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <Typography variant="h3" className="font-bold text-primary mb-4">
              Envie de créer votre projet ?
            </Typography>
            <Typography variant="h6" className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Contactez-nous pour discuter de votre vision et la transformer en réalité
            </Typography>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <a
                href="/contact"
                className="inline-block bg-primary text-white px-8 py-3 rounded-lg font-medium hover:bg-primary-dark transition-colors"
              >
                Démarrer un projet
              </a>
            </motion.div>
          </motion.div>
        </Container>
      </section>
    </div>
  );
};

export default Portfolio;
