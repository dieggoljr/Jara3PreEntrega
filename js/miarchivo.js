const nombreUsuario = prompt("Por favor, decinos tu nombre:");

const mensajeBienvenida = document.createElement("p");
mensajeBienvenida.textContent = `¡Hola, ${nombreUsuario}! Esperamos encuentres el juego que buscas!!`;
document.body.appendChild(mensajeBienvenida);

localStorage.setItem("nombreUsuario", JSON.stringify(nombreUsuario));

class Juego {
  constructor(id, nombre, compania, precio, imagen) {
    this.id = id;
    this.nombre = nombre;
    this.compania = compania;
    this.precio = precio;
    this.imagen = imagen;
  }
}

const estanteria = [
  new Juego(1, "Demon’s Souls Remake", "Sony", 63, "img/img03.jpg"),
  new Juego(2, "God of War: Ragnarok", "Sony", 70, "img/img02.jpg"),
  new Juego(3, "Baldur's Gate 3", "Larain", 54, "img/img01.jpg"),
];

function mostrarListaJuegos(array) {
  const container = document.getElementById("card-container");
  container.innerHTML = "";

  array.forEach((juego) => {
    const cardHTML = `
          <div class="card">
            <img src="${juego.imagen}" alt="${juego.nombre}">
            <p>${juego.nombre}</p>
            <p>Compañía: ${juego.compania}</p>
            <p>Precio: U$S${juego.precio}</p>
            <button class="agregar-carrito" data-id="${juego.id}">Agregar al carrito</button>
          </div>
        `;
    container.innerHTML += cardHTML;
  });

  const agregarBotones = document.querySelectorAll(".agregar-carrito");
  agregarBotones.forEach((boton) => {
    boton.addEventListener("click", () => {
      const id = parseInt(boton.dataset.id);
      const juego = estanteria.find((juego) => juego.id === id);
      agregarAlCarrito(juego);
    });
  });
}

const carrito = [];

function agregarAlCarrito(producto) {
  const itemEncontrado = carrito.find((item) => item.id === producto.id);
  if (itemEncontrado) {
    itemEncontrado.cantidad++;
  } else {
    carrito.push({ ...producto, cantidad: 0 });
  }
  mostrarCarrito();
}

function mostrarCarrito() {
  const carritoProductos = document.getElementById("carrito-productos");
  carritoProductos.innerHTML = "";

  carrito.forEach((producto) => {
    const div = document.createElement("div");
    div.classList.add("carrito-producto");
    div.innerHTML = `
        <p>${producto.nombre} - ${producto.precio} U$S</p>
        <button class="quitar-carrito" data-id="${producto.id}">-</button>
        <span>${producto.cantidad}</span>
        <button class="agregar-carrito" data-id="${producto.id}">+</button>
        <button class="borrar-carrito" data-id="${producto.id}">x</button>
      `;
    carritoProductos.appendChild(div);
  });

  calcularTotal();
}

function calcularTotal() {
  const total = carrito.reduce(
    (acc, producto) => acc + producto.precio * producto.cantidad,
    0
  );
  const carritoTotal = document.getElementById("carrito-total");
  carritoTotal.textContent = `Total: ${total} U$S`;
}

document.addEventListener("click", (e) => {
  if (e.target.matches(".quitar-carrito")) {
    const id = parseInt(e.target.dataset.id);
    quitarDelCarrito(id);
  } else if (e.target.matches(".agregar-carrito")) {
    const id = parseInt(e.target.dataset.id);
    const juego = estanteria.find((juego) => juego.id === id);
    agregarAlCarrito(juego);
  } else if (e.target.matches(".borrar-carrito")) {
    const id = parseInt(e.target.dataset.id);
    borrarDelCarrito(id);
  }
});

function quitarDelCarrito(id) {
  const itemEncontrado = carrito.find((item) => item.id === id);
  if (itemEncontrado) {
    if (itemEncontrado.cantidad > 1) {
      itemEncontrado.cantidad--;
    } else {
      borrarDelCarrito(id);
    }
  }
  mostrarCarrito();
}

function borrarDelCarrito(id) {
  const carritoFiltrado = carrito.filter((item) => item.id !== id);
  carrito.length = 0;
  carrito.push(...carritoFiltrado);
  mostrarCarrito();
}

function vaciarCarrito() {
  carrito.length = 0;
  mostrarCarrito();
}

document
  .getElementById("vaciar-carrito")
  .addEventListener("click", vaciarCarrito);

mostrarListaJuegos(estanteria);
