const params = new URLSearchParams(window.location.search);
const artistId = params.get('artistId');

const artistNameElement = document.getElementById("artist-name");
const artistPictureElement = document.getElementById("hero-image");
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
        artistPictureElement.style.backgroundImage = `url('${data.picture_big}')`;

        // Recupero gli album
        const albumsUrl = `https://striveschool-api.herokuapp.com/api/deezer/artist/${artistId}/albums`;
        return fetch(albumsUrl);
    })
    .then(response => response.json())
    .then(albumsData => {
        let albumHTML = '';
        // Creo il codice HTML per gli album
        albumsData.data.forEach(album => {
            albumHTML += `
                <div class="col-6 col-sm-6 col-lg-3 g-3">
                    <div class="card bg-secondary text-white">
                        <img src="${album.cover_medium}" class="card-img-top" alt="Copertina dell'album ${album.title}">
                        <div class="card-body bg-dark">
                            <h2 class="card-title h6">${album.title}</h2>
                        </div>
                    </div>
                </div>
            `;
        });

        albumsContainer.innerHTML = albumHTML;

        // Aggiungo gli event listener agli album dopo aver aggiunto il contenuto
        const albumCards = albumsContainer.querySelectorAll(".card");
        albumCards.forEach((card, index) => {
            const album = albumsData.data[index];
            card.addEventListener("click", () => {
                window.location.href = `album.html?albumId=${album.id}`;
            });
        });
    })
    .catch(error => {
        console.error("Errore durante la fetch:", error);
    });
