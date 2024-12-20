drop database if exists inventario;
create database inventario;
use inventario;

CREATE TABLE Aula (
    idAula INT AUTO_INCREMENT PRIMARY KEY,
    Numeracion VARCHAR(255) NOT NULL,
    Descripcion TEXT,
    IP VARCHAR(15) NOT NULL
);

CREATE TABLE Producto (
    idProducto INT AUTO_INCREMENT PRIMARY KEY,
    Descripcion TEXT NOT NULL,
    EAN INT NOT NULL,
    keyRFID VARCHAR(10) NOT NULL
);

-- Crear la tabla Categoría
CREATE TABLE Categoria (
    idCategoria INT AUTO_INCREMENT PRIMARY KEY,
    Nombre VARCHAR(255) NOT NULL,
    Descripcion TEXT,
    Estado Varchar(20) NOT NULL
);

-- Crear la tabla ProductoPorCategoria
CREATE TABLE ProductoPorCategoria (
    idProducto INT NOT NULL,
    idCategoria INT NOT NULL,
    PRIMARY KEY (idProducto, idCategoria),
    FOREIGN KEY (idProducto) REFERENCES Producto(idProducto),
    FOREIGN KEY (idCategoria) REFERENCES Categoria(idCategoria)
);

-- Crear la tabla Marcajes
CREATE TABLE Marcajes (
    idMarcaje INT AUTO_INCREMENT PRIMARY KEY,
    idProducto INT NOT NULL,
    idAula INT NOT NULL,
    Tipo INT NOT NULL,
    TimeStamp DATETIME NOT NULL,
    FOREIGN KEY (idProducto) REFERENCES Producto(idProducto),
    FOREIGN KEY (idAula) REFERENCES Aula(idAula)
);
