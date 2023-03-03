
# API
## Esta es una API creada con Node.js y ejecutada en un contenedor de Docker.

## Requisitos
- Node.js 12 o superior
- Docker
- DB mysqual, correr script 'script-db-prueba' en el motor

# Instalación
 ## Clonar el repositorio
- git clone https://github.com/JheanCF/api-personas.git
- npm install
# Uso
- docker build -t api-prueba .
- docker run --network=host api-prueba

# Endpoint
- POST /login
    genera el token para acceder a los demas endpoints.
- POST /reistro
    registar una persona, es necesario en headers enviar token.
- GET /leads
    listar personas registradas, es necesario en headers enviar token.
# Landing Page

## Esta es una intefaz es creada para acceder a los datos almacenados de las persona e ingresar nuevas personas .

## Requisitos
- Angular 15

# Instalación
 ## Clonar el repositorio
- git clone https://github.com/JheanCF/front-end-personas.git
- npm install
# Uso
- npm start

# Rutas
-  /
    lista personas registradas.
- /registro
    formulario de registo de personas.