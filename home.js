
const albumIds = [75621062,315283,302127,707965,673968231,109943,6941024,14521228];
const albumContainer = document.getElementById("album-container");

albumIds.forEach(albumId => {
    const albumUrl = `https://striveschool-api.herokuapp.com/api/deezer/album/${albumId}`;

    fetch(albumUrl)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error(`Errore`);
            }
        })
        .then(data => {
            const col = document.createElement('div');
            col.classList.add('col-6', 'col-md-4', 'col-lg-3','h-auto','g-3'); 
            col.innerHTML = `
                <div class="card album-card bg-secondary text-white" style="height:260px">
                    <img src="${data.cover_medium}" class="card-img-top" alt="Copertina dell'album ${data.title}">
                    <div class="card-body,bg-dark ">
                        <h2 class="card-title h6 ">${data.title}</h2>
                    </div>
                </div>
            `;
            albumContainer.appendChild(col);
        })
        .catch(error => {
            console.error('Errore durante la fetch:', error);
        });
});
