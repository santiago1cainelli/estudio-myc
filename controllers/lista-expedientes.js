import { actualizarExpediente, eliminarExpediente, insertarExpedientes, seleccionarExpedientes } from "../models/expedientes.js";
import { seleccionarClientes } from "../models/clientes.js";
import { seleccionarJuzgados } from "../models/juzgados.js";
import { actualizarClienteExpediente, eliminarClienteExpediente, insertarClienteExpedientes, seleccionarClienteExpedientes } from "../models/cliente-expediente.js";
// Objetos del DOM
const listado = document.querySelector('#listado-expedientes');
const alerta = document.querySelector('#alerta');

// Formulario
const formulario = document.querySelector('#formulario');
const formulario_cliente = document.querySelector('#formulario_cliente');
const formularioModal = new bootstrap.Modal(document.querySelector('#modal-expediente'));
const btnNuevo = document.querySelector('#btnNuevo');

// Inputs
const inputTipoExpediente = document.querySelector('#tipo_expediente');
const inputNroExpediente = document.querySelector('#nro_expediente');
const inputCaratula = document.querySelector('#caratula');
const inputTipoJuicio = document.querySelector('#tipo_juicio');
const inputAcargode = document.querySelector('#acargode');
const inputEstado = document.querySelector('#estado');
const inputFechaInicio = document.querySelector('#fecha_inicio');
const inputFechaFin = document.querySelector('#fecha_fin');
const inputFechaBaja = document.querySelector('#fecha_baja');

const selectOperacion = document.getElementById('idcliente');
const selectJuzgado = document.getElementById('juzgado');
const inputJuzgado = document.querySelector('#juzgado');
const inputIdCliente = document.querySelector('#idcliente');
const inputDemandante = document.querySelector('#demandante');
const inputIdExpediente = document.querySelector('#idexpediente');

// Variables
let buscar = '';
let opcion = '';
let id;
let mensajeAlerta;
let expedientes = [];
let expedientesFiltrados = [];
let expediente = {};

let juzgados = [];
let clientesExpedientes = [];
let clientes = [];

/**
 * Método que se ejecuta
 * cuando se carga la página
 */
document.addEventListener('DOMContentLoaded', async () => {
    expedientes = await obtenerExpedientes();
    expedientesFiltrados = filtrarPorNombre('');
    juzgados = await obtenerJuzgados();
    clientesExpedientes = await obtenerClientesExpedientes();
    clientes = await obtenerClientes();
    mostrarExpedientes();
});

/**
 * Obtiene los expedientes
 */
async function obtenerExpedientes() {
    expedientes = await seleccionarExpedientes();
    return expedientes;
}

/**
 * Filtra los expedientes por nombre
 * @param n el nombre del expediente
 * @return expedientes filtrados
 */
function filtrarPorNombre(n) {
    expedientesFiltrados = expedientes.filter(items => items.nro_expediente.includes(n));
    return expedientesFiltrados;
}

async function obtenerJuzgados() {
    juzgados = await seleccionarJuzgados();
    return juzgados;
}

async function obtenerClientesExpedientes() {
    clientesExpedientes = await seleccionarClienteExpedientes();
    return clientesExpedientes;
}

async function obtenerClientes() {
    clientes = await seleccionarClientes();
    return clientes;
}

function filtrarJuzgadoPorId(n) {
    let juzgadoFiltrado = juzgados.find(items => items.id == n);
    return juzgadoFiltrado;
}

function filtrarClienteExpedientePorIdExpediente(n) {
    let clienteExpedienteFiltrado = clientesExpedientes.find(items => items.idexpediente == n);
    return clienteExpedienteFiltrado;
}

function filtrarClientesPorId(n) {
    let clienteFiltrado = clientes.find(items => items.id == n);
    return clienteFiltrado;
}

function mostrarExpedientes() {
    listado.innerHTML = '';
    expedientesFiltrados.map(expediente =>{
        let juzgadoFiltrado = filtrarJuzgadoPorId(expediente.juzgado);
        let clienteExpedienteFiltrado = filtrarClienteExpedientePorIdExpediente(expediente.id);
        let clienteFiltrado = filtrarClientesPorId(clienteExpedienteFiltrado.idcliente);
        listado.innerHTML += `
            <div class="col mb-3">
                <div class="card" style="width: 36rem;">
                    <div class="card-body">
                        <h5 class="card-title">
                            <div>
                                <span>Expediente de ${clienteFiltrado.nombre} ${clienteFiltrado.apellido_rsocial}</span>
                            </div>
                            <div>
                                <span>Número de expediente: ${expediente.nro_expediente}</span>
                            </div>
                            <div>
                                <span>Tipo de expediente: ${expediente.tipo_expediente}</span>
                            </div>
                        </h5>
                        
                        <div class="div-descripcion">
                            <div>
                                <span>Caratula: ${expediente.caratula}</span>
                            </div>
                            <div>
                                <span>Juzgado: ${juzgadoFiltrado.nombre_juzgado}</span>
                            </div>
                            <div>
                                <span>Tipo de juicio: ${expediente.tipo_juicio}</span>
                            </div>
                            <div>
                                <span>A cargo de ${expediente.acargode}</span>
                            </div>
                            <div>
                                <span>Estado: ${expediente.estado}</span>
                            </div>
                            <div>
                                <span>Fecha de inicio: ${expediente.fecha_inicio}</span>
                            </div>
                            <div>
                                <span>Fecha de fin: ${expediente.fecha_fin}</span>
                            </div>
                            <div>
                                <span>Fecha de baja: ${expediente.fecha_baja}</span>
                            </div>
                    </div>
                    <a class="btnEditar btn btn-primary">Editar</a>
                    <a class="btnBorrar btn btn-danger">Borrar</a>
                    <input type="hidden" class="idee" value="${expediente.id}">
                </div>
            </div>
        `}
    );
}

