import React from 'react';
import { motion } from 'framer-motion';
import { Container, Typography } from '@mui/material';
import BlogGrid from '../components/blog/BlogGrid';

const Blog: React.FC = () => {
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
              Blog & Actualités
            </Typography>
            <Typography variant="h5" className="max-w-2xl mx-auto">
              Découvrez nos derniers articles, tutoriels et actualités du monde du design
            </Typography>
          </motion.div>
        </Container>
      </section>

      {/* Featured Post */}
      <section className="py-12 bg-neutral-50">
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative overflow-hidden rounded-xl"
          >
            <div className="relative h-[400px]">
              <img
                src="/blog/featured-post.jpg"
                alt="Article à la une"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <Typography variant="overline" className="text-secondary">
                  Article à la une
                </Typography>
                <Typography variant="h3" className="font-bold mb-4">
                  L'impact de l'IA sur le design graphique
                </Typography>
                <Typography variant="subtitle1" className="max-w-2xl">
                  Comment l'intelligence artificielle révolutionne le processus créatif et ouvre de nouvelles possibilités pour les designers.
                </Typography>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-6 px-6 py-2 bg-white text-primary rounded-lg font-medium hover:bg-secondary transition-colors"
                >
                  Lire l'article
                </motion.button>
              </div>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Blog Grid */}
      <BlogGrid />

      {/* Newsletter Section */}
      <section className="bg-primary/5 py-20">
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <Typography variant="h3" className="font-bold text-primary mb-4">
              Restez inspiré
            </Typography>
            <Typography variant="h6" className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Abonnez-vous à notre newsletter pour recevoir nos derniers articles et actualités
            </Typography>
            <div className="max-w-md mx-auto">
              <div className="flex gap-4">
                <input
                  type="email"
                  placeholder="Votre adresse email"
                  className="flex-grow px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-primary"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition-colors"
                >
                  S'abonner
                </motion.button>
              </div>
            </div>
          </motion.div>
        </Container>
      </section>
    </div>
  );
};

export default Blog;
