# Orchestra Management (web) App

## Descripción

La siguiente aplicación corresponde a una webApp sobre el stack PEAN para la propuesta de funcionalidades para el manejo y administración de Orquestas de cualquier tipo y nivel.

## ROADMAP

* Database de miembros de la agrupación. [check]
* Repositorio de partituras por repertorio.
* Administración de inventario.
* Chequeo de asistencia.
* Mejora en terminos de UI/UX.

## Ejecución

Para poder iniciar ambos extremos de la aplicación en un ambiente local, se debe tener los siguientes programas instalados en una maquina con algun distro de Linux instalado:
* Angular 13.0
* Angular CLI 13.0
* Node 16.10
* Postgresql

Luego, con el servicio de PostgreSQL iniciado, se debe tener una base de datos de nombre "orchestra", cuyo usuario con permisos debe tener las credenciales "orchestra" y "orchestra.
Finalmente, ejecutar en los siguientes procesos:
 
> npm install|   # En la carpeta orchestra-app
> node server.js # En la carpeta back-end
> ng serve       # En la carpeta orchestra-app
