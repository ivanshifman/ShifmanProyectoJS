let productosEnCarrito = localStorage.getItem("productos-en-carrito");
productosEnCarrito = JSON.parse(productosEnCarrito);

// Elementos del HTML
const asideCompra = document.querySelector("#span-aside-uno");
const asideEnvio = document.querySelector("#span-aside-dos");
const contenedorCarritoVacio = document.querySelector("#carrito-vacio");
const contenedorCarritoProductos = document.querySelector("#carrito-productos");
const contenedorCarritoAcciones = document.querySelector("#carrito-acciones");
let cantidadMenos = document.querySelectorAll(".carrito-control-menos");
let cantidadCarrito = document.querySelectorAll(".contador-cantidad");
let cantidadMas = document.querySelectorAll(".carrito-control-mas");
const contenedorCarritoComprado = document.querySelector("#carrito-comprado");
let botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");
const botonVaciar = document.querySelector("#carrito-acciones-vaciar");
const contenedorTotal = document.querySelector("#total");
const botonComprar = document.querySelector("#carrito-acciones-comprar");
const formulario = document.querySelector(".formulario");
const botonFormulario = document.querySelector(".boton-formulario");
const contenedorTarjeta = document.querySelector("#contenedor-tarjeta");
const botonTarjeta = document.querySelector("#boton-tarjeta");


// Carga de productos al carrito
function cargarProductosCarrito() {
    if (productosEnCarrito && productosEnCarrito.length > 0) {

        productosEnCarrito.sort((a, b) => a.titulo.toLowerCase() > b.titulo.toLowerCase() ? 1 : -1);

        contenedorCarritoVacio.classList.add("disabled");
        contenedorCarritoProductos.classList.remove("disabled");
        contenedorCarritoAcciones.classList.remove("disabled");
        contenedorCarritoComprado.classList.add("disabled");
    
        contenedorCarritoProductos.innerHTML = "";
    
        productosEnCarrito.forEach(producto => {
            const div = document.createElement("div");
            div.classList.add("carrito-producto");
            div.innerHTML = `
                <img class="carrito-producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
                <div class="carrito-producto-titulo">
                    <small>Título</small>
                    <h3>${producto.titulo}</h3>
                </div>
                <div class="carrito-producto-cantidad">
                    <small>Cantidad</small>
                    <div class="carrito-control">
                        <button class="carrito-control-boton carrito-control-menos" data-id="${producto.id}" ><span class="carrito-control-signo">-</span></button>
                        <span class="contador-cantidad">${producto.cantidad}</span>
                        <button class="carrito-control-boton carrito-control-mas" data-id="${producto.id}"><span class="carrito-control-signo">+</span></button>
                    </div>
                </div>
                <div class="carrito-producto-precio">
                    <small>Precio</small>
                    <p>$${producto.precio}</p>
                </div>
                <div class="carrito-producto-subtotal">
                    <small>Subtotal</small>
                    <p>$${producto.precio * producto.cantidad}</p>
                </div>
                <button class="carrito-producto-eliminar" id="${producto.id}"><i class="bi bi-trash-fill"></i></button>
            `;
    
            contenedorCarritoProductos.append(div);
        })
    
    
    } else {
        contenedorCarritoVacio.classList.remove("disabled");
        contenedorCarritoProductos.classList.add("disabled");
        contenedorCarritoAcciones.classList.add("disabled");
        contenedorCarritoComprado.classList.add("disabled");
    }

    actualizarBotonesEliminar();
    actualizarBotonesCantidad();
    actualizarTotal();
}

cargarProductosCarrito();

// Actualizar los botones de eliminar producto
function actualizarBotonesEliminar() {
    botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");

    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarDelCarrito);
    });
}

// Eliminacion productos carrito
function eliminarDelCarrito(e) {

    Toastify({
        text: "Producto eliminado",
        duration: 2000,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "linear-gradient(to top, rgb(227, 33, 33), rgb(181, 2, 2))",
          borderRadius: "2rem",
          textTransform: "uppercase",
          fontSize: ".8rem"
        },
        offset: {
            x: "1.5rem",
            y: "1.5rem"
          },
        onClick: function(){}
      }).showToast();

    const idBoton = e.currentTarget.id;
    const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
    productosEnCarrito.splice(index, 1);
    cargarProductosCarrito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

// Actualizar cantidad por cada producto
function actualizarBotonesCantidad() {
    cantidadMenos = document.querySelectorAll(".carrito-control-menos");
    cantidadCarrito = document.querySelectorAll(".contador-cantidad");
    cantidadMas = document.querySelectorAll(".carrito-control-mas");

    cantidadMas.forEach(mas => {
        mas.addEventListener("click", sumarCantidad)
    });

    cantidadMenos.forEach(menos => {
        menos.addEventListener("click", restarCantidad)
    });
}
// Suma productos dentro del carrito
function sumarCantidad(e) {

    Toastify({
        text: "Producto agregado",
        duration: 2000,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "linear-gradient(to top, rgba(15, 238, 34, 0.804), rgb(42, 99, 44))",
          borderRadius: "2rem",
          textTransform: "uppercase",
          fontSize: ".8rem"
        },
        offset: {
            x: "1.5rem",
            y: "1.5rem"
          },
        onClick: function(){}
      }).showToast();

    const idProducto = e.currentTarget.dataset.id;
    const producto = productosEnCarrito.find(p => p.id === idProducto);

    if (producto) {
        producto.cantidad++;
        cargarProductosCarrito();
        localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
    }
}
// Resta productos dentro del carrito
function restarCantidad(e) {

    Toastify({
        text: "Producto eliminado",
        duration: 2000,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "linear-gradient(to top, rgb(227, 33, 33), rgb(181, 2, 2))",
          borderRadius: "2rem",
          textTransform: "uppercase",
          fontSize: ".8rem"
        },
        offset: {
            x: "1.5rem",
            y: "1.5rem"
          },
        onClick: function(){}
      }).showToast();

    const idProducto = e.currentTarget.dataset.id;
    const producto = productosEnCarrito.find(p => p.id === idProducto);

    if (producto && producto.cantidad > 1) {
        producto.cantidad--;
        cargarProductosCarrito();
        localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
    }
}

