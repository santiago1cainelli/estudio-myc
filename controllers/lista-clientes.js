import { actualizarCliente, eliminarCliente, insertarClientes, seleccionarClientes } from "../models/clientes.js";
// Objetos del DOM
const listado = document.querySelector('#listado-clientes');
const alerta = document.querySelector('#alerta');

// Formulario
const formulario = document.querySelector('#formulario');
const formularioModal = new bootstrap.Modal(document.querySelector('#modal-cliente'));
const btnNuevo = document.querySelector('#btnNuevo');

// Inputs
const inputNombre = document.querySelector('#nombre');
const inputApellido = document.querySelector('#apellido_rsocial');
const inputDni = document.querySelector('#tipo_dni');
const inputCorreo = document.querySelector('#email');
const inputTelefono = document.querySelector('#telefono');
const inputTipoPersona = document.querySelector('#tipo_persona');
const inputLocalidad = document.querySelector('#localidad');
const inputDomicilio = document.querySelector('#domicilio');
const inputCodigoPostal = document.querySelector('#cpostal');
const inputFNacimiento = document.querySelector('#fnacimiento');
const inputFAlta = document.querySelector('#falta');
const inputFBaja = document.querySelector('#fbaja');

// Variables
let buscar = '';
let opcion = '';
let id;
let mensajeAlerta;
let clientes = [];
let clientesFiltrados = [];
let cliente = {};

/**
 * Método que se ejecuta
 * cuando se carga la página
 */
document.addEventListener('DOMContentLoaded', async () => {
    //controlUsuario();
    clientes = await obtenerClientes();
    clientesFiltrados = filtrarPorNombre('');
    mostrarClientes();
});

/**
 * Obtiene los clientes
 */
async function obtenerClientes() {
    clientes = await seleccionarClientes();
    return clientes;
}

/**
 * Filtra los clientes por nombre
 * @param n el nombre del cliente
 * @return clientes filtrados
 */
function filtrarPorNombre(n) {
    clientesFiltrados = clientes.filter(items => items.nombre.includes(n));
    return clientesFiltrados;
}

/**
 * Muestra los clientes  *
 */
function mostrarClientes() {//18rem; style="width: 36rem;"
  listado.innerHTML = '';
    clientesFiltrados.map(cliente =>
        (listado.innerHTML += `
            <div class="col">
                <div class="card" style="width: 36rem;">
                    <div class="card-body">
                        <h5 class="card-title">
                            <div>
                                <span name="spannombre">${cliente.nombre} ${cliente.apellido_rsocial}</span>
                            </div>
                            <div>
                                <span name="spandni">Tipo DNI: ${cliente.tipo_dni}</span>
                            </div>
                            <div>
                                <span name="spantelefono">Telefono: ${cliente.telefono}</span>
                            </div>
                        </h5>
                        
                        <div class="div-descripcion">
                            <div>
                                <span>Tipo de persona: ${cliente.tipo_persona}</span>
                            </div>
                            <div>
                                <span>Dominilio: ${cliente.domicilio}</span>
                            </div>
                            <div>
                                <span>Localidad: ${cliente.localidad}</span>
                            </div>
                            <div>
                                <span>Código postal: ${cliente.cpostal}</span>
                            </div>
                            <div>
                                <span>Fecha de nacimiento: ${cliente.fnacimiento}</span>
                            </div>
                            <div>
                                <span>Fecha de alta: ${cliente.falta}</span>
                            </div>
                            <div>
                                <span>Fecha de baja: ${cliente.fbaja}</span>
                            </div>
                            <div>
                            <span name="spanemail">Correo electronico: ${cliente.email}</span>
                        </div>
                    </div>
                    <a class="btnEditar btn btn-primary">Editar</a>
                    <a class="btnBorrar btn btn-danger">Borrar</a>
                    <input type="hidden" class="idCliente" value="${cliente.id}">
                </div>
            </div>
        `)
    );
}

/**
 * Filtro de los clientes
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
        mostrarClientes();
    })
})


/**
 * Ejecuta el clic del botón Nuevo
 */
btnNuevo.addEventListener('click', () => {
    // Limpiamos los inputs
    inputNombre.value = null;
    inputApellido.value = null;
    inputDni.value = null;
    inputCorreo.value = null;
    inputTelefono.value = null;
    inputTipoPersona.value = null;
    inputLocalidad.value = null;
    inputDomicilio.value = null;
    inputCodigoPostal.value = null;
    inputFNacimiento.value = null;
    inputFAlta.value = null;
    inputFBaja.value = null;

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
            insertarClientes(datos);
            mensajeAlerta = '¡Datos guardados!';
            break;

        case 'actualizar':
            actualizarCliente(datos, id);
            mensajeAlerta = '¡Datos actualizados!';
            break;
    }

    //location.reload();

    insertarAlerta(mensajeAlerta, 'success');
    mostrarClientes();
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
    id = cardFooter.querySelector('.idCliente').value; // Obtenemos el id
    cliente = clientes.find(item => item.id == id); // Buscamos el cliente
    
    // Asignamos los valores a los input
    inputNombre.value = cliente.nombre;
    inputApellido.value = cliente.apellido_rsocial;
    inputDni.value = cliente.tipo_dni;
    inputCorreo.value = cliente.email;
    inputTelefono.value = cliente.telefono;
    inputTipoPersona.value = cliente.tipo_persona;
    inputLocalidad.value = cliente.localidad;
    inputDomicilio.value = cliente.domicilio;
    inputCodigoPostal.value = cliente.cpostal;
    inputFNacimiento.value = cliente.fnacimiento;
    inputFAlta.value = cliente.falta;
    inputFBaja.value = cliente.fbaja;

    formularioModal.show();
    opcion = 'actualizar';
})

/**
 * Funcion para el botón Borrar
 */
on(document, 'click', '.btnBorrar', e => {
    const cardFooter = e.target.parentNode;
    id = cardFooter.querySelector('.idCliente').value;
    cliente = clientes.find(item => item.id == id);

    let aceptar = confirm(`¿Realmente desea eliminar a ${cliente.nombre}?`);

    if ( aceptar ) {
        eliminarCliente(id);
        insertarAlerta(`${cliente.nombre} borrado!!`, 'danger');
        mostrarClientes();
    }
})