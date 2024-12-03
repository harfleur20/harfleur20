import React from 'react';
import { motion } from 'framer-motion';
import { Container, Grid, Typography, Paper } from '@mui/material';
import QuoteForm from '../components/forms/QuoteForm';

const Quote: React.FC = () => {
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
              Demander un devis
            </Typography>
            <Typography variant="h5" className="max-w-2xl mx-auto">
              Décrivez votre projet et recevez une estimation personnalisée
            </Typography>
          </motion.div>
        </Container>
      </section>

      {/* Quote Form Section */}
      <section className="py-20">
        <Container maxWidth="lg">
          <Grid container spacing={6}>
            {/* Quote Form */}
            <Grid item xs={12} md={8}>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Paper className="p-6">
                  <Typography variant="h4" className="font-bold mb-6">
                    Détails de votre projet
                  </Typography>
                  <QuoteForm />
                </Paper>
              </motion.div>
            </Grid>

            {/* Information Panel */}
            <Grid item xs={12} md={4}>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <Paper className="p-6">
                  <Typography variant="h5" className="font-bold mb-4">
                    Comment ça marche ?
                  </Typography>
                  <ol className="space-y-4">
                    <li className="flex items-start">
                      <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center mr-3">
                        1
                      </span>
                      <div>
                        <Typography variant="subtitle1" className="font-medium">
                          Remplissez le formulaire
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          Décrivez votre projet en détail pour nous aider à mieux comprendre vos besoins.
                        </Typography>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center mr-3">
                        2
                      </span>
                      <div>
                        <Typography variant="subtitle1" className="font-medium">
                          Analyse de votre demande
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          Notre équipe étudie votre projet et prépare une proposition adaptée.
                        </Typography>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center mr-3">
                        3
                      </span>
                      <div>
                        <Typography variant="subtitle1" className="font-medium">
                          Réception du devis
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          Vous recevez un devis détaillé sous 48h ouvrées.
                        </Typography>
                      </div>
                    </li>
                  </ol>
                </Paper>

                <Paper className="p-6">
                  <Typography variant="h5" className="font-bold mb-4">
                    Besoin d'aide ?
                  </Typography>
                  <Typography variant="body1" className="mb-4">
                    Notre équipe est là pour vous aider à définir votre projet.
                  </Typography>
                  <div className="space-y-2">
                    <Typography variant="body2">
                      Email: contact@fivedesign.com
                    </Typography>
                    <Typography variant="body2">
                      Tél: +33 1 23 45 67 89
                    </Typography>
                  </div>
                </Paper>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </section>
    </div>
  );
};

export default Quote;
