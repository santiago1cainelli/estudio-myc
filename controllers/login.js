const url = './api/login.php';

// Variables del DOM
const frmLogin = document.querySelector('#form-login');

let correo = '';
let correo_id = '';
let correo_nombre = '';
let correo_apellido = '';
let logueado = false;

/**
 * Obtiene los datos del formulario
 */
frmLogin.addEventListener('submit', e => {
    e.preventDefault();
    const datos = new FormData(frmLogin);
    login(datos);
    window.location.href = 'index.html';
})

/**
 * Envía los datos y se loguea
 */
const login = (datos) => {
    fetch(url, {
        method: 'POST',
        body: datos
    })
    .then(res => res.json())
    .then((data => {
        console.log(data);
        if(data[0].correo) {
            correo_id = data[0].id;
            correo = data[0].correo;
            logueado = true;
            sessionStorage.setItem('correo', correo);
            sessionStorage.setItem('correo_id', correo_id);
        }
    }));
}