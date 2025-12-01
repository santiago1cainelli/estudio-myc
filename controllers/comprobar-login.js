//const url = './api/login.php';

const detectarUsuario = () => {
    if(!sessionStorage.getItem('correo')) {
        confirm(`Inicia sesion antes de entrar en algun apartado de la pagina.`);
        window.location.href = 'index.html';
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    detectarUsuario();
})

btnLogout.addEventListener('click', e => {
    detectarUsuario();
})