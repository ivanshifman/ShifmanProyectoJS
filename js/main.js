class Producto {
    constructor(id, titulo, imagen, categoria, precio) {
        this.id = id;
        this.titulo = titulo;
        this.imagen = imagen;
        this.categoria = {
            nombre: categoria.nombre,
            id: categoria.id
        };
        this.precio = precio;
    }
}
// PRODUCTOS
const productos = [
    new Producto("bateria-01", "Bateria 01", "./img/bateria/bateria1.webp", { nombre: "Baterias", id: "baterias" }, 4500),
    new Producto("bateria-02", "Bateria 02", "./img/bateria/bateria2.webp", { nombre: "Baterias", id: "baterias" }, 3000),
    new Producto("bateria-03", "Bateria 03", "./img/bateria/bateria3.webp", { nombre: "Baterias", id: "baterias" }, 2000),
    new Producto("bateria-04", "Bateria 04", "./img/bateria/bateria4.webp", { nombre: "Baterias", id: "baterias" }, 4500),
    new Producto("bateria-05", "Bateria 05", "./img/bateria/bateria5.webp", { nombre: "Baterias", id: "baterias" }, 3000),
    new Producto("bateria-06", "Bateria 06", "./img/bateria/bateria6.webp", { nombre: "Baterias", id: "baterias" }, 2200),
    new Producto("bateria-07", "Bateria 07", "./img/bateria/bateria7.webp", { nombre: "Baterias", id: "baterias" }, 1600),
    new Producto("bateria-08", "Bateria 08", "./img/bateria/bateria8.webp", { nombre: "Baterias", id: "baterias" }, 3050),
    new Producto("bateria-09", "Bateria 09", "./img/bateria/bateria9.webp", { nombre: "Baterias", id: "baterias" }, 2000),
    new Producto("bateria-10", "Bateria 10", "./img/bateria/bateria10.webp", { nombre: "Baterias", id: "baterias" }, 1550),
    new Producto("bateria-11", "Bateria 11", "./img/bateria/bateria11.webp", { nombre: "Baterias", id: "baterias" }, 5000),
    new Producto("bateria-12", "Bateria 12", "./img/bateria/bateria12.webp", { nombre: "Baterias", id: "baterias" }, 22700),
    new Producto("guitarra-01", "Guitarra 01", "./img/guitarra/guitarra1.webp", { nombre: "Guitarras", id: "guitarras" }, 6700),
    new Producto("guitarra-02", "Guitarra 02", "./img/guitarra/guitarra2.webp", { nombre: "Guitarras", id: "guitarras" }, 3800),
    new Producto("guitarra-03", "Guitarra 03", "./img/guitarra/guitarra3.webp", { nombre: "Guitarras", id: "guitarras" }, 4000),
    new Producto("guitarra-04", "Guitarra 04", "./img/guitarra/guitarra4.webp", { nombre: "Guitarras", id: "guitarras" }, 6700),
    new Producto("guitarra-05", "Guitarra 05", "./img/guitarra/guitarra5.webp", { nombre: "Guitarras", id: "guitarras" }, 3500),
    new Producto("guitarra-06", "Guitarra 06", "./img/guitarra/guitarra6.webp", { nombre: "Guitarras", id: "guitarras" }, 4000),
    new Producto("guitarra-07", "Guitarra 07", "./img/guitarra/guitarra7.webp", { nombre: "Guitarras", id: "guitarras" }, 6780),
    new Producto("guitarra-08", "Guitarra 08", "./img/guitarra/guitarra8.webp", { nombre: "Guitarras", id: "guitarras" }, 3800),
    new Producto("guitarra-09", "Guitarra 09", "./img/guitarra/guitarra9.webp", { nombre: "Guitarras", id: "guitarras" }, 2300),
    new Producto("guitarra-10", "Guitarra 10", "./img/guitarra/guitarra10.webp", { nombre: "Guitarras", id: "guitarras" }, 6000),
    new Producto("piano-01", "Piano 01", "./img/piano/piano1.webp", { nombre: "Pianos", id: "pianos" }, 8800),
    new Producto("piano-02", "Piano 02", "./img/piano/piano2.webp", { nombre: "Pianos", id: "pianos" }, 7000),
    new Producto("piano-03", "Piano 03", "./img/piano/piano3.webp", { nombre: "Pianos", id: "pianos" }, 8340),
    new Producto("piano-04", "Piano 04", "./img/piano/piano4.webp", { nombre: "Pianos", id: "pianos" }, 7100),
    new Producto("piano-05", "Piano 05", "./img/piano/piano5.webp", { nombre: "Pianos", id: "pianos" }, 2200),
    new Producto("piano-06", "Piano 06", "./img/piano/piano6.webp", { nombre: "Pianos", id: "pianos" }, 4700),
    new Producto("piano-07", "Piano 07", "./img/piano/piano7.webp", { nombre: "Pianos", id: "pianos" }, 4600),
    new Producto("piano-08", "Piano 08", "./img/piano/piano8.webp", { nombre: "Pianos", id: "pianos" }, 5600),
    new Producto("viento-01", "Viento 01", "./img/viento/viento1.webp", { nombre: "Vientos", id: "vientos" }, 1800),
    new Producto("viento-02", "Viento 02", "./img/viento/viento2.webp", { nombre: "Vientos", id: "vientos" }, 2300),
    new Producto("viento-03", "Viento 03", "./img/viento/viento3.webp", { nombre: "Vientos", id: "vientos" }, 1200),
    new Producto("viento-04", "Viento 04", "./img/viento/viento4.webp", { nombre: "Vientos", id: "vientos" }, 1230)
];

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

cargarProductos(productos);

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