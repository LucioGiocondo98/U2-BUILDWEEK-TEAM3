
        const params = new URLSearchParams(window.location.search);
        const artistId = params.get('artistId');
        
        const artistNameElement = document.getElementById("artist-name");
        const artistPictureElement = document.getElementById("hero-image");
        const albumsContainer = document.getElementById("albums-container");
        
        console.log("artistId dalla query string:", artistId);
        
        if (artistId) {
            const artistUrl = `https://striveschool-api.herokuapp.com/api/deezer/artist/${artistId}`;
            console.log("URL artista:", artistUrl);
        
            // Recupero i dati dell'artista
            fetch(artistUrl)
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        console.error("Errore nel recupero dei dati dell'artista - Status:", response.status);
                        throw new Error(`Errore nella richiesta dell'artista: ${response.status}`);
                    }
                })
                .then(artistData => {
                    console.log("Dati dell'artista ricevuti:", artistData);
                    artistNameElement.textContent = artistData.name;
                    artistPictureElement.style.backgroundImage = `url('${artistData.picture_big}')`;
        
                    const albumsUrl = `https://striveschool-api.herokuapp.com/api/deezer/artist/${artistId}/albums`;
                    console.log("URL album:", albumsUrl);
        
                    // Recupero gli album dell'artista
                    return fetch(albumsUrl);
                })
                .then(response => {
                    if (!response.ok) {
                        console.error("Errore nel recupero degli album - Status:", response.status);
                        throw new Error(`Errore nella richiesta degli album: ${response.status}`);
                    }
                    return response.json();
                })
                .then(albumsData => {
                    console.log("Dati degli album ricevuti:", albumsData);
                    let albumHTML = '';
                    albumsData.data.forEach(album => {
                        albumHTML += `
                            <div class="col-6 col-sm-6 col-lg-3 g-3">
                                <div class="card bg-secondary text-white album-card" data-album-id="${album.id}">
                                    <img src="${album.cover_medium}" class="card-img-top" alt="Copertina dell'album ${album.title}">
                                    <div class="card-body bg-dark">
                                        <h2 class="card-title h6">${album.title}</h2>
                                    </div>
                                </div>
                            </div>
                        `;
                    });
        
                    albumsContainer.innerHTML = albumHTML;
        
                    // Aggiunta degli event listener alle card degli album
                    const albumCards = document.querySelectorAll(".album-card");
                    albumCards.forEach(card => {
                        card.addEventListener('click', function() {
                            const albumId = this.dataset.albumId;
                            window.location.href = `albumpage.html?Id=${albumId}`;
                        });
                    });
                })
                .catch(error => {
                    console.error("Si è verificato un errore:", error);
                });
        }