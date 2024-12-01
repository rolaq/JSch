
document.getElementById('formLogin').addEventListener('submit', function (event) {
    event.preventDefault(); 

    const nombreUsuario = document.getElementById('nombreUsuario').value.trim();
    const contrasena = document.getElementById('contrasena').value.trim();

    if (verificarUsuario(nombreUsuario, contrasena)) {
        localStorage.setItem('logeado', nombreUsuario);
        Swal.fire({
            icon: 'success',
            title: '¡Bienvenido!',
            text: `Hola, ${nombreUsuario}! Has iniciado sesion.`,
            timer: 2000,
            showConfirmButton: false
        }).then(() => {
            window.location.href = 'index.html';
        });
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Error de inicio de sesion',
            text: 'Usuario o contraseña incorrectos. Intenta nuevamente.',
        });
    }
});

function verificarUsuario(nombreUsuario, contrasena) {
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const usuario = usuarios.find(user => user.nombre === nombreUsuario && user.contrasena === contrasena);
    return usuario !== undefined;
}
