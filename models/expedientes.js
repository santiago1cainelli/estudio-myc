// URL para acceder a la API
const URL = './api/datos.php?tabla=expedientes';

/**
 * Selecciona los expedientes de la BD
 */
export async function seleccionarExpedientes() {
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
export const insertarExpedientes = async (datos) => {
    const res = await fetch(`${URL}&accion=insertar`, {
        method: 'POST',
        body: datos
    });

    const data = await res.json();
    console.log("Informacion que devuelve el insertar expediente:", data);
    
    return data;
};


/**
 * Modifica los datos en la BD
 * @param datos los datos a modificar
 * @param id el id del expediente a modificar
 */
export const actualizarExpediente = (datos, id) => {
    fetch(URL + `&accion=actualizar&id=${id}`, {
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
 * Elimina un expediente en la BD
 * @param id el id del expediente a eliminar
 */
export const eliminarExpediente = (id) => {
    fetch(URL + `&accion=eliminar&id=${id}`, {})
    .then(res => res.json())
    .then(data => {
        console.log(data);
        return data;
    });
}