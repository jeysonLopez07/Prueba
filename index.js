const nombre = document.getElementById("nombre");
const contrasena = document.getElementById("Contrasena");
const confirmar = document.getElementById("Confirmar");
const mensaje = document.getElementById("mensaje");
const boton = document.getElementById("crearCuenta");
url = "http://localhost:8001";

const apiStel = async () => {
  APIKEY="xkBLC1cTqfY41Rjnj0SB9qmBA5wbO1p3VRW3cCsJ"
  const res = await fetch(`https://app.stelorder.com/app/addresses?APIKEY=xkBLC1cTqfY41Rjnj0SB9qmBA5wbO1p3VRW3cCsJ`, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
    }
  });

  const data = await res.json();
  console.log(data);
}

apiStel()
const enviarInfo = async () => {
  const nombre1 = document.getElementById("nombre").value;
  const contrasena1 = document.getElementById("Contrasena").value;

  const res = await fetch(`${url}/crearCuenta`, {
    method: "put",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nombre1,
      contrasena1,
    }),
  });

  const data = await res.json();
  console.log(data[0]);
  if (data[0] === "Creado") {
    mensaje.style.color = "green";
    mensaje.innerHTML = "";
    const texto = document.createTextNode("Cuenta creado Exitosamente");
    mensaje.append(texto);
  } else if (data[0] === "Error") {
    mensaje.style.color = "red";
    mensaje.innerHTML = "";
    const texto = document.createTextNode(
      "Ocurrió un error al crear la cuenta"
    );
    mensaje.append(texto);
  }

  setTimeout(() => {
    location.reload();
  }, 5000);
};

const crearCuenta = (e) => {
  e.preventDefault();
  if (
    nombre.value === "" ||
    contrasena.value === "" ||
    confirmar.value === ""
  ) {
    mensaje.style.color = "red";
    mensaje.innerHTML = "";
    const textoM = document.createTextNode("Todos los campos son Obligatorios");
    mensaje.append(textoM);
  } else if (contrasena.value.length < 8) {
    mensaje.innerHTML = "";
    mensaje.style.color = "red";
    const textoM = document.createTextNode(
      "La contraseña tiene que tener más de 8 caracteres"
    );
    mensaje.append(textoM);
  } else if (contrasena.value != confirmar.value) {
    mensaje.innerHTML = "";
    mensaje.style.color = "red";
    const textoM = document.createTextNode(
      "La contraseña y contraseña de confirmación no son las mismas"
    );
    mensaje.append(textoM);
  } else {
    enviarInfo();
  }
};

boton.addEventListener("click", crearCuenta);
