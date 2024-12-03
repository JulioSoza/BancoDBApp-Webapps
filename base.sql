CREATE DATABASE IF NOT EXISTS BancoDB;

USE BancoDB;

CREATE TABLE IF NOT EXISTS clientes (
    id_cliente INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50),
    ciudad VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS cuentas (
    id_cuenta INT AUTO_INCREMENT PRIMARY KEY,
    id_cliente INT,
    tipo_cuenta VARCHAR(20),
    saldo DECIMAL(10, 2),
    FOREIGN KEY (id_cliente) REFERENCES clientes(id_cliente)
);

INSERT INTO clientes (nombre, ciudad) VALUES
('Pedro', 'Guatemala'),
('María', 'Antigua'),
('Juan', 'Escuintla'),
('Ana', 'Quetzaltenango');

INSERT INTO cuentas (id_cliente, tipo_cuenta, saldo) VALUES
(1, 'Monetaria', 1000),
(2, 'Ahorro', 2000),
(3, 'Corriente', 1500),
(4, 'Ahorro', 3000);
