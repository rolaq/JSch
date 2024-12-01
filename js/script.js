class Producto {
    constructor(id, nombre, precio) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
    }
}

class CarritoItem {
    constructor(producto) {
        this.producto = producto;
        this.cantidad = 1;
    }

    sumarUnidad() {
        this.cantidad++;
    }
}
// Variables globales
let carritoCompra = [];
let usuarioLogueado = localStorage.getItem('logeado');
const listaCompra = document.getElementById("lista-carrito");

let idCarritoActual = parseInt(localStorage.getItem('ultimo_id_carrito')) || 1;

// Funcion para incrementar y guardar el ID del carrito
function obtenerNuevoIdCarrito() {
    const nuevoId = idCarritoActual;
    idCarritoActual++;
    localStorage.setItem('ultimo_id_carrito', idCarritoActual); 
    return nuevoId;
}

// Funcion asincronica para cargar el carrito desde localStorage
async function cargarCarritoDesdeLocalStorage() {
    if (!usuarioLogueado) return;

    const datosGuardados = localStorage.getItem(`carrito_${usuarioLogueado}`);
    if (datosGuardados) {
        const items = JSON.parse(datosGuardados);
        carritoCompra = await Promise.all(
            items.map(async (item) => {
                const producto = new Producto(item.producto.id, item.producto.nombre, item.producto.precio);
                const carritoItem = new CarritoItem(producto);
                carritoItem.cantidad = item.cantidad;
                return carritoItem;
            })
        );
    }
}

// Funcion asincrónica para guardar el carrito en localStorage
async function guardarCarritoEnLocalStorage() {
    if (!usuarioLogueado) return;

    return new Promise((resolve) => {
        localStorage.setItem(`carrito_${usuarioLogueado}`, JSON.stringify(carritoCompra));
        resolve();
    });
}

// Funcion para cargar productos desde un archivo JSON
async function cargarProductos() {
    const listaProductos = document.getElementById('lista-productos');
    try {
        const response = await fetch('./productos.json');
        const productos = await response.json();

        productos.forEach((producto) => {
            const div = document.createElement('div');
            div.className = 'producto';
            div.innerHTML += `
            <div class="producto">
                <p>${producto.nombre} = ${producto.precio}$</p>   
                <button class="boton-producto" id="${producto.id}">Seleccionar</button>
            </div>`;
            listaProductos.appendChild(div);
        });

    } catch (error) {
        console.error('Error al cargar productos:', error);
    }
}

document.getElementById("lista-productos").addEventListener("click", async (event) => {
    if (event.target.classList.contains("boton-producto")) {
        const botonId = parseInt(event.target.id);

        // Cargar productos desde el archivo JSON
        const response = await fetch('./productos.json');
        const productos = await response.json();
        const productoSeleccionado = productos.find(p => p.id === botonId);

        const productoEnCarrito = carritoCompra.find(item => item.producto.id === productoSeleccionado.id);

        if (productoEnCarrito) {
            productoEnCarrito.sumarUnidad(); // Incrementar cantidad si ya existe
        } else {
            const nuevoItemCarrito = new CarritoItem(productoSeleccionado);
            carritoCompra.push(nuevoItemCarrito); // Añadir al carrito si no existe
        }

        // Actualizar el carrito
        await guardarCarritoEnLocalStorage();
        actualizarVistaCarrito();
        mostrarNotificacion('Producto agregado al carrito');
    }
});


function mostrarNotificacion(mensaje) {
    Toastify({
        text: mensaje,           
        duration: 3000,          
        gravity: "top",          
        position: "right",       
   
        stopOnFocus: true        
    }).showToast();  
}


