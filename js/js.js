

let productos = {producto1:10,producto2:20,producto3:30,producto4:40,producto5:50}

let tienda = [productos.producto1,productos.producto2,productos.producto3,productos.producto4,productos.producto5]


let valorTotal = 0

let descuentoUsado = false
const codigoDescuento = "CoderHouse"
const descuento = 0.5

const compraInfo = "el valor de su compra es de : "

function comprar(){

    let valor = 0
    let condicion = true
    let multiplicar = 1 
    let compra = 0

    do{
        multiplicar = 1
        
        alert("Productos \n1. producto1 : 10$ \n2. Producto2 : 20$ \n3. Producto3 : 30$ \n4. Producto4 : 40$\n5. Producto5 : 50$")
    
        const productoSelec = parseInt(prompt("Digite el numero del producto que quiere comprar: "))

        multiplicar = parseInt(prompt("Cuantas unidades quieres del producto: "))

        compra = tienda[productoSelec - 1 ] * multiplicar
        valor += compra

        alert("Su compra hecha es de: " + compra)
        

        condicion = funcionSino()
  
        alert(compraInfo + valor)

    } while(condicion)
    
    return valor
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

function funcionDescuento( valor, descuentoUsado ){

    const codigo = prompt("ingrese un codigo de descuento: ")

    if (codigo === codigoDescuento){

        valor = descuento * valor
        alert("el codigo fue aplicado y " + compraInfo + valor)

    } else{
        alert("el codigo ingresado es incorrecto")
    }
    

    return valor
}

let condicion = true

while(condicion){

    const opc = parseInt(prompt("1. Comprar \n2. Utilizar cupon de descuento\n3. Ver carrito final \n4. Terminar compra"))

    switch(opc){

        case 1: valorTotal += comprar()
            break;

        case 2: valorTotal = funcionDescuento(valorTotal)
    
            break;
        
        case 3: alert(compraInfo + valorTotal)
            break;
        
        case 4: condicion = false;
            break;
    }
}

alert("Gracias por comprar ;D")