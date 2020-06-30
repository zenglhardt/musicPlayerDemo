
var tracklist = ["Let It Happen", "Nangs", "The Moment", "Yes I'm Changing", "Eventually", "Gossip", "The Less I Know The Better", "Past Life", "Disciples", "'Cause I'm A Man"];
var volLevels = [];
var currentVolume, timebar;
var int_id;

function init() {
	timebar = document.getElementById("player-time");
	timebar.max = 180;
	timebar.min = 0;
	timebar.value = 0;
	currentVolume = 3;
	volLevels.push(document.getElementById("vl0"));
	volLevels.push(document.getElementById("vl1"));
	volLevels.push(document.getElementById("vl2"));
	volLevels.push(document.getElementById("vl3"));
	volLevels.push(document.getElementById("vl4"));
	volLevels.push(document.getElementById("vl5"));
	for (let index = 0; index < volLevels.length; index++) {
		if(index < 3){
			volLevels[index].style.backgroundColor = "darkmagenta";
		}
		else{
			volLevels[index].style.backgroundColor = "white";
		}
	}

};

function volUp() {
	if( currentVolume < 6){
		volLevels[currentVolume].style.backgroundColor = "darkmagenta";
		currentVolume = currentVolume + 1;
	}

}

function volDown() {
	if( currentVolume > 0){
		currentVolume = currentVolume - 1;
		volLevels[currentVolume].style.backgroundColor = "white";
	}
}

function switchPlay() {
	let playPause = document.getElementById("play-button");
	if (playPause.innerHTML == "play_arrow"){
		playPause.innerHTML = "stop";
		int_id = setInterval(increment, 1000);
		
	}
	else{
		playPause.innerHTML = "play_arrow";
		clearInterval(int_id);
	}
}


function increment(){
	timebar.value++;
	let incremented_time = document.getElementById("time-elapsed")
	incremented_time.innerHTML = secondsToMs(timebar.value);
	if(timebar.value > 179){
		nextSong()
		timebar.value = 0;
	}
}

function nextSong() {
	let song_title_object = document.getElementById("player-song-name");
	let current_song = song_title_object.innerHTML;
	let new_index
	for (let index = 0; index < tracklist.length; index++) {
		if(tracklist[index] == current_song){
			if(index + 1 == tracklist.length){
				new_index = 0;
			}else{
				new_index = index + 1;
			}
		}
		
	}
	song_title_object.innerHTML = tracklist[new_index];
	timebar.value = 0;
	let incremented_time = document.getElementById("time-elapsed")
	incremented_time.innerHTML = secondsToMs(timebar.value);
}

function prevSong() {
	let song_title_object = document.getElementById("player-song-name");
	let current_song = song_title_object.innerHTML;
	let new_index
	for (let index = 0; index < tracklist.length; index++) {
		if(tracklist[index] == current_song){
			if(index == 0){
				new_index = tracklist.length - 1;
			}else{
				new_index = index - 1;
			}
		}
		
	}
	song_title_object.innerHTML = tracklist[new_index];
	timebar.value = 0;
	let incremented_time = document.getElementById("time-elapsed")
	incremented_time.innerHTML = secondsToMs(timebar.value);
}

function secondsToMs(d) {
    d = Number(d);

    var min = Math.floor(d / 60);
    var sec = Math.floor(d % 60);

    return `0${min}`.slice(-1) + ":" + `00${sec}`.slice(-2);
}

init();