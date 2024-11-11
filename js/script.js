
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
        this.cantidad = 0;
    }

    sumarUnidad() {
        this.cantidad++;
    }
}

let tienda = [];
let carritoCompra = [];

// productos para la tienda
tienda.push(new Producto(1, "producto1", 10));
tienda.push(new Producto(2, "producto2", 20));
tienda.push(new Producto(3, "producto3", 30));
tienda.push(new Producto(4, "producto4", 40));
tienda.push(new Producto(5, "producto5", 50));

// secciones de la tabla
const listaProductos = document.getElementById("lista-productos");
const listaCompra = document.getElementById("lista-carrito");

//muestro los productos
tienda.forEach((producto) => {
    listaProductos.innerHTML += `
        <div class="producto">
            <p>${producto.nombre} = ${producto.precio}$</p>   
            <button class="boton-producto" id="${producto.id}">Seleccionar</button>
        </div>`;
});

// evento para agregar productos 
document.getElementById("lista-productos").addEventListener("click", (event) => {
    if (event.target.classList.contains("boton-producto")) {
        const botonId = parseInt(event.target.id);
        const productoSeleccionado = tienda.find(p => p.id === botonId);

        const productoEnCarrito = carritoCompra.find(item => item.producto.id === productoSeleccionado.id);

        if (productoEnCarrito) {
            // si el producto ya esta en el carrito, incrementar la cantidad
            productoEnCarrito.sumarUnidad();
        } else {
            // si no esta, añadirlo al carrito
            const nuevoItemCarrito = new CarritoItem(productoSeleccionado);
            nuevoItemCarrito.sumarUnidad();
            carritoCompra.push(nuevoItemCarrito);
        }

        // actualizar el carrito 
        guardarCarritoEnLocalStorage();   
        mostrarCarrito();
    }
});

// funcion para mostrar el carrito en la pagina
function mostrarCarrito() {
    listaCompra.innerHTML = ""; 
    let total = 0;

    carritoCompra.forEach(item => {
        const subtotal = item.producto.precio * item.cantidad;
        total += subtotal;

        listaCompra.innerHTML += `
            <div class="producto mb-2">
                <div class="col">${item.producto.nombre} = ${item.producto.precio}$</div>
                <div class="col">Cantidad: ${item.cantidad}</div>
                <div class="col">Subtotal: $${subtotal}</div>
                <button class="boton-eliminar" data-id="${item.producto.id}">Eliminar</button>
            </div>`;
    });

    document.getElementById("total").textContent = `Total: $${total}`;
}

// evento para eliminar productos del carrito
listaCompra.addEventListener("click", (event) => {
    if (event.target.classList.contains("boton-eliminar")) {
        const idProducto = parseInt(event.target.getAttribute("data-id"));
        carritoCompra = carritoCompra.filter(item => item.producto.id !== idProducto);

        guardarCarritoEnLocalStorage();
        mostrarCarrito();
    }
});


// cargar carrito desde localStorage
function cargarCarritoDesdeLocalStorage() {
    const carritoGuardado = localStorage.getItem("carritoCompra");
    if (carritoGuardado) {
        const items = JSON.parse(carritoGuardado);
        items.forEach(item => {
            const producto = tienda.find(p => p.id === item.producto.id);
            const nuevoItemCarrito = new CarritoItem(producto);
            nuevoItemCarrito.cantidad = item.cantidad;
            carritoCompra.push(nuevoItemCarrito);
        });
       
        mostrarCarrito();
    }
}


// guardar carrito en localStorage
function guardarCarritoEnLocalStorage() {
    localStorage.setItem("carritoCompra", JSON.stringify(carritoCompra));
}

cargarCarritoDesdeLocalStorage();




