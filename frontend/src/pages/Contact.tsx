import React from 'react';
import { motion } from 'framer-motion';
import { Container, Grid, Typography, Paper } from '@mui/material';
import ContactForm from '../components/forms/ContactForm';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const Contact: React.FC = () => {
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
              Contactez-nous
            </Typography>
            <Typography variant="h5" className="max-w-2xl mx-auto">
              Une question ? Un projet ? Nous sommes là pour vous accompagner
            </Typography>
          </motion.div>
        </Container>
      </section>

      {/* Contact Content */}
      <section className="py-20">
        <Container maxWidth="lg">
          <Grid container spacing={6}>
            {/* Contact Info */}
            <Grid item xs={12} md={4}>
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Paper className="p-6">
                    <div className="flex items-start space-x-4">
                      <LocationOnIcon className="text-primary" />
                      <div>
                        <Typography variant="h6" className="font-bold mb-2">
                          Notre adresse
                        </Typography>
                        <Typography variant="body1" color="textSecondary">
                          123 Rue du Design<br />
                          75000 Paris, France
                        </Typography>
                      </div>
                    </div>
                  </Paper>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <Paper className="p-6">
                    <div className="flex items-start space-x-4">
                      <PhoneIcon className="text-primary" />
                      <div>
                        <Typography variant="h6" className="font-bold mb-2">
                          Téléphone
                        </Typography>
                        <Typography variant="body1" color="textSecondary">
                          +33 1 23 45 67 89
                        </Typography>
                      </div>
                    </div>
                  </Paper>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <Paper className="p-6">
                    <div className="flex items-start space-x-4">
                      <EmailIcon className="text-primary" />
                      <div>
                        <Typography variant="h6" className="font-bold mb-2">
                          Email
                        </Typography>
                        <Typography variant="body1" color="textSecondary">
                          contact@fivedesign.com
                        </Typography>
                      </div>
                    </div>
                  </Paper>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <Paper className="p-6">
                    <div className="flex items-start space-x-4">
                      <AccessTimeIcon className="text-primary" />
                      <div>
                        <Typography variant="h6" className="font-bold mb-2">
                          Horaires
                        </Typography>
                        <Typography variant="body1" color="textSecondary">
                          Lundi - Vendredi<br />
                          9h00 - 18h00
                        </Typography>
                      </div>
                    </div>
                  </Paper>
                </motion.div>
              </div>
            </Grid>

            {/* Contact Form */}
            <Grid item xs={12} md={8}>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Paper className="p-6">
                  <Typography variant="h4" className="font-bold mb-6">
                    Envoyez-nous un message
                  </Typography>
                  <ContactForm />
                </Paper>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </section>

      {/* Map Section */}
      <section className="h-96 bg-gray-100">
        {/* Intégrer ici Google Maps */}
      </section>
    </div>
  );
};

export default Contact;
