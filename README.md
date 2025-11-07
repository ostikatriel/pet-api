# Backend - Aplicación de Mascotas

Este es el backend de la aplicación de gestión de mascotas, desarrollado con [NestJS](https://nestjs.com/), un framework progresivo de Node.js para construir aplicaciones eficientes y escalables del lado del servidor.

## Características

-   Framework basado en NestJS con TypeScript.
-   Autenticación de usuarios basada en JWT (JSON Web Tokens).
-   Gestión de usuarios y mascotas.
-   Conexión a base de datos PostgreSQL a través de TypeORM.
-   Configuración basada en variables de entorno.

## Requisitos

-   [Node.js](https://nodejs.org/) (v22.20.0)
-   [yarn](https://yarnpkg.com/)
-   Una instancia de [PostgreSQL](https://www.postgresql.org/)

## Pasos para Levantar en Desarrollo

Sigue estos pasos para configurar y ejecutar el proyecto en tu entorno local.

### 1. Clonar el Repositorio

```bash
git clone <url-del-repositorio>
cd pet-api
```

### 2. Instalar Dependencias

Instala todas las dependencias del proyecto usando npm o yarn.

```bash
yarn install
```

### 3. Configurar Variables de Entorno

Crea un archivo `.env` en la raíz del directorio `backend` y añade las siguientes variables. Este archivo es utilizado por `@nestjs/config` para cargar la configuración de tu entorno.

```env
# URL de conexión a tu base de datos PostgreSQL
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"

# Secreto para firmar los JSON Web Tokens
JWT_SECRET="tu-secreto-para-jwt"
```

### 4. Ejecutar la Aplicación

Una vez configurado, puedes iniciar la aplicación en modo de desarrollo. El servidor se reiniciará automáticamente con cada cambio que realices en el código fuente.

```bash
yarn start:dev
```

La aplicación estará disponible en `http://localhost:3000` (o el puerto que tengas configurado).

## Base de Datos y Seeder

El proyecto está configurado con TypeORM para sincronizar automáticamente las entidades con la base de datos (`synchronize: true`). Esta opción es ideal para desarrollo, pero debe desactivarse en producción.

### Seeder del Administrador

El sistema cuenta con un mecanismo de "seeding" para crear un usuario administrador por defecto. Esto es útil para tener un usuario inicial con el que probar la aplicación.

Para ejecutar el seeder, utiliza el siguiente comando:

```bash
yarn run seed
```

Este comando poblará la base de datos con un usuario administrador con las siguientes credenciales (o las que estén definidas en el script del seeder):

-   **Email:** `admin@test.com`
-   **Contraseña:** `admin123`
