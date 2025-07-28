// formulario de contacto API

(function () {
  emailjs.init("LaoKk_N8IOYLdHu3v");
})();

// Espera que la página cargue
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("formulario-contacto");

  form.addEventListener("submit", function (e) {
    e.preventDefault(); // Evita el envío normal

    emailjs.sendForm("service_sk2391m", "template_3bhgcsf", form).then(
      function (response) {
        console.log("Éxito!", response.status, response.text);
        alert("¡Mensaje enviado correctamente!");
        form.reset(); // Limpia formulario
      },
      function (error) {
        console.error("Error al enviar:", error);
        alert("Error al enviar. Revisa la consola.");
      }
    );
  });
});

// Base de datos opiniones
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-opinion");
  const container = document.getElementById("opiniones-container");

  // Datos iniciales (simula JSON local)
  const opinionesIniciales = [
    { nombre: "Carlos", texto: "Muy buena atención y amor por los animales." },
    { nombre: "Lucía", texto: "Adopté a mi perrito aquí. ¡Recomendado!" },
  ];

  // Cargar desde localStorage o usar iniciales
  let opiniones =
    JSON.parse(localStorage.getItem("opinionesZootopia")) || opinionesIniciales;

  const guardarOpiniones = () => {
    localStorage.setItem("opinionesZootopia", JSON.stringify(opiniones));
  };

  const renderOpiniones = () => {
    container.innerHTML = "";
    opiniones.forEach((op) => {
      container.innerHTML += `
        <div style="border:1px solid #ccc; margin:10px; padding:10px;">
          <h4>${op.nombre}</h4>
          <p>${op.texto}</p>
        </div>`;
    });
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const nombre = document.getElementById("usuario").value.trim();
    const texto = document.getElementById("comentario").value.trim();

    if (!nombre || !texto) {
      Swal.fire("Error", "Completa ambos campos", "error");
      return;
    }

    const nuevaOpinion = { nombre, texto };
    opiniones.push(nuevaOpinion);
    guardarOpiniones();
    renderOpiniones();
    form.reset();

    Swal.fire("Gracias", "Opinión enviada", "success");
  });

  renderOpiniones();
});
