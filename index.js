const player = {
  songs: [
    {
      id: 1,
      title: 'Vortex',
      album: 'Wallflowers',
      artist: 'Jinjer',
      duration: 242,
    },
    {
      id: 2,
      title: 'Vinda',
      album: 'Godtfolk',
      artist: 'Songleikr',
      duration: 160,
    },
    {
      id: 7,
      title: 'Shiroyama',
      album: 'The Last Stand',
      artist: 'Sabaton',
      duration: 213,
    },
    {
      id: 3,
      title: 'Thunderstruck',
      album: 'The Razors Edge',
      artist: 'AC/DC',
      duration: 292,
    },
    {
      id: 4,
      title: 'All is One',
      album: 'All is One',
      artist: 'Orphaned Land',
      duration: 270,
    },
    {
      id: 5,
      title: 'As a Stone',
      album: 'Show Us What You Got',
      artist: 'Full Trunk',
      duration: 259,
    },
  ],
  playlists: [
    { id: 1, name: 'Metal', songs: [1, 7, 4] },
    { id: 5, name: 'Israeli', songs: [4, 5] },
  ],
  playSong(song) {
    console.log(`Playing ${song.title} from ${song.album} by ${song.artist} | ${durationConvert(song.duration)}.`)
  },
}

// convert to mm:ss
function durationConvert(duration)
{
  let min = Math.floor(duration / 60);
  let sec = duration % 60;
  
  if (min < 10){
    min = "0" + String(min);
  }
  if (sec < 10) {
    sec = "0" + String(sec);
  }
  return min+':'+sec
}

function playSong(id) {
  for (let song of player.songs){
    if (song.id === id)
    {
      return player.playSong(song);
    }
  }
  throw new Error("No such ID");
}

// find the song by id
function getSongID(id)
{
  for (let i = 0; i < player.songs.length; i++) {
    if (player.songs[i].id === id)
      return player.songs[i]
  }
  throw new Error("No such ID");
}

function removeSong(id) 
{
  let songIndex = player.songs.indexOf(getSongID(id))
  player.songs.splice(songIndex,1);

  for (let i=0; i<player.playlists.length; i++)
  {
    for (let j=0; j<player.playlists[i].songs.length; j++)
    {
      if (player.playlists[i].songs[j] === id)
        player.playlists[i].songs.splice(j,1);
    }
  }
}


// Does an ID exist in the songs
function isIdExist (arr, id)
{
  for (let i=0; i<arr.length; i++){
    if (arr[i].id === id)
      return true;
  }
  return false;
}
// find max ID in song
function maxID (arr)
{
  let max=0;
  for (let i = 0; i < arr.length; i++) 
  {
    if (arr[i].id > max) 
      max = arr[i].id;
  }
  return max;
}

function addSong(title, album, artist, duration, id) {

  if (isIdExist(player.songs, id)){
    throw 'this id already exist!';
  }
  
  if (id === undefined){
    id = maxID(player.songs) +1;
  }

  duration = duration.split(":");
  duration = parseInt(duration[0] *60) + parseInt(duration[1]);

  let newSong = {
    id: id,
    title: title,
    album: album,
    artist: artist,
    duration: duration,
  };

  player.songs.push(newSong);
  return id;
}

function removePlaylist(id) {
  // your code here
}

function createPlaylist(name, id) {
  // your code here
}

function playPlaylist(id) {
  // your code here
}

function editPlaylist(playlistId, songId) {
  // your code here
}

function playlistDuration(id) {
  // your code here
}

function searchByQuery(query) {
  // your code here
}

function searchByDuration(duration) {
  // your code here
}

module.exports = {
  player,
  playSong,
  removeSong,
  addSong,
  removePlaylist,
  createPlaylist,
  playPlaylist,
  editPlaylist,
  playlistDuration,
  searchByQuery,
  searchByDuration,
}

