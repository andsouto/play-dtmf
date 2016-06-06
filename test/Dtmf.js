import {Dtmf} from '../';

describe('Dtmf', function() {
	let dtmf;

	beforeEach(() => {
		dtmf = new Dtmf();
		expect(dtmf).to.be.instanceof(Dtmf);
	});

	afterEach(() => {
		dtmf.close();
	});

	it('should play a DTMF during 200ms', (done) => {
		dtmf.playDtmf('1');
		setTimeout(() => {
			dtmf.stop();
			done();
		}, 200);
	});

	it('should stop previous DTMF before starting a new one', (done) => {
		dtmf.playDtmf('2');
		setTimeout(() => {
			dtmf.playDtmf('3');
		}, 100);
		setTimeout(() => {
			dtmf.stop();
			done();
		}, 200);
	});
});
