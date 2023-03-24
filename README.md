# play-dtmf

This is a simple library that allows playing DTMF tones using Web Audio API.
It should work in any browser supporting [Web Audio API](http://caniuse.com/#feat=audio-api).

## Usage

```javascript
import {DtmfPlayer} from 'play-dtmf';
const audioContext = new AudioContext();
const dtmfPlayer = new DtmfPlayer(audioContext);
const tone = dtmfPlayer.play('1');
tone.stop(1000)
```

## TODO list

*   Improve tests.
*   Add documentation.
