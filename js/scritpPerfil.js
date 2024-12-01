document.addEventListener('DOMContentLoaded', () => {
    const usuarioLogueado = localStorage.getItem('logeado');

    const navRegister = document.getElementById('nav-register');
    const navLogin = document.getElementById('nav-login');
    const logoutButton = document.getElementById('logoutButton');
    const navLinks = document.querySelector('.navbar-nav');

    if (usuarioLogueado) {
        // Ocultar Register y Login
        navRegister?.remove();
        navLogin?.remove();

        // Crear y añadir el enlace Perfil
        const perfil = document.createElement('li');
        perfil.className = 'nav-item';
        perfil.innerHTML = `<a class="nav-link" href="perfil.html">Perfil</a>`;
        navLinks.insertBefore(perfil, logoutButton); 

        // Mostrar botón Cerrar Sesión
        logoutButton.classList.remove('d-none');
        logoutButton.addEventListener('click', logout);
    }

    cargarHistorialDeCarritos();
});

function logout() {
    localStorage.removeItem('logeado');
    window.location.href = 'login.html'; // Redirigir al login
}

async function cargarHistorialDeCarritos() {
    const usuarioLogueado = localStorage.getItem('logeado');
    if (!usuarioLogueado) return;

    const historialCarritos = JSON.parse(localStorage.getItem(`historial_carritos_${usuarioLogueado}`)) || [];

    const listaHistorial = document.getElementById('historial-carritos');
    listaHistorial.innerHTML = ''; // Limpiar contenido previo

    if (historialCarritos.length === 0) {
        listaHistorial.innerHTML = '<p>No tienes compras anteriores.</p>';
    } else {
        historialCarritos.forEach((carrito) => {
            // Crear un contenedor para cada carrito
            const divCarrito = document.createElement('div');
            divCarrito.className = 'carrito-historial mb-4';

            // Encabezado del carrito con su ID
            const encabezadoCarrito = document.createElement('h5');
            encabezadoCarrito.innerHTML = `Carrito ID: ${carrito.idCarrito}`;
            encabezadoCarrito.className = 'mb-3';
            divCarrito.appendChild(encabezadoCarrito);

            // Crear la tabla para los productos del carrito
            const tabla = document.createElement('table');
            tabla.className = 'table table-striped table-bordered';

            // Encabezado de la tabla
            const thead = document.createElement('thead');
            thead.innerHTML = `
                <tr>
                    <th>#</th>
                    <th>Producto</th>
                    <th>Cantidad</th>
                    <th>Precio Unitario ($)</th>
                    <th>Subtotal ($)</th>
                </tr>
            `;
            tabla.appendChild(thead);

            // Cuerpo de la tabla
            const tbody = document.createElement('tbody');

            carrito.productos.forEach((producto, index) => {
                const fila = document.createElement('tr');
                fila.innerHTML = `
                    <td>${index + 1}</td>
                    <td>${producto.nombre}</td>
                    <td>${producto.cantidad}</td>
                    <td>${producto.precio.toFixed(2)}</td>
                    <td>${(producto.cantidad * producto.precio).toFixed(2)}</td>
                `;
                tbody.appendChild(fila);
            });

            tabla.appendChild(tbody);
            divCarrito.appendChild(tabla);
            listaHistorial.appendChild(divCarrito);
        });
    }
}
