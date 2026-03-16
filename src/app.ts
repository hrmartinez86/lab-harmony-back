import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';
import { env } from './config/environment';
import { sequelize } from './config/database';
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import { swaggerSpec } from './docs/swagger';
import { errorHandler } from './middlewares/error.middleware';

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get('/api/docs.json', (req, res) => {
  res.json(swaggerSpec);
});

app.get('/', (req, res) => {
  res.send('API funcionando');
});

app.use(errorHandler);

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexión a MySQL establecida.');

    if (env.NODE_ENV === 'development') {
      await sequelize.sync({ alter: true });
      console.log('Base de datos sincronizada');
    }

    app.listen(env.PORT, () => {
      console.log(`Servidor corriendo en <http://localhost>:${env.PORT}`);
    });
  } catch (error) {
    console.error('Error al conectar a la DB:', error);
    process.exit(1);
  }
};

startServer();
