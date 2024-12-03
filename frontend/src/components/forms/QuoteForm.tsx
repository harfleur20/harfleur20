import React, { useState } from 'react';
import { 
  TextField, 
  Button, 
  Grid, 
  Alert, 
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  Typography,
  Chip,
  SelectChangeEvent
} from '@mui/material';
import { motion } from 'framer-motion';

interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  serviceType: string;
  budget: number;
  deadline: string;
  description: string;
  requirements: string[];
}

const serviceTypes = [
  'Branding',
  'Web Design',
  'Motion Design',
  'Print Design',
  'Photographie',
  'Vidéo',
];

const requirementOptions = [
  'Logo',
  'Charte graphique',
  'Site web',
  'Réseaux sociaux',
  'Packaging',
  'Illustrations',
  'Animation',
  'Photos',
];

const QuoteForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    serviceType: '',
    budget: 1000,
    deadline: '',
    description: '',
    requirements: [],
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }> | SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name as string]: value
    }));
  };

  const handleRequirementToggle = (requirement: string) => {
    setFormData(prev => ({
      ...prev,
      requirements: prev.requirements.includes(requirement)
        ? prev.requirements.filter(r => r !== requirement)
        : [...prev.requirements, requirement],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simuler un appel API
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        serviceType: '',
        budget: 1000,
        deadline: '',
        description: '',
        requirements: [],
      });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <Grid container spacing={3}>
        {/* Informations personnelles */}
        <Grid item xs={12} sm={6}>
          <TextField
            name="name"
            label="Nom complet"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            required
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="email"
            label="Email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            required
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="phone"
            label="Téléphone"
            value={formData.phone}
            onChange={handleChange}
            fullWidth
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="company"
            label="Entreprise"
            value={formData.company}
            onChange={handleChange}
            fullWidth
            variant="outlined"
          />
        </Grid>

        {/* Type de service */}
        <Grid item xs={12}>
          <FormControl fullWidth required>
            <InputLabel>Type de service</InputLabel>
            <Select
              name="serviceType"
              value={formData.serviceType}
              onChange={handleChange}
              label="Type de service"
            >
              {serviceTypes.map((service) => (
                <MenuItem key={service} value={service}>
                  {service}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {/* Budget */}
        <Grid item xs={12}>
          <Typography gutterBottom>
            Budget estimé : {formData.budget}€
          </Typography>
          <Slider
            value={formData.budget}
            onChange={(_, value) => setFormData(prev => ({ ...prev, budget: value as number }))}
            min={500}
            max={10000}
            step={500}
            marks
            valueLabelDisplay="auto"
            className="text-primary"
          />
        </Grid>

        {/* Deadline */}
        <Grid item xs={12}>
          <TextField
            name="deadline"
            label="Date limite souhaitée"
            type="date"
            value={formData.deadline}
            onChange={handleChange}
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
        </Grid>

        {/* Besoins spécifiques */}
        <Grid item xs={12}>
          <Typography gutterBottom>
            Besoins spécifiques
          </Typography>
          <div className="flex flex-wrap gap-2">
            {requirementOptions.map((requirement) => (
              <Chip
                key={requirement}
                label={requirement}
                onClick={() => handleRequirementToggle(requirement)}
                color={formData.requirements.includes(requirement) ? 'primary' : 'default'}
                className="cursor-pointer"
              />
            ))}
          </div>
        </Grid>

        {/* Description du projet */}
        <Grid item xs={12}>
          <TextField
            name="description"
            label="Description du projet"
            value={formData.description}
            onChange={handleChange}
            fullWidth
            required
            multiline
            rows={4}
            variant="outlined"
          />
        </Grid>
      </Grid>

      {submitStatus && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Alert 
            severity={submitStatus} 
            onClose={() => setSubmitStatus(null)}
            className="mb-4"
          >
            {submitStatus === 'success' 
              ? 'Votre demande de devis a été envoyée avec succès !' 
              : 'Une erreur est survenue. Veuillez réessayer.'}
          </Alert>
        </motion.div>
      )}

      <Button
        type="submit"
        variant="contained"
        color="primary"
        size="large"
        fullWidth
        disabled={isSubmitting}
        className="h-12"
      >
        {isSubmitting ? (
          <CircularProgress size={24} color="inherit" />
        ) : (
          'Demander un devis'
        )}
      </Button>
    </motion.form>
  );
};

export default QuoteForm;
