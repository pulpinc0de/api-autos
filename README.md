# Proyecto: API CRUD de autos (Express + MongoDB)

Descripción
API REST básica para gestionar autos, categorías y usuarios. Incluye autenticación por JWT para operaciones protegidas (crear/actualizar/eliminar autos). Está escrita con Node.js, Express y MongoDB (Mongoose).

Esquema de la base de datos (colecciones)
Note: user-related fields use English now (e.g. `name`, `password`).

- Colección `Categoria` (modelo `Categoria`)
  - _id: ObjectId
  - nombre: String (required)
  - descripcion: String (opcional)

- Colección `Auto` (modelo `Auto` / `Auto` en código exportado como `Auto`)
  - _id: ObjectId
  - marca: String (required)
  - modelo: String (required)
  - año: Number (required)
  - precio: Number (required)
  - categoria: ObjectId → referencia a `Categoria` (required)

- Collection `User` (model `User`)
  - _id: ObjectId
  - name: String (required)
  - email: String (required, unique)
  - password: String (hashed, required)

Tecnologías utilizadas
- Node.js
- Express
- MongoDB (Mongoose)
- JSON Web Tokens (JWT)
- bcryptjs (hash de contraseñas)
- dotenv, cors

Instalación y ejecución
1. Clonar el repositorio y entrar en la carpeta del proyecto:

```powershell
cd proyectoCRUD
```

2. Instalar dependencias:

```powershell
npm install
```

3. Configurar variables de entorno: crea un archivo `.env` en la raíz (`proyectoCRUD/.env`) con al menos:

```
MONGO_URI=mongodb://localhost:27017/mydatabase
JWT_SECRET=tu_secreto_jwt
# Opcional: cambiar base de la API usada por scripts de prueba
API_URL=http://localhost:3000
PORT=3000
```

4. Ejecutar la aplicación en modo desarrollo (con nodemon si está instalado):

```powershell
npm run dev
```

Listado de Endpoints (Rutas)
Base: `http://localhost:3000` (por defecto)

User routes (`/api/usuarios`)
- POST /api/usuarios/register — Register user
  - Body: { name, email, password }
  - Response: 201 -> { user, token }

- POST /api/usuarios/login — Login
  - Body: { email, password }
  - Response: 200 -> { user, token }

Rutas de categorías (`/api/categorias`)
- POST /api/categorias — Crear categoría
  - Body: { nombre, descripcion }
  - Respuesta: 201 -> categoría creada
- GET /api/categorias — Listar categorías
- GET /api/categorias/:id — Obtener categoría por id
- PUT /api/categorias/:id — Actualizar categoría
- DELETE /api/categorias/:id — Eliminar categoría

Rutas de autos (`/api/autos`)
- POST /api/autos — Crear auto (PROTEGIDO, requiere JWT)
  - Headers: Authorization: Bearer <token>
  - Body: { marca, modelo, año, precio, categoria }
  - Respuesta: 201 -> auto creado
- GET /api/autos — Listar autos (public)
- GET /api/autos/:id — Obtener auto por id (public)
- PUT /api/autos/:id — Actualizar auto (PROTEGIDO)
  - Headers: Authorization: Bearer <token>
- DELETE /api/autos/:id — Eliminar auto (PROTEGIDO)
  - Headers: Authorization: Bearer <token>

Detalles de autenticación
La protección de rutas usa el middleware `verifyToken` que espera el header `authorization` con el esquema `Bearer <token>`. El token se firma con la variable `JWT_SECRET` y expira en 1 hora.

Ejemplos de datos (JSON) para solicitudes POST

1) Register user (POST /api/usuarios/register)

```json
{
  "name": "Admin",
  "email": "admin@example.com",
  "password": "admin123"
}
```

2) Login (POST /api/usuarios/login)

```json
{
  "email": "admin@example.com",
  "password": "admin123"
}
```

3) Crear categoría (POST /api/categorias)

```json
{
  "nombre": "Sedán",
  "descripcion": "Autos cómodos para la ciudad"
}
```

4) Crear auto (POST /api/autos) — requiere token válido

```json
{
  "marca": "Toyota",
  "modelo": "Corolla",
  "año": 2020,
  "precio": 20000,
  "categoria": "64f8a2c9a1b2c3d4e5f67890"
}
```