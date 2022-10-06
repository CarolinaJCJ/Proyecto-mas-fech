const contenedorProductos = document.getElementById('contenedor-productos')

const contenedorCarrito = document.getElementById('carrito-contenedor')

const botonVaciar = document.getElementById('vaciar-carrito')
const contadorCarrito = document.getElementById('contadorCarrito')

const precioTotal = document.getElementById('precioTotal')
let carrito = []

document.addEventListener('DOMContentLoaded', () => {
   if (localStorage.getItem('carrito')) {
       carrito = JSON.parse(localStorage.getItem('carrito'))
        actualizarCarrito()
    }
})

botonVaciar.addEventListener('click', () => {
    carrito.length = 0
    actualizarCarrito()
})
const lista = document.getElementById("lista")
/*const stockProductos = document.getElementById("stockProductos");*/
fetch ("./data.json")
.then(response => response.json())
.then(data => {

data.forEach(producto => {
    const div = document.createElement('div')
    const li = document.createElement("li")

    div.classList.add('producto')
    div.innerHTML = `
    <img src=${producto.img} alt= "">
    <h3>${producto.nombre}</h3>
    <p>${producto.desc}</p>
    <p>onzas: ${producto.onzas}</p>
    <p class="precioProducto">Precio:$ ${producto.precio}</p>
    <button id="agregar${producto.id}" class="boton-agregar">Agregar <i class="fas fa-shopping-cart"></i></button>
    `;
    lista.append(li);

    contenedorProductos.appendChild(div)
    
    const boton = document.getElementById(`agregar${producto.id}`);

    boton.addEventListener("click", () => {
        Swal.fire({
          title: "Agregado con exito",
          icon: "success",
          confirmButtonText: "Aceptar",
        });
      })
    
    
    boton.addEventListener('click', () => {
        agregarAlCarrito(producto.id)
        })
    })
    
const agregarAlCarrito = (prodId) => {
    const existe = carrito.some(prod => prod.id === prodId)

    if (existe) {
        const prod = carrito.map (prod => {
            if (prod.id === prodId){
                prod.cantidad++
            }
        })
    } else { 

    const item = data.find((prod) => prod.id === prodId)
    carrito.push(item)
    console.log(carrito)
}
actualizarCarrito()
};
}) //aqui funciona correctamente

const eliminarDelCarrito = (prodId) => {
    const item = carrito.find((prod) => prod.id === prodId)
    const indice = carrito.indexOf(item)
    carrito.splice(indice, 1)
    actualizarCarrito()
}

const actualizarCarrito = () => {
    contenedorCarrito.innerHTML = ""

    carrito.forEach((prod) => {
        const div = document.createElement('div')
        div.className = ('productoEnCarrito')
        div.innerHTML = `
            <p>${prod.nombre}</p>
            <p>Precio:$${prod.precio}</p>
            <p>Cantidad: <span id="cantidad">${prod.cantidad}</span></p>
            <button onclick="eliminarDelCarrito(${prod.id})" class="boton-eliminar"><i class="fas fa-trash-alt"></i></button>
            `
        contenedorCarrito.appendChild(div)
        
        localStorage.setItem('carrito', JSON.stringify(carrito))
    })

    contadorCarrito.innerText = carrito.length
    precioTotal.innerText = carrito.reduce((acc, prod) => acc + prod.cantidad * prod.precio, 0)
}
actualizarCarrito()//aqui funciona pero no eliminar

boton.addEventListener("click", () => {
    Toastify({
      text: "Click aquí para reservar tu hora!",
      duration: 4000,
      destination: "https://instagram.com/mcmxcvii_lit?igshid=YmMyMTA2M2Y=",
    }).showToast();
})