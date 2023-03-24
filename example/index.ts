import {DtmfPlayer} from '../src/DtmfPlayer';

let dtmfPlayer: DtmfPlayer;

const startButton = document.getElementById('start');
if (startButton) {
	startButton.onclick = onStart;
}

function onStart() {
	if (!dtmfPlayer) {
		const audioContext = new AudioContext();
		dtmfPlayer = new DtmfPlayer(audioContext);
	}
	const tone = dtmfPlayer.play('1');
	tone.stop(0.5);
}
