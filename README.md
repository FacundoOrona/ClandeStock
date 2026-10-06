<p align="center">
  <img src="https://img.shields.io/badge/Java-17-orange?style=for-the-badge&logo=openjdk" alt="Java 17"/>
  <img src="https://img.shields.io/badge/Spring%20Boot-3.5.7-brightgreen?style=for-the-badge&logo=springboot" alt="Spring Boot"/>
  <img src="https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react" alt="React"/>
  <img src="https://img.shields.io/badge/MySQL-8.0-blue?style=for-the-badge&logo=mysql" alt="MySQL"/>
  <img src="https://img.shields.io/badge/Docker-Containerized-2496ED?style=for-the-badge&logo=docker" alt="Docker"/>
  <img src="https://img.shields.io/badge/Maven-Build-C71A36?style=for-the-badge&logo=apachemaven" alt="Maven"/>
</p>

# ClandeStock

Sistema de gestión Full Stack orientado a restaurantes, buffets, heladerías y establecimientos gastronómicos.

ClandeStock permite centralizar la gestión de productos, subproductos, stock, ventas, pedidos, métodos de pago y operaciones de caja desde una única aplicación.

## 🚀 Funcionalidades

### 👤 Usuarios y roles

- Gestión de usuarios.
- Sistema de roles y permisos.
- Administradores y moderadores por local.
- Control de acceso según el rol del usuario.

### 🏪 Gestión de locales

- Administración de diferentes locales.
- Asociación de usuarios y productos a cada establecimiento.
- Gestión independiente de las operaciones de cada local.

### 📦 Productos y stock

- Alta, modificación y eliminación de productos.
- Gestión de subproductos.
- Control de stock.
- Actualización del stock según las operaciones realizadas.
- Gestión de productos asociados a cada local.

### 🛒 Ventas y pedidos

- Creación y gestión de pedidos.
- Registro de productos dentro de los pedidos.
- Gestión de ventas.
- Asociación de métodos de pago.
- Procesamiento de las operaciones comerciales.

### 💰 Gestión de caja

- Apertura de caja.
- Registro de operaciones.
- Control de ventas durante la jornada.
- Cierre de caja.
- Gestión de métodos de pago.

---

## 🏗️ Arquitectura

El proyecto está dividido en un frontend y un backend independientes que se comunican mediante APIs REST.

```text
┌──────────────────────┐
│       React          │
│      Frontend        │
└──────────┬───────────┘
           │
        HTTP/REST
           │
           ▼
┌──────────────────────┐
│    Spring Boot       │
│       Backend        │
└──────────┬───────────┘
           │
      JPA / Hibernate
           │
           ▼
┌──────────────────────┐
│       MySQL          │
│      Database        │
└──────────────────────┘
