const params = new URLSearchParams(window.location.search);
const artistId = params.get('artistId');

const artistNameElement = document.getElementById("artist-name");
const artistPictureElement = document.getElementById("artist-picture");
const albumsContainer = document.getElementById("albums-container");

const artistUrl = `https://striveschool-api.herokuapp.com/api/deezer/artist/${artistId}`;

// Recupero artista
fetch(artistUrl)
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error("Errore nel recupero dei dati dell'artista");
        }
    })
    .then(data => {
        artistNameElement.textContent = data.name;
        artistPictureElement.src = data.picture_big;

        // Recupero gli album
        const albumsUrl = `https://striveschool-api.herokuapp.com/api/deezer/artist/${artistId}/albums`;
        return fetch(albumsUrl);
    })
    .then(response => response.json())
    .then(albumsData => {
        //Metto le card degli album
        albumsData.data.forEach(album => {
            const col = document.createElement("div");
            col.classList.add("col-6", "col-md-4", "col-lg-3", "h-auto", "g-3");

            const albumCard = document.createElement("div");
            albumCard.classList.add("card", "bg-secondary", "text-white");
            albumCard.style.height = "260px";

            albumCard.innerHTML = `
                <img src="${album.cover_medium}" class="card-img-top" alt="Copertina dell'album ${album.title}">
                <div class="card-body bg-dark">
                    <h2 class="card-title h6">${album.title}</h2>
                </div>
            `;

            albumCard.addEventListener("click", () => {
                window.location.href = `album.html?albumId=${album.id}`;
            });

            col.appendChild(albumCard);
            albumsContainer.appendChild(col);
        });
    })
    .catch(error => {
        console.error("Errore durante la fetch:", error);
    });
