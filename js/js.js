

let tienda1 = [{nombre: "producto1", precio: 10},{nombre: "producto2", precio: 20},{nombre: "producto3", precio: 30},{nombre: "producto4", precio: 40},{nombre: "producto5", precio: 50}]

let valorTotal = 0

let descuentoUsado = false
const codigoDescuento = "CoderHouse"
const descuento = 0.5

const compraInfo = "el valor de su compra es de : "
let carrito = []

function pedirNumero() {
    let productoSelec

    do {
        productoSelec = parseInt(prompt("digite el numero del producto que quiere comprar: "))
        if (productoSelec < 1 || productoSelec > 5 || isNaN(productoSelec)) {
            alert("elija un producto valido")
        }
    } while (productoSelec < 1 || productoSelec > 5 || isNaN(productoSelec))

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


function comprar(){

    let condicion = true
    let multiplicar = 1 
    let compraValor = 0
    let compraNombre = ""

    do{
        multiplicar = 1
        compraNombre = ""

        alert("Productos \n1. producto1 : 10$ \n2. Producto2 : 20$ \n3. Producto3 : 30$ \n4. Producto4 : 40$\n5. Producto5 : 50$")
    
        
        const productoSelec = pedirNumero()

        multiplicar = pedirMultiplicar()

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
    if(descuentoUsado){
        alert(carrito + "\n" + valorTotal + "Descuento usado")
    } else{
        alert(carrito + "\n" + valorTotal)
    }
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