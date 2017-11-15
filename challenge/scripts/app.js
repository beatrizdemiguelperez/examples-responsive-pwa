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

  return li;
}

/**
 * Create all songs HTML and add them to the webpage.
 */
fillSongsHTML = (songs) => {
  const ul = document.getElementById('songs-list');

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
  const h1 = currentSong.querySelector('h1');

  img.src = song.img;
  h1.innerText = song.title;
}


/**
 * Fetch all songs
 */
const fetchSongs = (callback) => {
  return fetch('data/songs.json').then((resp) =>
    resp.json()
  ).then((json) => {
    const songs = json.songs;
    callback(null, songs);
  }).catch(function(error) {
    console.log(JSON.stringify(error));
    callback(error, null);
  });
};

/**
 * Fetch songs as soon as the page is loaded.
 */
document.addEventListener('DOMContentLoaded', (event) => {
  setTimeout(() => {
    fetchSongs((error, songs) => {
      if (error) { // Got an error
        console.error(error);
      } else {
        fillSongsHTML(songs);
        updateCurrentSongHTML(songs[0]);
      }
    });
  }, 5000);
});
