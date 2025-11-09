import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

import authRoutes from './routes/auth.routes.js';
import profesionalRoutes from './routes/profesionalesRoutes.js';
import categoriasRoutes from './routes/categorias.routes.js';
import profesionesRoutes from './routes/profesiones.routes.js';
import serviciosRoutes from './routes/servicios.routes.js';
import citasRoutes from './routes/citas.routes.js';
import reseñasRoutes from './routes/reseñas.routes.js';

const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser()); 

app.use('/api', authRoutes);
app.use('/api', profesionalRoutes);
app.use('/api', categoriasRoutes);
app.use('/api', profesionesRoutes);
app.use('/api', serviciosRoutes);
app.use('/api', citasRoutes);
app.use('/api', reseñasRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
