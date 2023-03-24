import {expect} from 'chai';

import {DtmfPlayer} from './DtmfPlayer.js';


describe('DtmfPlayer', function() {
	let dtmfPlayer: DtmfPlayer;
	let audioContext: AudioContext;

	beforeEach(() => {
		audioContext = new AudioContext();
		dtmfPlayer = new DtmfPlayer(audioContext);
		expect(dtmfPlayer).to.be.instanceof(DtmfPlayer);
	});

	afterEach(() => {
		audioContext.close();
	});

	it('should play a DTMF during 200ms', (done) => {
		const {stop} = dtmfPlayer.play('1');
		setTimeout(() => {
			stop();
			done();
		}, 200);
	});

	it('should play two DTMF tones simultaneously', (done) => {
		const tone1 = dtmfPlayer.play('2');
		const tone2 = dtmfPlayer.play('3');
		tone1.stop(200);
		tone2.stop(300);
		setTimeout(() => {
			done();
		}, 300)
	});
});
