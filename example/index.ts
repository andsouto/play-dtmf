import {PhoneTonePlayer, Tone} from '../src/PhoneTonePlayer.js';

let _phoneTonePlayer: PhoneTonePlayer;

function getPhoneTonePlayer(): PhoneTonePlayer {
	if (!_phoneTonePlayer) {
		const audioContext = new AudioContext();
		_phoneTonePlayer = new PhoneTonePlayer(audioContext);
	}
	return _phoneTonePlayer;
}

// Button handlers //
/////////////////////

const dtmfButton = document.getElementById('dtmf');
if (dtmfButton) {
	dtmfButton.onclick = playDtmf;
}

const ringingButton = document.getElementById('ringing');
if (ringingButton) {
	ringingButton.onclick = playRinging;
}

const stopRingingButton = document.getElementById('stop-ringing');
if (stopRingingButton) {
	stopRingingButton.onclick = stopRinging;
}

// DTMF //
//////////

function playDtmf() {
	const phoneTonePlayer = getPhoneTonePlayer();
	const tone = phoneTonePlayer.playDtmf('1');
	tone.stop(0.5);
}


// Ringing //
/////////////

let ringingTone: Tone | undefined;
function playRinging() {
	const phoneTonePlayer = getPhoneTonePlayer();
	ringingTone = phoneTonePlayer.playRinging();
}

function stopRinging() {
	ringingTone?.stop();
}
