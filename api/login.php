<?php
// Requerimos la clase Modelo
require_once 'modelos.php';

$valores = $_POST;

$correo = "'".$valores['correo']."'";
$password = "'".$valores['password']."'";

$correos = new Modelo('usuarios');

$correos->setCriterio("correo=$correo AND password=$password");

$datos = $correos->seleccionar();

echo $datos;
?>