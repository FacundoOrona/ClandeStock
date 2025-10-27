CREATE DATABASE clandestock_db;
USE clandestock_db;

-- Tabla de tipos de usuario
CREATE TABLE TipoUsuario_tb(
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    tipoUsuario VARCHAR(50) NOT NULL
);

-- Tabla de usuarios
CREATE TABLE Usuario_tb (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    nombreUsuario VARCHAR(50) NOT NULL UNIQUE,
   	contrasena VARCHAR(255) NOT NULL,
    tipoUsuario BIGINT NOT NULL,
    fechaCreacion DATETIME DEFAULT CURRENT_TIMESTAMP,
    estado BOOL,
    FOREIGN KEY (tipoUsuario) REFERENCES TipoUsuario_tb(id)
);

-- Tabla de tokens
CREATE TABLE Token_tb (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    usuarioID BIGINT NOT NULL,
    token TEXT NOT NULL,
    refreshToken TEXT,
    isRevoked BOOLEAN DEFAULT FALSE,
    isExpired BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (usuarioID) REFERENCES Usuario_tb(id)
);

-- Tabla de caja
CREATE TABLE Caja_tb (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    usuarioID BIGINT NOT NULL,
    fechaApertura DATETIME,
    fechaCierre DATETIME,
    montoApertura DECIMAL(10,2),
    montoCierre DECIMAL(10,2),
    estado BOOLEAN default TRUE,
    FOREIGN KEY (usuarioID) REFERENCES Usuario_tb(id)
);

-- Tabla de locales
CREATE TABLE Local_tb (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    nombreLocal VARCHAR(100) NOT NULL,
    cajaID BIGINT not null,
    FOREIGN KEY (cajaID) REFERENCES Caja_tb(id)
);

-- Tabla de categorías
CREATE TABLE Categoria_tb (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    nombreCategoria VARCHAR(100) NOT NULL,
    localID BIGINT not null,
    FOREIGN KEY (localID) REFERENCES Local_tb(id)
);

-- Tabla de productos principales
CREATE TABLE ProductoPrincipal_tb (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    localID BIGINT NOT NULL,
    nombreProducto VARCHAR(100) NOT NULL,
    precioProducto DECIMAL(10,2) NOT NULL,
    estado BOOLEAN DEFAULT TRUE,
    categoriaID bigint not null,
    foreign key (categoriaID) references Categoria_tb(id),
    FOREIGN KEY (localID) REFERENCES Local_tb(id)
);


-- Tabla de productos secundarios
CREATE TABLE ProductoSecundario_tb (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    productoID BIGINT NOT NULL,
    nombreProducto VARCHAR(100) NOT NULL,
    precioProducto DECIMAL(10,2),
    estado BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (productoID) REFERENCES ProductoPrincipal_tb(id)
);

-- Tabla de métodos de pago
CREATE TABLE MetodoPago_tb (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    nombreMetodoPago VARCHAR(50) NOT NULL,
    incremento DECIMAL(2,2),
    descuento  DECIMAL(2,2),
    estado bool default true,
    localID bigint not null,
    foreign key (localID) references local_tb(id)
);


-- Tabla de ventas
CREATE TABLE Ventas_tb (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    productoId BIGINT NOT NULL,
    usuarioID BIGINT NOT NULL,
    precioTotal DECIMAL(10,2) NOT NULL,
    metodoDePago BIGINT NOT NULL,
    fechaVenta DATETIME DEFAULT CURRENT_TIMESTAMP,
    estadoPago BOOLEAN default false,
    FOREIGN KEY (productoId) REFERENCES ProductoPrincipal_tb(id),
    FOREIGN KEY (usuarioID) REFERENCES Usuario_tb(id),
    FOREIGN KEY (metodoDePago) REFERENCES MetodoPago_tb(id)
);

-- Tabla de reportes
CREATE TABLE Reportes_tb (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    descripcion TEXT NOT NULL,
    usuarioEmisor BIGINT not null,
    estado VARCHAR(20), 
    FOREIGN KEY (usuarioEmisor) REFERENCES Usuario_tb(id)
);

CREATE TABLE ProdSecxProdPrim_tb (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    IDProductoPrimario BIGINT NOT NULL,
    IDProductoSecundario BIGINT NOT NULL,

    FOREIGN KEY (IDProductoPrimario) REFERENCES ProductoPrincipal_tb(id),
    FOREIGN KEY (IDProductoSecundario) REFERENCES ProductoSecundario_tb(id)
);

CREATE TABLE ProductoxVenta_tb (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    IDVenta BIGINT NOT NULL,
    nombreProducto VARCHAR(100) NOT NULL,
    precioProducto DECIMAL(10,2) NOT NULL,
    cantidad BIGINT NOT NULL,

    FOREIGN KEY (IDVenta) REFERENCES Ventas_tb(id)
);
