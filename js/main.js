// Carga de productos desde .json

let productos = [];

fetch("./js/productos.json")
    .then(response => response.json())
    .then(data => {
        productos = data;
        cargarProductos(productos);
    })

// Elementos del HTML
const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
const buscadorInput = document.querySelector("#search");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const numerito = document.querySelector("#numerito");


// Carga de productos en el main

function cargarProductos(productosElegidos) {

    contenedorProductos.innerHTML = "";
   
    productosElegidos.forEach(producto => {

        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
            <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="producto-detalles">
                <h3 class="producto-titulo">${producto.titulo}</h3>
                <p class="producto-precio">$${producto.precio}</p>
                <button class="producto-agregar" id="${producto.id}">Agregar</button>
            </div>
        `;

        contenedorProductos.append(div);
    });

    actualizarBotonesAgregar();
}


// Añadir evento input a la barra de búsqueda
buscadorInput.addEventListener("input", () => {
    const filtroBusqueda = buscadorInput.value.toLowerCase();
    const categoriaActiva = document.querySelector(".boton-categoria.active").id;

    if (categoriaActiva !== "todos") {
        const productosCategoria = productos.filter(producto => producto.categoria.id === categoriaActiva);
        const productosFiltrados = filtrarProductos(productosCategoria, filtroBusqueda);
        cargarProductos(productosFiltrados);
    } else {
        const productosFiltrados = filtrarProductos(productos, filtroBusqueda);
        cargarProductos(productosFiltrados);
    }
});

// Función para filtrar productos por término de búsqueda
function filtrarProductos(productos, filtro) {
    return productos.filter(producto => producto.titulo.toLowerCase().includes(filtro));
}

// Cambios en botones lista Aside y separación por categorías
botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {
        botonesCategorias.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");

        const categoriaActiva = e.currentTarget.id;
        const filtroBusqueda = buscadorInput.value.toLowerCase();

        if (categoriaActiva !== "todos") {
            const productosCategoria = productos.filter(producto => producto.categoria.id === categoriaActiva);
            const productosFiltrados = filtrarProductos(productosCategoria, filtroBusqueda);
            tituloPrincipal.innerText = productosCategoria[0].categoria.nombre;
            cargarProductos(productosFiltrados);
        } else {
            const productosFiltrados = filtrarProductos(productos, filtroBusqueda);
            tituloPrincipal.innerText = "Todos los productos";
            cargarProductos(productosFiltrados);
        }
    });
});

// Actualizar botones de agregar por categoria
function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".producto-agregar");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
}

//Agregar productos al carrito

let productosEnCarrito;

let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");

if(productosEnCarritoLS) {
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarNumerito();
} else {
    productosEnCarrito = [];
}

function agregarAlCarrito(e) {

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

    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);

    if(productosEnCarrito.some(producto => producto.id === idBoton)) {
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;
    } else {
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }

    actualizarNumerito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

// Actualizar numero del carrito
function actualizarNumerito() {
    let nuevoNumerito = productosEnCarrito.reduce((acumulador, producto) => acumulador + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
}