// Actualizar vista del carrito
function actualizarVistaCarrito() {
    const listaCarrito = document.getElementById('lista-carrito');
    listaCarrito.innerHTML = '';

    carritoCompra.forEach((item) => {
        const div = document.createElement('div');
        div.className = 'item-carrito row align-items-center mb-2'; 
        div.innerHTML = `
            <p class="col-8 m-0">${item.producto.nombre} - ${item.cantidad} x ${item.producto.precio} $</p>
            <button class="boton-eliminar col-4 btn btn-danger btn-sm" data-id="${item.producto.id}">Eliminar</button>
        `;
        listaCarrito.appendChild(div);
    });

    // Agregar evento a los botones de eliminar
    agregarEventoEliminar();
    actualizarTotal();
}

// Eliminar producto del carrito
function eliminarProductoDelCarrito(idProducto) {
    carritoCompra = carritoCompra.filter((item) => item.producto.id != idProducto);
    guardarCarritoEnLocalStorage();
    actualizarVistaCarrito();
}


// Agregar eventos a los botones de eliminar
function agregarEventoEliminar() {
    const botonesEliminar = document.querySelectorAll('.boton-eliminar');
    botonesEliminar.forEach((boton) => {
        boton.addEventListener('click', (event) => {
            const idProducto = event.target.dataset.id;
            eliminarProductoDelCarrito(idProducto);
            mostrarNotificacion('Producto eliminado del carrito');
        });
    });
}

// Mostrar total del carrito
function actualizarTotal() {
    let total = 0;
    carritoCompra.forEach(item => {
        total += item.producto.precio * item.cantidad;
    });
    document.getElementById('total').textContent = `Total: $${total}`;
}

// Función para cerrar sesión
function logout() {
    localStorage.removeItem('logeado'); // Borra el nombre del usuario logueado
    location.reload(); // Recarga pagina
}


async function guardarCarritoEnHistorial() {
    if (!usuarioLogueado) return;

    // el historial de carritos actual del usuario
    const historialCarritos = JSON.parse(localStorage.getItem(`historial_carritos_${usuarioLogueado}`)) || [];

    // se crea un objeto carrito con los datos actuales del carrito
    const carritoHistorial = {
        idCarrito: obtenerNuevoIdCarrito(), 
        productos: carritoCompra.map(item => ({
            id: item.producto.id,
            nombre: item.producto.nombre,
            cantidad: item.cantidad,
            precio: item.producto.precio
        })),
    };

    // se añade al carrito historail 
    historialCarritos.push(carritoHistorial);

    localStorage.setItem(`historial_carritos_${usuarioLogueado}`, JSON.stringify(historialCarritos));
}

// Funcion que se ejecuta cuando el usuario hace la compra
async function realizarCompra() {
    await guardarCarritoEnHistorial();  // Guardamos el carrito en el historial
    carritoCompra = []; // Vaciamos el carrito actual
    await guardarCarritoEnLocalStorage(); 

    mostrarNotificacion('Compra realizada con éxito');
    actualizarVistaCarrito();
}

// Evento del botón de "Comprar"
document.getElementById('btn-enviar')?.addEventListener('click', () => {
    realizarCompra(); // Llamamos a la función cuando se hace clic en "Comprar"
});


// Carga de pagina
document.addEventListener('DOMContentLoaded', async () => {
    const usuarioLogueado = localStorage.getItem('logeado');
    const navRegister = document.getElementById('nav-register');
    const navLogin = document.getElementById('nav-login');
    const logoutButton = document.getElementById('logoutButton');
    const navLinks = document.querySelector('.navbar-nav');
    const comprar = document.getElementById('btn-enviar');

    if (usuarioLogueado) {
        navRegister?.remove();
        navLogin?.remove();

        const profileLink = document.createElement('li');
        profileLink.className = 'nav-item';
        profileLink.innerHTML = `<a class="nav-link" href="perfil.html">Perfil</a>`;
        navLinks.insertBefore(profileLink, logoutButton);

        logoutButton.classList.remove('d-none');
        logoutButton.addEventListener('click', logout);
    } else {
        comprar?.remove();
    }

    // Cargar datos iniciales
    await cargarCarritoDesdeLocalStorage();
    await cargarProductos();
    actualizarVistaCarrito();
});