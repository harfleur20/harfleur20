import React from 'react';
import { motion } from 'framer-motion';
import { Container, Typography } from '@mui/material';
import ServiceFeatures from '../components/services/ServiceFeatures';
import ServicesGrid from '../components/services/ServicesGrid';

const Services: React.FC = () => {
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
              Nos Services Créatifs
            </Typography>
            <Typography variant="h5" className="max-w-2xl mx-auto">
              Des solutions créatives sur mesure pour donner vie à vos projets et faire rayonner votre marque
            </Typography>
          </motion.div>
        </Container>
      </section>

      {/* Services Features */}
      <ServiceFeatures />

      {/* Services Grid (Pricing) */}
      <ServicesGrid />

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
              Prêt à démarrer votre projet ?
            </Typography>
            <Typography variant="h6" className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Contactez-nous dès aujourd'hui pour discuter de vos besoins et obtenir un devis personnalisé
            </Typography>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <a
                href="/devis"
                className="inline-block bg-primary text-white px-8 py-3 rounded-lg font-medium hover:bg-primary-dark transition-colors"
              >
                Demander un devis gratuit
              </a>
            </motion.div>
          </motion.div>
        </Container>
      </section>
    </div>
  );
};

export default Services;
