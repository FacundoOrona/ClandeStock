CREATE DATABASE clandestock_db;
USE clandestock_db;

-- Tabla de tipos de usuario
CREATE TABLE `tipo_usuario_tb` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `tipo_usuario` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- Tabla de usuarios
CREATE TABLE `usuario_tb` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `contrasena` varchar(255) NOT NULL,
  `estado` bit(1) DEFAULT NULL,
  `fecha_creacion` datetime DEFAULT CURRENT_TIMESTAMP,
  `nombre_usuario` varchar(50) NOT NULL,
  `tipo_usuario` bigint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK8ufj0wj0wqoww960efh331u7y` (`nombre_usuario`),
  KEY `FKdnhrqbwg2q6ss50xm4sjjfa2n` (`tipo_usuario`),
  CONSTRAINT `FKdnhrqbwg2q6ss50xm4sjjfa2n` FOREIGN KEY (`tipo_usuario`) REFERENCES `tipo_usuario_tb` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- Tabla de tokens
CREATE TABLE `token_tb` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `is_expired` bit(1) DEFAULT NULL,
  `is_revoked` bit(1) DEFAULT NULL,
  `refresh_token` varchar(255) DEFAULT NULL,
  `token` text NOT NULL,
  `token_type` enum('BEARER') DEFAULT NULL,
  `usuarioid` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK7gcys17si5qom3mkylmds7lxw` (`usuarioid`),
  CONSTRAINT `FK7gcys17si5qom3mkylmds7lxw` FOREIGN KEY (`usuarioid`) REFERENCES `usuario_tb` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- Tabla de caja
CREATE TABLE `caja_tb` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `estado` bit(1) DEFAULT NULL,
  `fecha_apertura` datetime(6) DEFAULT NULL,
  `fecha_cierre` datetime(6) DEFAULT NULL,
  `monto_apertura` decimal(10,2) DEFAULT NULL,
  `monto_cierre` decimal(10,2) DEFAULT NULL,
  `usuarioid` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKa2vyvoejxae4v7ggg7q11f1j9` (`usuarioid`),
  CONSTRAINT `FKa2vyvoejxae4v7ggg7q11f1j9` FOREIGN KEY (`usuarioid`) REFERENCES `usuario_tb` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- Tabla de locales
CREATE TABLE `local_tb` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `nombre_local` varchar(100) NOT NULL,
  `cajaid` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKqrvy1grpflnni3shmehv1f95h` (`cajaid`),
  CONSTRAINT `FKqrvy1grpflnni3shmehv1f95h` FOREIGN KEY (`cajaid`) REFERENCES `caja_tb` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- Tabla de categorías
CREATE TABLE `categoria_tb` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `nombre_categoria` varchar(100) NOT NULL,
  `localid` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK8mt82byq03nthrd84obg03e1b` (`localid`),
  CONSTRAINT `FK8mt82byq03nthrd84obg03e1b` FOREIGN KEY (`localid`) REFERENCES `local_tb` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- Tabla de productos principales
CREATE TABLE `producto_principal_tb` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `estado` bit(1) DEFAULT NULL,
  `nombre_producto` varchar(100) NOT NULL,
  `precio_producto` decimal(10,2) NOT NULL,
  `categoriaid` bigint NOT NULL,
  `localid` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK1x5fu9sr147cidh4aomlp4orv` (`categoriaid`),
  KEY `FK1t8hlk6t9fee7a0uo6v5x2fgc` (`localid`),
  CONSTRAINT `FK1t8hlk6t9fee7a0uo6v5x2fgc` FOREIGN KEY (`localid`) REFERENCES `local_tb` (`id`),
  CONSTRAINT `FK1x5fu9sr147cidh4aomlp4orv` FOREIGN KEY (`categoriaid`) REFERENCES `categoria_tb` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;



-- Tabla de productos secundarios
CREATE TABLE `producto_secundario_tb` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `estado` bit(1) DEFAULT NULL,
  `nombre_producto` varchar(100) NOT NULL,
  `precio_producto` decimal(10,2) DEFAULT NULL,
  `productoid` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK14ls64vj6mmevn4cd9qnngajj` (`productoid`),
  CONSTRAINT `FK14ls64vj6mmevn4cd9qnngajj` FOREIGN KEY (`productoid`) REFERENCES `producto_principal_tb` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- Tabla de métodos de pago
CREATE TABLE `metodo_pago_tb` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `descuento` decimal(2,2) DEFAULT NULL,
  `estado` bit(1) DEFAULT NULL,
  `incremento` decimal(2,2) DEFAULT NULL,
  `nombre_metodo_pago` varchar(50) NOT NULL,
  `localid` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKn3d1hem9ca4myhk7rrh33o2e2` (`localid`),
  CONSTRAINT `FKn3d1hem9ca4myhk7rrh33o2e2` FOREIGN KEY (`localid`) REFERENCES `local_tb` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;



-- Tabla de ventas
CREATE TABLE `ventas_tb` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `estado_pago` bit(1) DEFAULT NULL,
  `fecha_venta` datetime DEFAULT CURRENT_TIMESTAMP,
  `precio_total` decimal(10,2) NOT NULL,
  `metodo_de_pago` bigint NOT NULL,
  `producto_id` bigint NOT NULL,
  `usuarioid` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKcibrskmo46xdjt0hc58xc63i5` (`metodo_de_pago`),
  KEY `FKo6fnt73j4s2ax58jc143nhoi9` (`producto_id`),
  KEY `FKr2i71u44dig002136p0xwp0df` (`usuarioid`),
  CONSTRAINT `FKcibrskmo46xdjt0hc58xc63i5` FOREIGN KEY (`metodo_de_pago`) REFERENCES `metodo_pago_tb` (`id`),
  CONSTRAINT `FKo6fnt73j4s2ax58jc143nhoi9` FOREIGN KEY (`producto_id`) REFERENCES `producto_principal_tb` (`id`),
  CONSTRAINT `FKr2i71u44dig002136p0xwp0df` FOREIGN KEY (`usuarioid`) REFERENCES `usuario_tb` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- Tabla de reportes
CREATE TABLE `reportes_tb` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `descripcion` text NOT NULL,
  `estado` varchar(20) DEFAULT NULL,
  `usuario_emisor` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKio14b8wmn86vf8rbhcei2gpnk` (`usuario_emisor`),
  CONSTRAINT `FKio14b8wmn86vf8rbhcei2gpnk` FOREIGN KEY (`usuario_emisor`) REFERENCES `usuario_tb` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE `prod_secx_prod_prim_tb` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `idproducto_primario` bigint NOT NULL,
  `idproducto_secundario` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKpue1vx3txq8cjxym65it2dhhe` (`idproducto_primario`),
  KEY `FKbj11xnpotia5h3x5gnne3g8hd` (`idproducto_secundario`),
  CONSTRAINT `FKbj11xnpotia5h3x5gnne3g8hd` FOREIGN KEY (`idproducto_secundario`) REFERENCES `producto_secundario_tb` (`id`),
  CONSTRAINT `FKpue1vx3txq8cjxym65it2dhhe` FOREIGN KEY (`idproducto_primario`) REFERENCES `producto_principal_tb` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE `productox_venta_tb` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `cantidad` bigint NOT NULL,
  `nombre_producto` varchar(100) NOT NULL,
  `precio_producto` decimal(10,2) NOT NULL,
  `idventa` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK4i5ou8kmjr8ghxhag3wv473im` (`idventa`),
  CONSTRAINT `FK4i5ou8kmjr8ghxhag3wv473im` FOREIGN KEY (`idventa`) REFERENCES `ventas_tb` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

