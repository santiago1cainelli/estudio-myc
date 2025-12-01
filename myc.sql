-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 01-12-2025 a las 03:58:10
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `myc`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clientes`
--

CREATE TABLE `clientes` (
  `id` int(11) NOT NULL,
  `tipo_persona` varchar(50) NOT NULL,
  `tipo_dni` varchar(20) NOT NULL,
  `apellido_rsocial` varchar(100) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `domicilio` varchar(100) NOT NULL,
  `telefono` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `localidad` varchar(100) NOT NULL,
  `cpostal` int(50) NOT NULL,
  `fnacimiento` date NOT NULL,
  `falta` date NOT NULL,
  `fbaja` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `clientes`
--

INSERT INTO `clientes` (`id`, `tipo_persona`, `tipo_dni`, `apellido_rsocial`, `nombre`, `domicilio`, `telefono`, `email`, `localidad`, `cpostal`, `fnacimiento`, `falta`, `fbaja`) VALUES
(1, 'Persona Fisica', '46970241', 'Cainelli', 'Santiago', 'Dorrego 1917', '3476123966', 'santiagocainelli@institutocedec.com', 'San Lorenzo', 220, '2006-01-21', '2025-11-08', '2025-11-29'),
(5, 'Persona Fisica', '42464578', 'Paredes', 'Julian', 'Pousel 1053', '123456', 'tatucainelli@gmail.com', 'San Lorenzo', 220, '2001-03-29', '2025-11-20', '2025-11-30');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cliente_expediente`
--

CREATE TABLE `cliente_expediente` (
  `idcliente` int(11) NOT NULL,
  `idexpediente` int(11) NOT NULL,
  `demandante` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `cliente_expediente`
--

INSERT INTO `cliente_expediente` (`idcliente`, `idexpediente`, `demandante`) VALUES
(1, 1, 'Demandante'),
(5, 5, 'Demandado');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `expedientes`
--

CREATE TABLE `expedientes` (
  `id` int(11) NOT NULL,
  `tipo_expediente` varchar(50) NOT NULL,
  `nro_expediente` int(50) NOT NULL,
  `juzgado` int(50) NOT NULL,
  `caratula` varchar(100) NOT NULL,
  `fecha_inicio` date NOT NULL,
  `tipo_juicio` varchar(100) NOT NULL,
  `acargode` varchar(100) NOT NULL,
  `fecha_fin` date NOT NULL,
  `estado` varchar(100) NOT NULL,
  `fecha_baja` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `expedientes`
--

INSERT INTO `expedientes` (`id`, `tipo_expediente`, `nro_expediente`, `juzgado`, `caratula`, `fecha_inicio`, `tipo_juicio`, `acargode`, `fecha_fin`, `estado`, `fecha_baja`) VALUES
(1, 'Judicial', 1, 1, 'Expediente de Santiago Cainelli', '2025-11-08', 'de ejecución', 'Andrés', '2025-11-29', 'Activo', '2025-11-29'),
(5, 'Extrajudicial', 1, 1, 'Expediente de Julián Paredes ', '2025-11-21', 'penal', 'Maria', '2025-11-22', 'Resuleto favorable', '2025-11-22');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `juzgado`
--

CREATE TABLE `juzgado` (
  `id` int(11) NOT NULL,
  `nro_juzgado` int(50) NOT NULL,
  `nombre_juzgado` varchar(100) NOT NULL,
  `jueztram` varchar(100) NOT NULL,
  `secretario` varchar(100) NOT NULL,
  `telefono` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `juzgado`
--

INSERT INTO `juzgado` (`id`, `nro_juzgado`, `nombre_juzgado`, `jueztram`, `secretario`, `telefono`) VALUES
(1, 1, 'Tribunales de San Lorenzo', 'Alberto', 'Julian', '123456789'),
(3, 2, 'Tribunal de Rosario', 'Maria', 'Luis', '67877');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `correo` varchar(191) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `apellido` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `imagen` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `correo`, `nombre`, `apellido`, `password`, `imagen`) VALUES
(1, 'abogado@gmail.com', 'Andrés', 'Paredes', '1234', 'nodisponible.png');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `cliente_expediente`
--
ALTER TABLE `cliente_expediente`
  ADD PRIMARY KEY (`idcliente`,`idexpediente`);

--
-- Indices de la tabla `expedientes`
--
ALTER TABLE `expedientes`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `juzgado`
--
ALTER TABLE `juzgado`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `clientes`
--
ALTER TABLE `clientes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `expedientes`
--
ALTER TABLE `expedientes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT de la tabla `juzgado`
--
ALTER TABLE `juzgado`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
