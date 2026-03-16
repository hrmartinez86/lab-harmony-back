import { env } from '../config/environment';

export const swaggerSpec = {
  openapi: '3.0.3',
  info: {
    title: 'Lab Harmony API',
    version: '1.0.0',
    description: 'Documentacion de endpoints para autenticacion y usuarios.',
  },
  servers: [
    {
      url: `http://localhost:${env.PORT}`,
      description: 'Servidor local',
    },
  ],
  tags: [
    { name: 'Auth', description: 'Autenticacion' },
    { name: 'Users', description: 'Operaciones de usuario autenticado' },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
    schemas: {
      RegisterRequest: {
        type: 'object',
        required: ['name', 'email', 'password'],
        properties: {
          name: { type: 'string', example: 'Ruben Martinez' },
          email: { type: 'string', format: 'email', example: 'ruben@example.com' },
          password: { type: 'string', minLength: 6, example: 'MiClave123' },
        },
      },
      LoginRequest: {
        type: 'object',
        required: ['email', 'password'],
        properties: {
          email: { type: 'string', format: 'email', example: 'ruben@example.com' },
          password: { type: 'string', example: 'MiClave123' },
        },
      },
      UpdateProfileRequest: {
        type: 'object',
        properties: {
          name: { type: 'string', example: 'Ruben M.' },
          email: { type: 'string', format: 'email', example: 'nuevo@example.com' },
        },
      },
      ErrorResponse: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: false },
          message: { type: 'string', example: 'Ocurrio un error' },
          errors: {
            type: 'array',
            items: { type: 'object' },
          },
        },
      },
    },
  },
  paths: {
    '/api/auth/register': {
      post: {
        tags: ['Auth'],
        summary: 'Registrar usuario',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/RegisterRequest' },
            },
          },
        },
        responses: {
          '201': {
            description: 'Usuario registrado exitosamente',
          },
          '400': {
            description: 'Datos invalidos',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ErrorResponse' },
              },
            },
          },
        },
      },
    },
    '/api/auth/login': {
      post: {
        tags: ['Auth'],
        summary: 'Iniciar sesion',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/LoginRequest' },
            },
          },
        },
        responses: {
          '200': {
            description: 'Login exitoso',
          },
          '401': {
            description: 'Credenciales invalidas',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ErrorResponse' },
              },
            },
          },
        },
      },
    },
    '/api/users/profile': {
      get: {
        tags: ['Users'],
        summary: 'Obtener perfil del usuario autenticado',
        security: [{ bearerAuth: [] }],
        responses: {
          '200': {
            description: 'Perfil obtenido',
          },
          '401': {
            description: 'No autorizado',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ErrorResponse' },
              },
            },
          },
        },
      },
      post: {
        tags: ['Users'],
        summary: 'Actualizar perfil del usuario autenticado via POST',
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/UpdateProfileRequest' },
            },
          },
        },
        responses: {
          '200': {
            description: 'Perfil actualizado',
          },
          '401': {
            description: 'No autorizado',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ErrorResponse' },
              },
            },
          },
        },
      },
      put: {
        tags: ['Users'],
        summary: 'Actualizar perfil del usuario autenticado via PUT',
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/UpdateProfileRequest' },
            },
          },
        },
        responses: {
          '200': {
            description: 'Perfil actualizado',
          },
          '401': {
            description: 'No autorizado',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ErrorResponse' },
              },
            },
          },
        },
      },
    },
  },
};
