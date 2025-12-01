//const url = './api/login.php';

// Variables del DOM
const divLogin = document.querySelector('#div-login');
const divLogout = document.querySelector('#div-logout');
const divLogoutBoton = document.querySelector('#div-logoutboton');
const textoLogueado = document.querySelector('#texto-logueado');
const btnLogout = document.querySelector('#btn-logout');

let correo = '';
let correo_id = '';
let logueado = false;

/**
 * Verifica si un correo está logueado
 */
const verificar = () => {
    if(sessionStorage.getItem('correo')) {
        correo = sessionStorage.getItem('correo');
        textoLogueado.innerHTML = `Bienvenido ${correo}`;
        logueado = true;
    }
    if (logueado){
        divLogin.classList.remove('d-block');
        divLogin.classList.add('d-none');
        divLogout.classList.remove('d-none');
        divLogout.classList.add('d-block');
        divLogoutBoton.classList.remove('d-none');
        divLogoutBoton.classList.add('d-block');
    } else {
        divLogin.classList.remove('d-none');
        divLogin.classList.add('d-block');
        divLogout.classList.remove('d-block');
        divLogout.classList.add('d-none');
        divLogoutBoton.classList.remove('d-block');
        divLogoutBoton.classList.add('d-none');
    }
}

/**
 * Cierra la sesión
 */
const logout = () => {
    logueado = false;
    textoLogueado.innerHTML = '';
    sessionStorage.removeItem('correo');
    sessionStorage.removeItem('correo_id');
    verificar();
}

/**
 * Ejecuta el click del botón Logout
 */
btnLogout.addEventListener('click', e => {
    logout();
})

document.addEventListener('DOMContentLoaded', async () => {
    verificar();
})