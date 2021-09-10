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


// Does an ID exist in the songs/playlist
function isIdExist (arr, id)
{
  for (let i=0; i<arr.length; i++){
    if (arr[i].id === id)
      return true;
  }
  return false;
}
// find max ID in song/playlist
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

// find the playlist by id
function getPlaylistID (id){
  for (let i = 0; i < player.playlists.length; i++) {
    if (player.playlists[i].id === id)
      return player.playlists[i]
  }
  throw new Error("No such ID");
}
function removePlaylist(id) {

  let playerlistIndex = player.playlists.indexOf(getPlaylistID(id))
  player.playlists.splice(playerlistIndex,1);
}

function createPlaylist(name, id) {

  if (isIdExist(player.playlists, id)){
    throw 'this id already exist!';
  }

  if (id === undefined){
    id = maxID(player.playlists) +1;
  }

  let newPlaylists = {
    id: id, 
    name: name,
    songs: []
  }
  player.playlists.push(newPlaylists);
  return id;
}

function playPlaylist(id) {
  
  let playPlaylistIndex = player.playlists.indexOf(getPlaylistID(id))
  for (let idSong of player.playlists[playPlaylistIndex].songs)
  {
    playSong(idSong);
  }
}

function editPlaylist(playlistId, songId) {
  
  let indexPlaylist = player.playlists.findIndex(i => i.id===playlistId);
  let songIndex = player.songs.findIndex(i => i.id === songId);
  let songIndexInPlaylist = player.playlists[indexPlaylist].songs.indexOf(songId);

  if (songIndex === -1)
  {
    throw("There isn't a song with that ID");
  }
  if (indexPlaylist === -1)
  {
    throw("There isn't a playlist with that ID")
  }

  if (player.playlists[indexPlaylist].songs.includes(songId) === false)
  {
    player.playlists[indexPlaylist].songs.push(songId);
  }  
  else 
  {
    player.playlists[indexPlaylist].songs.splice(songIndexInPlaylist,1);
  }

  if (player.playlists[indexPlaylist].songs.length === 0) 
  {
    player.playlists.splice(indexPlaylist,1);
  }
}

function playlistDuration(id) {

  let indexPlaylist = player.playlists.findIndex(i => i.id===id);
  let sumDuration = 0;
  for (let i of player.playlists[indexPlaylist].songs)
  {
    sumDuration = sumDuration + getSongID(i).duration;
  }
  return sumDuration;
}

function searchByQuery(query) {
  
  let songs = [];
  let playlists = [];
  query = query.toLowerCase();

  for (let song of player.songs)
  {
    if( (song.title.toLowerCase().replace(/[\W_]/g , "").includes(query)) || 
        (song.album.toLowerCase().replace(/[\W_]/g , "").includes(query)) || 
        (song.artist.toLowerCase().replace(/[\W_]/g , "").includes(query)) )
    {
      songs.push(song);
    }
  }

  for (let playlist of player.playlists)
  {
    if (playlist.name.toLowerCase().replace(/[\W_]/g , "").includes(query))
    {
      playlists.push(playlist);
    }
  }

  songs.sort((a,b) => a.title.toLowerCase() < b.title.toLowerCase() ? -1 : 1);
  playlists.sort((a,b) => a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1);

return {songs,playlists};
}

function searchByDuration(duration) {
  
  duration = duration.split(":");
  duration = parseInt(duration[0] *60) + parseInt(duration[1]);

  let closestTime = Math.abs(player.songs[0].duration - duration);
  let closest = player.songs[0];

  for (let song of player.songs)
  {
    if ( Math.abs(song.duration - duration) < closestTime  )
    {
      closestTime = Math.abs(song.duration - duration);
      closest = song;
    }
  }
  for (let playlist of player.playlists)
  {
    if ( Math.abs(playlistDuration(playlist.id) - duration) < closestTime )
    {
      closestTime = (playlistDuration(playlist.id) - duration);
      closest = playlist;
    }
  }
  return closest
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

