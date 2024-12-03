import React from 'react';
import { Grid, Paper, Typography, Box } from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const data = [
  { name: 'Jan', quotes: 4, projects: 2, contacts: 8 },
  { name: 'Fév', quotes: 3, projects: 1, contacts: 6 },
  { name: 'Mar', quotes: 5, projects: 3, contacts: 9 },
  { name: 'Avr', quotes: 6, projects: 4, contacts: 12 },
  { name: 'Mai', quotes: 4, projects: 2, contacts: 7 },
  { name: 'Juin', quotes: 7, projects: 5, contacts: 15 },
];

const DashboardCard = ({ title, value, description }: { title: string; value: string | number; description: string }) => (
  <Paper className="p-6 h-full">
    <Typography variant="h6" className="font-bold mb-2">
      {title}
    </Typography>
    <Typography variant="h4" className="font-bold text-primary mb-1">
      {value}
    </Typography>
    <Typography variant="body2" color="textSecondary">
      {description}
    </Typography>
  </Paper>
);

const Dashboard: React.FC = () => {
  return (
    <Box className="p-6">
      <Typography variant="h4" className="mb-6 font-bold">
        Tableau de bord
      </Typography>

      {/* Statistiques */}
      <Grid container spacing={4} className="mb-8">
        <Grid item xs={12} sm={6} md={3}>
          <DashboardCard
            title="Devis en attente"
            value={12}
            description="+33% ce mois-ci"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <DashboardCard
            title="Projets actifs"
            value={8}
            description="5 en cours de réalisation"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <DashboardCard
            title="Messages non lus"
            value={24}
            description="15 nouveaux aujourd'hui"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <DashboardCard
            title="Articles publiés"
            value={45}
            description="3 en attente de relecture"
          />
        </Grid>
      </Grid>

      {/* Graphique */}
      <Paper className="p-6 mb-8">
        <Typography variant="h6" className="font-bold mb-4">
          Activité des 6 derniers mois
        </Typography>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="quotes" name="Devis" fill="#4A148C" />
              <Bar dataKey="projects" name="Projets" fill="#FFD700" />
              <Bar dataKey="contacts" name="Contacts" fill="#9E9E9E" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Paper>

      {/* Dernières activités */}
      <Paper className="p-6">
        <Typography variant="h6" className="font-bold mb-4">
          Dernières activités
        </Typography>
        <div className="space-y-4">
          {[
            { action: 'Nouveau devis reçu', details: 'Site web e-commerce - Budget: 5000€', time: 'Il y a 2 heures' },
            { action: 'Projet mis à jour', details: 'Logo Startup XYZ - Phase de révision', time: 'Il y a 4 heures' },
            { action: 'Article publié', details: 'Tendances design 2024', time: 'Il y a 6 heures' },
          ].map((activity, index) => (
            <div key={index} className="border-b pb-4 last:border-b-0">
              <Typography variant="subtitle1" className="font-medium">
                {activity.action}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {activity.details}
              </Typography>
              <Typography variant="caption" color="textSecondary">
                {activity.time}
              </Typography>
            </div>
          ))}
        </div>
      </Paper>
    </Box>
  );
};

export default Dashboard;
