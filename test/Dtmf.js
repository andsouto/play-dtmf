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
		},200);
	});
});
