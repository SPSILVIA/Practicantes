$(document).ready(function(){
	initPlayer();
 getSongs();

});
var audio = document.getElementById('player');
var musica;
 function  initPlayer(){
 	$('#shuffle').click(function(){
 		$('#playlist').empty();
 		console.log(shuffle(musica.songs));
 		genList(musica);
 		playSong(0);
 	});
 }

function getSongs(){
 $.getJSON("js/app.json",function(mjson){
        musica=mjson;
  genList(musica);
  
 });

}
function playSong(id){
 console.log(id);
 var long = musica.songs;
 if(id>=long.length){
  console.log('se acabò');
  audio.pause();
 }else{
  $('#img-album').attr('src',musica.songs[id].image);
     $('#player').attr('src',musica.songs[id].song);
     audio.play();
     console.log('hay mas canciones');
     scheduleSong(id);
 }
 
}

function genList(musica){
 console.log(musica.songs);  
 $.each(musica.songs,function(i,song){
  $('#playlist').append('<li class="list-group-item" id="'+i+'">'+song.name+'</li>');
 });
 $('#playlist li').click(function(){
  var selectedsong =$(this).attr('id');
  playSong(selectedsong);
 });

}
function scheduleSong(id){
 audio.onended = function(){
  console.log('Termino la canciòn');
  playSong(parseInt(id)+1);
 }
}
function shuffle(array){
	for(var random, temp, position = array.length; position; random = Math.floor(Math.random()*position),temp = array[--position], array[position]=array[random], array[random]=temp);
		return array;
		
	
}