import React from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  LinearProgress,
} from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

const monthlyData = [
  { month: 'Jan', quotes: 15, projects: 8, revenue: 25000 },
  { month: 'Fév', quotes: 20, projects: 12, revenue: 35000 },
  { month: 'Mar', quotes: 25, projects: 15, revenue: 45000 },
  { month: 'Avr', quotes: 30, projects: 18, revenue: 55000 },
  { month: 'Mai', quotes: 22, projects: 14, revenue: 40000 },
  { month: 'Juin', quotes: 28, projects: 16, revenue: 50000 },
];

const serviceDistribution = [
  { name: 'Web Design', value: 35 },
  { name: 'Branding', value: 25 },
  { name: 'Motion Design', value: 20 },
  { name: 'Print Design', value: 15 },
  { name: 'UI/UX', value: 5 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const StatsOverview: React.FC = () => {
  return (
    <Box className="p-6">
      <Typography variant="h4" className="font-bold mb-6">
        Statistiques
      </Typography>

      {/* KPIs */}
      <Grid container spacing={3} className="mb-6">
        <Grid item xs={12} md={3}>
          <Paper className="p-4">
            <Typography variant="subtitle2" color="textSecondary">
              Taux de conversion
            </Typography>
            <Typography variant="h4" className="font-bold mb-2">
              65%
            </Typography>
            <LinearProgress
              variant="determinate"
              value={65}
              className="h-2"
              color="primary"
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper className="p-4">
            <Typography variant="subtitle2" color="textSecondary">
              Projets actifs
            </Typography>
            <Typography variant="h4" className="font-bold mb-2">
              12
            </Typography>
            <LinearProgress
              variant="determinate"
              value={80}
              className="h-2"
              color="secondary"
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper className="p-4">
            <Typography variant="subtitle2" color="textSecondary">
              Devis en attente
            </Typography>
            <Typography variant="h4" className="font-bold mb-2">
              8
            </Typography>
            <LinearProgress
              variant="determinate"
              value={40}
              className="h-2"
              color="warning"
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper className="p-4">
            <Typography variant="subtitle2" color="textSecondary">
              Chiffre d'affaires mensuel
            </Typography>
            <Typography variant="h4" className="font-bold mb-2">
              50K€
            </Typography>
            <LinearProgress
              variant="determinate"
              value={75}
              className="h-2"
              color="success"
            />
          </Paper>
        </Grid>
      </Grid>

      {/* Charts */}
      <Grid container spacing={3}>
        {/* Revenue Chart */}
        <Grid item xs={12} md={8}>
          <Paper className="p-4">
            <Typography variant="h6" className="font-bold mb-4">
              Évolution du chiffre d'affaires
            </Typography>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#8884d8"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Paper>
        </Grid>

        {/* Service Distribution */}
        <Grid item xs={12} md={4}>
          <Paper className="p-4">
            <Typography variant="h6" className="font-bold mb-4">
              Répartition des services
            </Typography>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={serviceDistribution}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => 
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {serviceDistribution.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Paper>
        </Grid>

        {/* Projects and Quotes Comparison */}
        <Grid item xs={12}>
          <Paper className="p-4">
            <Typography variant="h6" className="font-bold mb-4">
              Comparaison Devis / Projets
            </Typography>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="quotes" name="Devis" fill="#8884d8" />
                  <Bar dataKey="projects" name="Projets" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default StatsOverview;
