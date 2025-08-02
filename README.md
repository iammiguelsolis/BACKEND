# BACKEND-API

Este es un backend simple para una aplicación de notas, construido con Node.js, Express y MongoDB (usando Mongoose). Permite crear, leer, actualizar y eliminar notas a través de una API RESTful.

## Características

- CRUD de notas (Create, Read, Update, Delete)
- Conexión a MongoDB Atlas usando Mongoose
- Middleware de logging para solicitudes
- Manejo de CORS
- Configuración de variables de entorno con dotenv
- Preparado para despliegue en Vercel

## Instalación

1. Clona este repositorio:
   ```sh
   git clone https://github.com/iammiguelsolis/BACKEND
   cd tu-repo
   ```

2. Instala las dependencias:
   ```sh
   npm install
   ```

3. Crea un archivo `.env` en la raíz del proyecto y agrega tu URI de MongoDB:
   ```
   MONGODB_URI=tu_mongodb_uri
   ```

## Scripts

- `npm run dev`: Inicia el servidor en modo desarrollo con nodemon.
- `npm start`: Inicia el servidor en modo producción.

## Endpoints

- `GET /`  
  Responde con un mensaje de bienvenida.

- `GET /api/notes`  
  Devuelve todas las notas.

- `GET /api/notes/:id`  
  Devuelve una nota específica por ID.

- `POST /api/notes`  
  Crea una nueva nota.  
  **Body:**  
  ```json
  {
    "content": "Texto de la nota",
    "important": true
  }
  ```

- `DELETE /api/notes/:id`  
  Elimina una nota por ID.

## Estructura del Proyecto

```
.
├── index.js
├── loggerMiddleware.js
├── models/
│   └── note.js
├── package.json
├── .env
├── .gitignore
├── vercel.json
└── README.md
```

## Despliegue

Este proyecto está preparado para ser desplegado en Vercel. Consulta el archivo `vercel.json` para la configuración.

## Licencia

ISC

---

Desarrollado por [tu nombre o usuario de GitHub].