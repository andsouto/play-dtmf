import {expect} from 'chai';

import {PhoneTonePlayer} from './PhoneTonePlayer.js';


describe('DtmfPlayer', function() {
	let phoneTonePlayer: PhoneTonePlayer;
	let audioContext: AudioContext;

	beforeEach(() => {
		audioContext = new AudioContext();
		phoneTonePlayer = new PhoneTonePlayer(audioContext);
		expect(phoneTonePlayer).to.be.instanceof(PhoneTonePlayer);
	});

	afterEach(() => {
		audioContext.close();
	});

	it('should play a DTMF during 200ms', (done) => {
		const {stop} = phoneTonePlayer.playDtmf('1');
		setTimeout(() => {
			stop();
			done();
		}, 200);
	});

	it('should play two DTMF tones simultaneously', (done) => {
		const tone1 = phoneTonePlayer.playDtmf('2');
		const tone2 = phoneTonePlayer.playDtmf('3');
		tone1.stop(200);
		tone2.stop(300);
		setTimeout(() => {
			done();
		}, 300)
	});
});
