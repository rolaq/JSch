

let productos = {producto1:10,producto2:20,producto3:30,producto4:40,producto5:50}

let tienda = [productos.producto1,productos.producto2,productos.producto3,productos.producto4,productos.producto5]

let tienda1 = [{nombre: "producto1", precio: 10},{nombre: "producto2", precio: 20},{nombre: "producto3", precio: 30},{nombre: "producto4", precio: 40},{nombre: "producto5", precio: 50}]

let valorTotal = 0

let descuentoUsado = false
const codigoDescuento = "CoderHouse"
const descuento = 0.5

const compraInfo = "el valor de su compra es de : "
let carrito = []


function pedirNumero(){
    let correcto = false

    while(!correcto){
        const productoSelec = parseInt(prompt("Digite el numero del producto que quiere comprar: "))
        if(productoSelec > 0 && productoSelec <= 5 && !isNaN(productoSelec)){
            correcto = true
        } else{
            alert("Digite una opcion correcta entre el 1 y 5")
        }
    }
    
    return productoSelec
}


function comprar(){

    let condicion = true
    let multiplicar = 1 
    let compraValor = 0
    let compraNombre = ""

    do{
        multiplicar = 1
        compraNombre = ""

        alert("Productos \n1. producto1 : 10$ \n2. Producto2 : 20$ \n3. Producto3 : 30$ \n4. Producto4 : 40$\n5. Producto5 : 50$")
    
        
        const productoSelec = parseInt(prompt("Digite el numero del producto que quiere comprar: "))

        multiplicar = parseInt(prompt("Cuantas unidades quieres del producto: "))

        compraValor = tienda1[productoSelec - 1 ].precio * multiplicar
        valorTotal += compraValor 

        compraNombre += tienda1[productoSelec - 1].nombre
        carrito += compraNombre + " * " + multiplicar + "\n"

        alert("Su compra hecha es de: " + compraNombre + "     " + compraValor)
        

        condicion = funcionSino()
  
        alert(compraInfo + valorTotal)

    } while(condicion)
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

function funcionDescuento(){

    if (descuentoUsado){
        return alert("el codigo ya fue usado")
    }
    const codigo = prompt("ingrese un codigo de descuento: ")

    if (codigo === codigoDescuento){

        valorTotal = descuento * valorTotal
        alert("el codigo fue aplicado y " + compraInfo + valorTotal)
        descuentoUsado = true
    } else{
        alert("el codigo ingresado es incorrecto")
    }
}


function mostrarCarrito(){
    alert(carrito + "\n" + valorTotal)
}

let condicion = true

while(condicion){

    const opc = parseInt(prompt("1. Comprar \n2. Utilizar cupon de descuento\n3. Ver carrito final \n4. Terminar compra"))

    switch(opc){

        case 1: comprar()
            break;

        case 2: funcionDescuento()
        
            break;
        
        case 3: mostrarCarrito()
            break;
        
        case 4: condicion = false;
            break;
    }
}

alert("Gracias por comprar ;D")