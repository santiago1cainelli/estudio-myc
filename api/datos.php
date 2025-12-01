<?php
// Requerimos el archivo modelos.php
require_once 'modelos.php';

// Si hay en parámetro tabla
if(isset($_GET['tabla'])) { // Si está seteado el parámetro tabla
    $tabla = new Modelo($_GET['tabla']); // Creamos el objeto tabla

    // Si hay parámetro id
    if(isset($_GET['id'])) {
        $tabla->setCriterio("id=" . $_GET['id']);
    }

    if(isset($_GET['idexpediente'])) {
        $tabla->setCriterio("idexpediente=" . $_GET['idexpediente']);
    }

    // Si hay criterio
    if(isset($_GET['criterio'])) {
        $tabla->setCriterio($_GET['criterio']);
    }

    if(isset($_GET['accion'])) { // Si está seteado el parámetro accion
        $accion = $_GET['accion']; // Guardamos el parámetro en una variable

        if($accion === 'insertar' || $accion === 'actualizar') {
            $valores = $_POST; // Guardamos los valores que viene desde el modelo
        }

        // Subir imágenes
        if(
            isset($_FILES) &&
            isset($_FILES['imagen']) &&
            !empty($_FILES['imagen']['name'] &&
            !empty($_FILES['imagen']['tmp_name']))
        ) {
            if(is_uploaded_file($_FILES['imagen']['tmp_name'])) {
                $nombre_temporal = $_FILES['imagen']['tmp_name'];
                $nombre = $_FILES['imagen']['name'];
                $destino = '../imagenes/' . $nombre;

                if(move_uploaded_file($nombre_temporal, $destino)) {
                    $mensaje = 'Archivo subido correctamente a ' . $destino;
                    $valores['imagen'] = $nombre;
                } else {
                    $mensaje = 'No se ha podido subir el archivo';
                    unlink(ini_get('upload_tmp_dir').$nombre_temporal);
                }
            } else {
                $mensaje = 'Error: El archivo no fue procesado correctamente';
            }
        }

        // Verificamos la accón y ejecutamos según el caso
        switch( $accion ) {
            case 'seleccionar': // En caso que sea seleccionar
                $datos = $tabla->seleccionar(); // Ejecutamos el método seleccionar
                echo $datos; // Mostramos los datos
                break;
            case 'insertar': // En caso que sea insertar
                // Ejecutamos el método insertar y capturamos el ID
                $id_insertado = $tabla->insertar($valores);

                $response = [
                    'success' => true,
                    'message' => 'Pedido insertado correctamente.',
                    'id' => $id_insertado,
                ];
                
                // Siempre enviamos la respuesta JSON al final
                echo json_encode($response);
                break;
            case 'actualizar': // En caso que sea actualizar
                $tabla->actualizar($valores); // Ejecutamos el método actualizar
                $mensaje = "Datos actualizados";
                echo json_encode($mensaje);
                break;
            case 'eliminar': // En caso que sea eliminar
                $tabla->eliminar(); // Ejecutamos el método elliminar
                $mensaje = "Dato eliminado";
                echo json_encode($mensaje);
                break;
        }
    }
}
?>