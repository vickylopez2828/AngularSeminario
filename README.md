# MundoGaming

## Seminario Angular 2024
Apellido y Nombre: López Victoria Soledad  
Dni: 33908623  
Email: vickylopez2828@gmail.com  
Sede: Tandil  

## Proyecto
Mundo Gaming es una aplicación web de videojuegos. La plataforma permite a los usuarios explorar, seleccionar y comprar una amplia variedad de videojuegos. Existen juegos de acción, aventura, estrategia, entre otros. Ademas cuenta con otras funcionalidades como el registro y login de usuarios. Una vez logueado se podra acceder a un menu extra llamado "Mis juegos" en el cual se listaran los juegos que hayan sido comprados. Para pruebas pueden usarse los siguientes datos (usuario: test@gmail - password: 12345 o usar la alternativa de registrar un nuevo usuario)

Este proyecto fue generado [Angular CLI](https://github.com/angular/angular-cli) version 17.3.7.

## Api
La API proporciona datos de videojuegos que se pueden usar para desarrollar la aplicación y también permite el registro y login de usuarios. La api ha sido desarrolada con nodejs y express, la misma ha sido deployada en vercel.

#### API URL: "https://api-mundo-gaming.vercel.app"

#### Endpoints:

  ##### Endpoint: "/api/games"  
  Method: GET    
  Description: Obtiene una lista de todos los videojuegos.

  ##### Endpoint: "/api/users"  
  Method: POST  
  Description: permite registrar un usuario.  
  Body de la solicitud:  
    {  
        "name": "Nombre del usuario",  
        "lastname": "Apellido del usuario",  
        "email": "correo@example.com",  
        "password": "contraseña"  
    }  

  ##### Endpoint: "/api/users/login"   
  Method: POST    
  Description: permite loguear un usuario.  
  Body de la solicitud:  
    {  
        "email": "correo@example.com",  
        "password": "contraseña"  
    }  
  

## Stackblitz
Se puede utilizar Stackblitz para desarrollar y probar rápidamente la aplicación en línea. Enlace al proyecto:
https://stackblitz.com/~/github.com/vickylopez2828/AngularSeminario