/**
 * Filtro de los expedientes
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
        mostrarExpedientes();
    })
})

async function cargarDatosDelFormularioClientes(e) {
    if (!selectOperacion) return;
    selectOperacion.innerHTML = '<option value="">Cargando clientes...</option>';

    let clienteExpedienteFiltrado = filtrarClienteExpedientePorIdExpediente(e);

    try {
        const clientes_opcion = await seleccionarClientes();
        selectOperacion.innerHTML = '<option value="">Seleccione un cliente...</option>';
        if (clientes_opcion && clientes_opcion.length > 0) {
            clientes_opcion.forEach(a => {
                if (e && a.id == clienteExpedienteFiltrado.idcliente){
                    selectOperacion.innerHTML += `<option value="${a.id}" selected>ID ${a.id}: ${a.nombre} ${a.apellido_rsocial}</option>`;
                } else {
                    selectOperacion.innerHTML += `<option value="${a.id}">ID ${a.id}: ${a.nombre} ${a.apellido_rsocial}</option>`;
                }
            });
        }
    } catch (error) {
        alert(`Error al cargar datos del formulario: ${error.message}`);
    }
}

async function cargarDatosDelFormularioJuzgados(e) {
    if (!selectJuzgado) return;
    selectJuzgado.innerHTML = '<option value="">Cargando juzgados...</option>';

    try {
        const juzgados_opcion = await seleccionarJuzgados();
        selectJuzgado.innerHTML = '<option value="">Seleccione un juzgado...</option>';
        if (juzgados_opcion && juzgados_opcion.length > 0) {
            juzgados_opcion.forEach(j => {
                if (e && j.id == e){
                    selectJuzgado.innerHTML += `<option value="${j.id}" selected>ID ${j.id}: ${j.nombre_juzgado}</option>`;
                } else {
                    selectJuzgado.innerHTML += `<option value="${j.id}">ID ${j.id}: ${j.nombre_juzgado}</option>`;
                }
            });
        }
    } catch (error) {
        alert(`Error al cargar datos del formulario: ${error.message}`);
    }
}

/**
 * Ejecuta el clic del botón Nuevo
 */
btnNuevo.addEventListener('click', () => {
    // Limpiamos los inputs
    inputTipoExpediente.value = null;
    inputNroExpediente.value = null;
    inputCaratula.value = null;
    inputTipoJuicio.value = null;
    inputAcargode.value = null;
    inputEstado.value = null;
    inputFechaInicio.value = null;
    inputFechaFin.value = null;
    inputFechaBaja.value = null;
    cargarDatosDelFormularioClientes();
    cargarDatosDelFormularioJuzgados();
    // Mostramos el formulario
    formularioModal.show();

    opcion = 'insertar';
})

/**
 * Ejecuta el evento submit del formulario
 */
formulario.addEventListener('submit', async (e) => {
    e.preventDefault(); // Previene la acción por defecto

    const datos = new FormData(formulario); // Guarda los datos del formulario
    const datos_cliente = new FormData(formulario_cliente); // Guarda los datos del formulario_cliente
    switch (opcion) {
        case 'insertar':
            const resultado = await insertarExpedientes(datos); // Esperamos al insertar del expendiente para captura su id
            datos_cliente.set('idexpediente', resultado.id); // Almacenamos el id en el formulario para que pueda insertar el cliente_expediente
            insertarClienteExpedientes(datos_cliente);
            mensajeAlerta = '¡Datos guardados!';
            break;
        case 'actualizar':
            actualizarExpediente(datos, id);
            actualizarClienteExpediente(datos_cliente, id);
            mensajeAlerta = '¡Datos actualizados!';
            break;
    }

    location.reload();

    insertarAlerta(mensajeAlerta, 'success');
    mostrarExpedientes();
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
    id = cardFooter.querySelector('.idee').value; // Obtenemos el id
    expediente = expedientes.find(item => item.id == id); // Buscamos el expediente
    
    // Asignamos los valores a los input
    inputTipoExpediente.value = expediente.tipo_expediente;
    inputNroExpediente.value = expediente.nro_expediente;
    inputCaratula.value = expediente.caratula;
    inputTipoJuicio.value = expediente.tipo_juicio;
    inputAcargode.value = expediente.acargode;
    inputEstado.value = expediente.estado;
    inputFechaInicio.value = expediente.fecha_inicio;
    inputFechaFin.value = expediente.fecha_fin;
    inputFechaBaja.value = expediente.fecha_baja;
    cargarDatosDelFormularioClientes(expediente.id);
    cargarDatosDelFormularioJuzgados(expediente.juzgado);
    let clienteExpedienteFiltrado = filtrarClienteExpedientePorIdExpediente(expediente.id);
    inputDemandante.value = clienteExpedienteFiltrado.demandante;
    inputIdExpediente.value = expediente.id;

    formularioModal.show();
    opcion = 'actualizar';
})

/**
 * Funcion para el botón Borrar
 */
on(document, 'click', '.btnBorrar', e => {
    const cardFooter = e.target.parentNode;
    id = cardFooter.querySelector('.idee').value;
    expediente = expedientes.find(item => item.id == id);

    let aceptar = confirm(`¿Realmente desea eliminar el expediente numero ${expediente.nro_expediente}?`);

    if ( aceptar ) {
        eliminarExpediente(id);
        eliminarClienteExpediente(id);
        insertarAlerta(`Expediente numero ${expediente.nro_expediente} borrado!!`, 'danger');
        mostrarExpedientes();
    }
})