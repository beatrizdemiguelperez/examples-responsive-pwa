const data = {
    songs: [
        {
            id: 0,
            title: "Tu mejor pesadilla",
            img: "images/tu_mejor_pesadilla.jpg",
            duration: "1:45",
            artist: "Sidecars",
            reproduction_count: "1.000.2323",
            url: "http://mp3.elgenero.co/mp3/wp-content/uploads/2017/07/Sidecars%20-%20Tu-%20Peor%20Pesadilla.mp3"
        },
        {
            id: 1,
            title: "Fan de ti",
            img: "images/fan_de_ti.jpg",
            duration: "1:22",
            artist: "Sidecars",
            reproduction_count: "500.2323",
            url: "http://mp3.elgenero.co/mp3/wp-content/uploads/2017/07/Sidecars%20-%20Tu-%20Peor%20Pesadilla.mp3"
        },
        {
            id: 2,
            title: "Contra las cuerdas",
            img: "images/contra_las_cuerdas.jpg",
            duration: "2:25",
            artist: "Sidecars",
            reproduction_count: "600.2323",
            url: "http://mp3.elgenero.co/mp3/wp-content/uploads/2017/07/Sidecars%20-%20Tu-%20Peor%20Pesadilla.mp3"
        }
    ]
};

/**
 * Create song HTML.
 */
createSongHTML = (song, index) => {
    const li = document.createElement('li');

    li.className = 'song';
    li.id = song.id;

    li.addEventListener("click", function(e) {
        updateCurrentSongHTML(song);
    });

    const p_index = document.createElement('p');

    p_index.className = 'index';
    p_index.innerHTML = index++;
    li.append(p_index);


    const p_title = document.createElement('p');

    p_title.className = 'title';
    p_title.innerHTML = song.title;
    li.append(p_title);


    const p_duration = document.createElement('p');

    p_duration.className = 'duration';
    p_duration.innerHTML = song.duration;
    li.append(p_duration);

    const p_reproduction_count = document.createElement('p');
    
    p_reproduction_count.className = 'reproduction_count';
    p_reproduction_count.innerHTML = song.reproduction_count;
    li.append(p_reproduction_count);

    return li
}

/**
 * Create all songs HTML and add them to the webpage.
 */
fillSongsHTML = (songs) => {
    const ul = document.getElementById('music-list');

    songs.forEach((song, index) => {
        ul.append(createSongHTML(song, index));
    });
}


/**
 * Update selected song HTML
 */
updateCurrentSongHTML = (song) => {
    const currentSong = document.getElementById('current_song');
    const img = currentSong.querySelector('img');
    const h1 = currentSong.querySelector('h1')

    img.src = song.img;
    h1.innerText = song.title;
}

fillSongsHTML(data.songs);
updateCurrentSongHTML(data.songs[0]);