// Vaciar el carrito
botonVaciar.addEventListener("click", vaciarCarrito);

function vaciarCarrito() {

    Swal.fire({
        title: "¿Estás seguro?",
        icon: "question",
        html: `Se van a borrar ${productosEnCarrito.reduce((acumulador, producto) => acumulador + producto.cantidad, 0)} producto(s).`,
        showCloseButton: true,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText: "Aceptar",
        cancelButtonText: "Cancelar",
        customClass: {
            title: 'tituloAlerta',
            htmlContainer: 'textoAlerta',
            icon: 'iconoAlertaUno',
            confirmButton: 'confirmarAlerta',
            cancelButton: 'cancelarAlerta',
          }
      }).then((result) => {
        if (result.isConfirmed) {
            productosEnCarrito.length = 0;
            localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
            cargarProductosCarrito();
        }
      });
}

// Actualizar valor total
function actualizarTotal() {
    const totalPrecio = productosEnCarrito.reduce((acumulador, producto) => acumulador + (producto.precio * producto.cantidad), 0);
    contenedorTotal.innerText = `$${totalPrecio}`;
}

// Boton comprar
botonComprar.addEventListener("click", comprarCarrito);
function comprarCarrito() {

    Swal.fire({
        title: "¿Estás seguro?",
        icon: "question",
        html: `Elegiste ${productosEnCarrito.reduce((acumulador, producto) => acumulador + producto.cantidad, 0)} producto(s).`,
        showCloseButton: true,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText: "Aceptar",
        cancelButtonText: "Cancelar",
        customClass: {
            title: 'tituloAlerta',
            htmlContainer: 'textoAlerta',
            icon: 'iconoAlertaUno',
            confirmButton: 'confirmarAlerta',
            cancelButton: 'cancelarAlerta',
          }
      }).then((result) => {
        if (result.isConfirmed) {
            productosEnCarrito.length = 0;
            localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
        
            contenedorCarritoVacio.classList.add("disabled");
            contenedorCarritoProductos.classList.add("disabled");
            contenedorCarritoAcciones.classList.add("disabled");
            contenedorCarritoComprado.classList.add("disabled");
            contenedorTarjeta.classList.add("disabled");
            formulario.classList.remove("disabled");
            asideCompra.classList.remove("active");
            asideEnvio.classList.add("active");
        }
      });

}

//Finalizar compra
botonFormulario.addEventListener("click", finalizarCompra);

function finalizarCompra() {

    const nombre = document.getElementById("nombre-formulario").value;
    const apellido = document.getElementById("apellido-formulario").value;
    const numero = document.getElementById("numero-formulario").value;
    const email = document.getElementById("email-formulario").value;
    const destino = document.getElementById("destino-formulario").value;
    const mensajeValidacion = document.getElementById("mensaje-validacion");

    mensajeValidacion.innerHTML = "";

    if (!nombre || !apellido || !numero || !email || !destino) {
        mensajeValidacion.innerText = "Todos los campos del formulario son obligatorios. Por favor, complétalos antes de finalizar la compra.";
        return;
    }

    function esNumeroValido(numero) {
        return !isNaN(numero) && !isNaN(parseFloat(numero)) && numero.length >= 8;
    }

    if (!esNumeroValido(numero)) {
        mensajeValidacion.innerText = "El campo 'Número' debe contener un valor numérico. (8 o más dígitos).";
        return;
    }

    productosEnCarrito.length = 0;
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));

    contenedorCarritoVacio.classList.add("disabled");
    contenedorCarritoProductos.classList.add("disabled");
    contenedorCarritoAcciones.classList.add("disabled");
    contenedorCarritoComprado.classList.add("disabled");
    formulario.classList.add("disabled");
    contenedorTarjeta.classList.remove("disabled");
}

    const inputNumeroTarjeta = document.querySelector("#input-tarjeta-numero");
    const inputNombreTarjeta = document.querySelector("#input-tarjeta-nombre");
    const inputMesTarjeta = document.querySelector("#input-tarjeta-mes");
    const inputYearTarjeta = document.querySelector("#input-tarjeta-year");
    const inputCvvTarjeta = document.querySelector("#input-tarjeta-seguro");
    const tarjetaNumero = document.querySelector("#numero-tarjeta-delantera");
    const tarjetaNombre = document.querySelector("#nombre-tarjeta-delantera");
    const tarjetaMes = document.querySelector("#exp-mes-tarjeta");
    const tarjetaYear = document.querySelector("#exp-year-tarjeta");
    const tarjetaCvv = document.querySelector("#cvv-tarjeta-trasera");

    inputNumeroTarjeta.addEventListener("input", () => {
        tarjetaNombre.innerText = inputNombreTarjeta.value
    })
