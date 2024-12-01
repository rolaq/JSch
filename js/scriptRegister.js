document.getElementById('formRegistro').addEventListener('submit', async (event) => {
    event.preventDefault(); 

    const nombreUsuario = document.getElementById('nombreUsuario').value.trim();
    const contrasena = document.getElementById('contrasena').value.trim();

    if (verificarUsuarioExistente(nombreUsuario)) {
        Swal.fire({
            icon: 'error',
            title: 'Usuario ya registrado',
            text: 'Este nombre de usuario ya está registrado.',
        });
        return;
    }

    agregarUsuario(nombreUsuario, contrasena);

    Swal.fire({
        icon: 'success',
        title: 'Registro exitoso',
        text: 'Usuario registrado correctamente.',
    }).then(() => {
        
        window.location.href = 'login.html'
    });
});

let usuarios = [];

function agregarUsuario(nombre, contrasena) {
    const nuevoUsuario = {
        id: usuarios.length ? usuarios[usuarios.length - 1].id + 1 : 1,
        nombre,
        contrasena
    };
    usuarios.push(nuevoUsuario);
    guardarUsuariosEnLocalStorage();  
}

function verificarUsuarioExistente(nombre) {
    return usuarios.some(usuario => usuario.nombre === nombre);
}

function guardarUsuariosEnLocalStorage() {
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
}


function cargarUsuariosDesdeLocalStorage() {
    const usuariosGuardados = JSON.parse(localStorage.getItem('usuarios'));
    if (usuariosGuardados) {
        usuarios = usuariosGuardados; 
    }
}

cargarUsuariosDesdeLocalStorage();
