import { actualizarJuzgado, eliminarJuzgado, insertarJuzgados, seleccionarJuzgados } from "../models/juzgados.js";
// Objetos del DOM
const listado = document.querySelector('#listado-juzgados');
const alerta = document.querySelector('#alerta');

// Formulario
const formulario = document.querySelector('#formulario');
const formularioModal = new bootstrap.Modal(document.querySelector('#modal-juzgado'));
const btnNuevo = document.querySelector('#btnNuevo');

// Inputs
const inputNroJuzgado = document.querySelector('#nro_juzgado');
const inputNombreJuzgado = document.querySelector('#nombre_juzgado');
const inputJueztram = document.querySelector('#jueztram');
const inputSecretario = document.querySelector('#secretario');
const inputTelefono = document.querySelector('#telefono');

// Variables
let buscar = '';
let opcion = '';
let id;
let mensajeAlerta;
let juzgados = [];
let juzgadosFiltrados = [];
let juzgado = {};

// Control de usuario
let usuario = '';
let usuario_id = '';
let logueado = false;


/**
 * Método que se ejecuta
 * cuando se carga la página
 */
document.addEventListener('DOMContentLoaded', async () => {
    //controlUsuario();
    juzgados = await obtenerJuzgados();
    juzgadosFiltrados = filtrarPorNombre('');
    mostrarJuzgados();
});

/**
 * Obtiene los juzgados
 */
async function obtenerJuzgados() {
    juzgados = await seleccionarJuzgados();
    return juzgados;
}

/**
 * Filtra los juzgados por nombre
 * @param n el nombre del juzgado
 * @return juzgados filtrados
 */
function filtrarPorNombre(n) {
    juzgadosFiltrados = juzgados.filter(items => items.nombre_juzgado.includes(n));
    return juzgadosFiltrados;
}

/**
 * Muestra los juzgados  *
 */
function mostrarJuzgados() {//18rem; style="width: 36rem;"
  listado.innerHTML = '';
    juzgadosFiltrados.map(juzgado =>
        (listado.innerHTML += `
            <div class="col">
                <div class="card" style="width: 36rem;">
                    <div class="card-body">
                        <h5 class="card-title">
                            <div>
                                <span>Nombre del juzgado: ${juzgado.nombre_juzgado}</span>
                            </div>
                            <div>
                                <span>Numero del juzgado: ${juzgado.nro_juzgado}</span>
                            </div>
                        </h5>
                        <div class="div-descripcion">
                            <div>
                                <span>Juez del tramite en el juzgado: ${juzgado.jueztram}</span>
                            </div>
                            <div>
                                <span name="spantelefono">Secretario: ${juzgado.secretario}</span>
                            </div>
                            <div>
                                <span name="spantelefono">Telefono: ${juzgado.telefono}</span>
                            </div>
                        </div>
                    </div>
                    <a class="btnEditar btn btn-primary">Editar</a>
                    <a class="btnBorrar btn btn-danger">Borrar</a>
                    <input type="hidden" class="idJuzgado" value="${juzgado.id}">
                </div>
            </div>
        `)
    );
}

/**
 * Filtro de los juzgados
 */
const botonesFiltros = document.querySelectorAll('#filtros button');
botonesFiltros.forEach(boton => {
    boton.addEventListener('click', e => {
        boton.classList.add('active');
        boton.setAttribute('aria-current', 'page');

        botonesFiltros.forEach(otroBoton => {
            if(otroBoton !== boton) {
                otroBoton.classList.remove('active');
                otroBoton.removeAttribute('aria-current');
            }
        });

        buscar = boton.innerHTML;
        if(buscar == 'Todos') {
            buscar = '';
        }
        filtrarPorNombre(buscar);
        mostrarJuzgados();
    })
})


/**
 * Ejecuta el clic del botón Nuevo
 */
btnNuevo.addEventListener('click', () => {
    // Limpiamos los inputs
    inputNroJuzgado.value = null;
    inputNombreJuzgado.value = null;
    inputJueztram.value = null;
    inputSecretario.value = null;
    inputTelefono.value = null;

    // Mostramos el formulario
    formularioModal.show();

    opcion = 'insertar';
})

/**
 * Ejecuta el evento submit del formulario
 */
formulario.addEventListener('submit', (e) => {
    e.preventDefault(); // Previene la acción por defecto

    const datos = new FormData(formulario); // Guarda los datos del formulario
    console.log(datos);
    switch (opcion) {
        case 'insertar':
            insertarJuzgados(datos);
            mensajeAlerta = '¡Datos guardados!';
            break;

        case 'actualizar':
            actualizarJuzgado(datos, id);
            mensajeAlerta = '¡Datos actualizados!';
            break;
    }

    //location.reload();

    insertarAlerta(mensajeAlerta, 'success');
    mostrarJuzgados();
})

/**
 * Define el mensaje de alerta
 * @param mensaje el mensaje a mostrar
 * @param tipo el tipo de mensaje
 */
const insertarAlerta = (mensaje, tipo) => {
    const envoltorio = document.createElement('div');
    envoltorio.innerHTML = `
        <div class="alert alert-${tipo} alert-dismissible" role="alert">
            <div>${mensaje}</div>
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Cerrar"></button>
        </div>
    `;
    alerta.append(envoltorio);
}

/**
 * Función para determinar en qué elemento se realiza un evento
 * @param elemento el elemento al que se realiza el evento
 * @param evento el evento realizado
 * @param selector el selector seleccionado
 * @param manejador el método que maneja el evento
 */
const on = (elemento, evento, selector, manejador) => {
    elemento.addEventListener(evento, (e) => {
        if(e.target.closest(selector)) {
            manejador(e);
        }
    })
}

/**
 * Función para el botón Editar
 */
on(document, 'click', '.btnEditar', e => {
    const cardFooter = e.target.parentNode; // Guardamos el elemento padre del botón
    id = cardFooter.querySelector('.idJuzgado').value; // Obtenemos el id
    juzgado = juzgados.find(item => item.id == id); // Buscamos el juzgado
    
    // Asignamos los valores a los input
    inputNroJuzgado.value = juzgado.nro_juzgado;
    inputNombreJuzgado.value = juzgado.nombre_juzgado;
    inputJueztram.value = juzgado.jueztram;
    inputSecretario.value = juzgado.secretario;
    inputTelefono.value = juzgado.telefono;

    formularioModal.show();
    opcion = 'actualizar';
})

/**
 * Funcion para el botón Borrar
 */
on(document, 'click', '.btnBorrar', e => {
    const cardFooter = e.target.parentNode;
    id = cardFooter.querySelector('.idJuzgado').value;
    juzgado = juzgados.find(item => item.id == id);

    let aceptar = confirm(`¿Realmente desea eliminar a ${juzgado.nombre_juzgado}?`);

    if ( aceptar ) {
        eliminarJuzgado(id);
        insertarAlerta(`${juzgado.nombre_juzgado} borrado!!`, 'danger');
        mostrarJuzgados();
    }
})