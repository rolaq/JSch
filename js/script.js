

class producto{
    constructor(nombre, precio){
        this.nombre = nombre;
        this.precio = precio;
    }
}

class carrito{
    constructor(nombre,precio,cantidad){
        this.nombre = nombre;
        this.precio = precio;
        this.cantidad = cantidad;
        
    }
}


let tienda = []
let carritoCompra = []

tienda.push(new producto ("producto1",10));
tienda.push(new producto ("producto2",20));
tienda.push(new producto ("producto3",30));
tienda.push(new producto ("producto4",40));
tienda.push(new producto ("producto5",50));



// varialbes de descuento
let descuentoUsado = false
const codigoDescuento = "CoderHouse"
const descuento = 0.5

// variables para el carrito de compra

let compraTotal = 0;

//---------------------------//

//      Funciones pedir     //

function pedirNumero() {
    let productoSelec

    do {
        productoSelec = parseInt(prompt("Digite el numero del producto a seleccionar: "))
        if (productoSelec < 1 || productoSelec > tienda.length || isNaN(productoSelec)) {
            alert("elija un producto valido")
        }
    } while (productoSelec < 1 || productoSelec > tienda.length || isNaN(productoSelec))

    return productoSelec
}

function pedirMultiplicar(){
    let multiplicar;

        do {
            multiplicar = parseInt(prompt("Cuantas unidades quieres del producto?: "));
            if (isNaN(multiplicar) || multiplicar <= 0) {
                alert("Ingrese un valor valido")
            }
        } while (isNaN(multiplicar) || multiplicar <= 0)

    return multiplicar
}


function funcionSino() {
    let seguir;
    
    while (true) {
        seguir = prompt("¿Quiere seguir comprando? si/no:");

        if (seguir == "no") {
            return false;
        } else if (seguir == "si") {
            return true;
        } else {
            alert("Responda correctamente...");
        }
    }
}

//      ---------------     //


//      Funciones mostrar       //


function mostrarTienda(){
    let mensaje = "Tienda:\n";

        for (let i = 0; i < tienda.length; i++) {
            mensaje += (i+1) +". "+ tienda[i].nombre + " : " + tienda[i].precio + "$\n";
        }
    alert(mensaje);
}

function mostrarCarrito(){

    if (carritoCompra.length === 0) {
        alert("El carrito está vacío, no hay productos para eliminar.");
        return;
    }

    let mensaje = "Tu Compra: \n";

    for (let i = 0; i < carritoCompra.length; i++) {
        mensaje += (i+1) + ". " + carritoCompra[i].nombre + " - " + carritoCompra[i].precio + "$ x " + carritoCompra[i].cantidad + " unidades\n";
    }

    mensaje += "---------------------" + compraTotal;
    
    alert(mensaje);
}


//-----------------------------//

function calcularTotal() {
    compraTotal = 0; 

    for (let i = 0; i < carritoCompra.length; i++) {
        compraTotal += carritoCompra[i].precio * carritoCompra[i].cantidad;
    }

    alert("El total de tu carrito es: $" + compraTotal);
}


function comprar(){

    let condicion = true
    let multiplicar = 1 
   
    do{
        let compraValor = 0
        multiplicar = 1 

        mostrarTienda();    // Productos: 
        //                          1. producto : 10$
        //                          2. producto : 20$
        //                          3. producto : 30$
        //                          4. producto : 40$
        //                          5. producto : 50$

        const productoSelec = pedirNumero();    // elijo el id del producto.  ej 1 -> producto1 

        multiplicar = pedirMultiplicar();   // elijo las unidades que deseo comprar. ej 2 unidades


        // un array que se va a completar info de la compra. ej carritoCompra : [
        //                                                                        { nombre: producto1 , precio: 10 , cantidad: 2 }
        //                                                                        { nombre: producto3 , precio: 30 , cantidad: 4 }
        //                                                                                                 ]   
        carritoCompra.push(new carrito(tienda[productoSelec-1].nombre,tienda[productoSelec-1].precio,multiplicar));

        compraValor += tienda[productoSelec-1].precio * multiplicar;    // se suma el precio del producto elegido * unidades. 
        compraTotal += tienda[productoSelec-1].precio * multiplicar;    // se va calculando la compra total

        alert("Su compra es de:    " + tienda[productoSelec-1].nombre + "  -  " + "$" + compraValor);  // ej: su compra es de:    producto1    $10

        alert("Su compra total acumulada es: $" + compraTotal);
        condicion = funcionSino();

    } while(condicion)
}



function funcionDescuento(){

    if (descuentoUsado){                        // condicion descuentoUsado es un bool que maneja este flujo
        return alert("el codigo ya fue usado")     
    }

    const codigo = prompt("ingrese un codigo de descuento: ")

    if (codigo === codigoDescuento){        // valido que el codigo ingresado sea el mismo que el codigoDescuento

        compraTotal = descuento * compraTotal
        alert("El código fue aplicado y el valor actual de su compra es: $" + compraTotal);
        descuentoUsado = true
    } else{
        alert("el codigo ingresado es incorrecto")
    }
}

function eliminarProducto(){

    if (carritoCompra.length === 0) {
        alert("El carrito está vacío, no hay productos para eliminar.");
        return;
    }

    mostrarCarrito();

    const productoSelec = pedirNumero();

    carritoCompra.splice(productoSelec - 1, 1);
    alert("Producto eliminado\n");

    calcularTotal();

}

let condicion = true

while(condicion){

    const opc = parseInt(prompt("1. Comprar \n2. Utilizar cupon de descuento\n3. Ver carrito final\n4.Eliminar producto \n5. Terminar compra"))

    switch(opc){

        case 1: comprar();
            break;

        case 2: funcionDescuento();
        
            break;
        
        case 3: mostrarCarrito();
            break;
        
        case 4: eliminarProducto();
            break;

        case 5: condicion = false;
            break;
    }
}

alert("Gracias por comprar ;D")