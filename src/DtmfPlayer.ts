export type Dtmf = '*' | '#' | '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | 'A' | 'B' | 'C' | 'D';

export interface DtmfTone {
	stop(when?: number): void;
}

export class DtmfPlayer {
	constructor(private audioContext: AudioContext) {}

	play(key: Dtmf): DtmfTone {
		switch (key) {
			case '1': return this.playTone(697, 1209);
			case '2': return this.playTone(697, 1336);
			case '3': return this.playTone(697, 1477);
			case '4': return this.playTone(770, 1209);
			case '5': return this.playTone(770, 1336);
			case '6': return this.playTone(770, 1477);
			case '7': return this.playTone(852, 1209);
			case '8': return this.playTone(852, 1336);
			case '9': return this.playTone(852, 1477);
			case '*': return this.playTone(941, 1209);
			case '0': return this.playTone(941, 1336);
			case '#': return this.playTone(941, 1477);
			case 'A': return this.playTone(697, 1633);
			case 'B': return this.playTone(770, 1633);
			case 'C': return this.playTone(852, 1633);
			case 'D': return this.playTone(941, 1633);
		}
	}

	private playTone(freq1: number, freq2: number): DtmfTone {
		const gainNode = this.audioContext.createGain();
		gainNode.gain.value = .1;

		const oscillator1 = this.audioContext.createOscillator();
		oscillator1.type = 'sine';
		oscillator1.frequency.value = freq1;
		oscillator1.connect(gainNode);

		const oscillator2 = this.audioContext.createOscillator();
		oscillator2.type = 'sine';
		oscillator2.frequency.value = freq2;
		oscillator2.connect(gainNode);

		gainNode.connect(this.audioContext.destination);

		oscillator1.start();
		oscillator2.start();

		return {
			stop(when = 0): void {
				oscillator2.onended = () => gainNode.disconnect();
				oscillator1.stop(when);
				oscillator2.stop(when);
			}
		}
	}
}
