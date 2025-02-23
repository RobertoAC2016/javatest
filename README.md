# Full Stack Developer Test (Angular + Express.js + PostgreSQL)

Esta guía te ayudará a configurar y ejecutar una aplicación Full Stack utilizando Angular, Express.js y PostgreSQL. La aplicación permite agregar, visualizar usuarios y sus transacciones.

## Requisitos Previos

- Git
- Docker
- Docker Compose

## Pasos para Configurar y Ejecutar la Aplicación

### 1. Clonar el Repositorio

Ejecuta el siguiente comando para descargar el proyecto:

```bash
git clone https://github.com/RobertoAC2016/javatest.git


Ejecuta el siguiente comando para moverte al directorio de la solución:


cd fullstack-app


Ejecuta el siguiente comando para iniciar los contenedores con la solución completa:


docker-compose up --build -d


Este comando construirá y levantará los contenedores necesarios para el backend (Express.js + PostgreSQL) y el frontend (Angular).


Abre tu navegador y accede a http://localhost para ver la aplicación en funcionamiento.


El proyecto está organizado de la siguiente manera:


fullstack-app/
├── backend/
│   ├── Dockerfile
│   ├── server.js
│   └── ...
├── frontend/
│   ├── Dockerfile
│   ├── src/
│   └── ...
├── docker-compose.yml
├── init.sql
└── README.md
backend/: Contiene el código del backend desarrollado con Express.js.
frontend/: Contiene el código del frontend desarrollado con Angular.
docker-compose.yml: Archivo de configuración de Docker Compose.
init.sql: Script de inicialización para la base de datos PostgreSQL.



