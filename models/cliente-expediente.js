// URL para acceder a la API
const URL = './api/datos.php?tabla=cliente_expediente';

/**
 * Selecciona los cliente_expedientes de la BD
 */
export async function seleccionarClienteExpedientes() {
    let res = await fetch(`${URL}&accion=seleccionar`);
    let datos = await res.json();
    if(res.status !== 200) {
        throw Error('Los datos no se encontraron');
    }
    return datos;
}

/**
 * Inserta los datos en la BD
 * @param datos los datos a insertar
 */
export const insertarClienteExpedientes = (datos) => {
    fetch(`${URL}&accion=insertar`, {
        method: 'POST',
        body: datos
    })
    .then(res => res.json())
    .then(data => {
        console.log(data);
        return data;
    });
}

/**
 * Modifica los datos en la BD
 * @param datos los datos a modificar
 * @param idexpediente el idexpediente del cliente_expediente a modificar
 */
export const actualizarClienteExpediente = (datos, idexpediente) => {
    fetch(URL + `&accion=actualizar&idexpediente=${idexpediente}`, {
        method: 'POST',
        body: datos
    })
    .then(res => res.json())
    .then(data => {
        console.log(data);
        return data;
    });
}

/**
 * Elimina un cliente_expediente en la BD
 * @param idexpediente el id del cliente_expediente a eliminar
 */
export const eliminarClienteExpediente = (idexpediente) => {
    fetch(URL + `&accion=eliminar&idexpediente=${idexpediente}`, {})
    .then(res => res.json())
    .then(data => {
        console.log(data);
        return data;
    });
}