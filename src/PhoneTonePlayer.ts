export type Dtmf = '*' | '#' | '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | 'A' | 'B' | 'C' | 'D';

export interface Tone {
	stop(when?: number): void;
}

export interface Config {
	gain: number;
}

// Tone reference: https://www.etsi.org/deliver/etsi_tr/101000_101099/10104102/01.01.01_60/tr_10104102v010101p.pdf

export class PhoneTonePlayer {
	constructor(private audioContext: AudioContext, private config: Config = {gain: 0.25}) {}

	/**
	 * Reproduces a DTMF tone
	 * @param key The DTMF tone that wants to be played
	 */
	playDtmf(key: Dtmf): Tone {
		switch (key) {
			case '1': return this.playDtmfTone(697, 1209);
			case '2': return this.playDtmfTone(697, 1336);
			case '3': return this.playDtmfTone(697, 1477);
			case '4': return this.playDtmfTone(770, 1209);
			case '5': return this.playDtmfTone(770, 1336);
			case '6': return this.playDtmfTone(770, 1477);
			case '7': return this.playDtmfTone(852, 1209);
			case '8': return this.playDtmfTone(852, 1336);
			case '9': return this.playDtmfTone(852, 1477);
			case '*': return this.playDtmfTone(941, 1209);
			case '0': return this.playDtmfTone(941, 1336);
			case '#': return this.playDtmfTone(941, 1477);
			case 'A': return this.playDtmfTone(697, 1633);
			case 'B': return this.playDtmfTone(770, 1633);
			case 'C': return this.playDtmfTone(852, 1633);
			case 'D': return this.playDtmfTone(941, 1633);
		}
	}

	/**
	 * Reproduces a spanish ringing tone:
	 *  Cadence: 1,5 - 3,0 s
	 *  Period: 4,5 s
	 *  Frequency: 425 Hz
	 */
	playRinging(): Tone {
		return this.playTone([1.5, 4.5], 425);
	}

	/**
	 * Reproduces a spanish busy tone:
	 *  Cadence: 0,2 - 0,2 s
	 *  Period: 0,4 s
	 *  Frequency: 425 Hz
	 */
	playBusyTone(): Tone {
		return this.playTone([0.2, 0.2], 425);
	}

	private createOscillator(frequency: number, type: OscillatorType = 'sine'): OscillatorNode {
		return new OscillatorNode(this.audioContext, {type, frequency});
	}

	private createLFO(onTime: number, offTime: number): AudioBufferSourceNode {
		const period = onTime + offTime;
		const channels = 1;
		const sampleRate = this.audioContext.sampleRate;
		const frameCount = sampleRate * period;
		const arrayBuffer = this.audioContext.createBuffer(channels, frameCount, sampleRate);

		var bufferData = arrayBuffer.getChannelData(0);
		for (let i = 0; i < frameCount; i++) {
			if ((i/sampleRate > 0 && i/sampleRate < onTime)){
				bufferData[i] = this.config.gain;
			}
		}

		const bufferSource = this.audioContext.createBufferSource();
		bufferSource.buffer = arrayBuffer;
    	bufferSource.loop = true;
		return bufferSource;
	}

	private playDtmfTone(freq1: number, freq2: number): Tone {
		const gainNode = new GainNode(this.audioContext, {gain: this.config.gain})
		gainNode.connect(this.audioContext.destination);

		const oscillator1 = this.createOscillator(freq1);
		const oscillator2 = this.createOscillator(freq2);

		oscillator1.connect(gainNode)
		oscillator2.connect(gainNode);

		oscillator1.start();
		oscillator2.start();

		const audioContext = this.audioContext;
		return {
			stop(when = 0): void {
				oscillator2.onended = () => gainNode.disconnect();
				oscillator1.stop(audioContext.currentTime + when);
				oscillator2.stop(audioContext.currentTime + when);
			}
		}
	}

	private playTone(cadence: [number, number], frequency: number): Tone {
		const gainNode = new GainNode(this.audioContext);
		gainNode.connect(this.audioContext.destination);
		gainNode.gain.value = 0;

		const oscillator = this.createOscillator(frequency);
		const lfo = this.createLFO(...cadence);

		lfo.connect(gainNode.gain);
		oscillator.connect(gainNode);

		oscillator.start();
		lfo.start();

		const audioContext = this.audioContext;
		return {
			stop(when = 0): void {
				oscillator.onended = () => gainNode.disconnect();
				lfo.stop(audioContext.currentTime + when);
				oscillator.stop(audioContext.currentTime + when);
			}
		}
	}
}
