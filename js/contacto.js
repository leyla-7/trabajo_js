document.addEventListener("DOMContentLoaded", function () {
  const map = L.map("map").setView([40.421, -3.682], 13);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: "© OpenStreetMap contributors",
  }).addTo(map);

  const empresaCoords = [40.421, -3.682];
  L.marker(empresaCoords)
    .addTo(map)
    .bindPopup("<b>BrillaPro Limpiezas</b><br>Calle de Alcalá 123, Madrid")
    .openPopup();

  let routingControl;

  document
    .getElementById("ruta-formulario")
    .addEventListener("submit", function (e) {
      e.preventDefault();

      const direccion = document.getElementById("direccion").value;
      if (!direccion) return;

      fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          direccion
        )}`
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.length === 0) {
            alert("No se encontró la dirección. Intenta otra vez.");
            return;
          }

          const userCoords = [data[0].lat, data[0].lon];

          if (routingControl) map.removeControl(routingControl);

          routingControl = L.Routing.control({
            waypoints: [
              L.latLng(userCoords[0], userCoords[1]),
              L.latLng(empresaCoords[0], empresaCoords[1]),
            ],
            language: "es",
            routeWhileDragging: false,
          }).addTo(map);

          map.fitBounds([
            [userCoords[0], userCoords[1]],
            [empresaCoords[0], empresaCoords[1]],
          ]);
        })
        .catch((err) => {
          console.error(err);
          alert("Error al calcular la ruta. Intenta más tarde.");
        });
    });
});
