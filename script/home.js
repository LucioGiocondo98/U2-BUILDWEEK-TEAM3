const albumIds = [
  75621062, 315283, 302127, 707965, 673968231, 109943, 6941024, 14521228,
];
const albumContainer = document.getElementById("album-container");

albumIds.forEach((albumId) => {
  const albumUrl = `https://striveschool-api.herokuapp.com/api/deezer/album/${albumId}`;

  fetch(albumUrl)
    .then((response) => response.json())
    .then((data) => {
      console.log("album", data);
      const col = document.createElement("div");
      col.classList.add("col-6", "col-md-4", "col-lg-3", "h-auto", "g-3");

      // Creazione card
      const card = document.createElement("div");
      card.classList.add("card", "album-card", "bg-secondary", "text-white");
      card.style.height = "260px";
      card.style.cursor = "pointer";

      // Aggiungere contenuto alla card
      card.innerHTML = `
                <img src="${data.cover_medium}" class="card-img-top" alt="Copertina dell'album ${data.title}">
                <div class="card-body bg-dark">
                    <h2 class="card-title h6">${data.title}</h2>
                    <p class="card-text">
                        <a href="artist.html?artistId=${data.artist.id}" class="text-white artist-link text-decoration-none">${data.artist.name}</a>
                    </p>
                </div>
            `;
      card.addEventListener("click", () => {
        window.location.href = `albumpage.html?Id=${data.id}`;
      });

      col.appendChild(card);
      albumContainer.appendChild(col);
    })
    .catch((error) => console.error("Errore durante la fetch:", error));
});
