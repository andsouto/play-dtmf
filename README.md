# play-dtmf

This is a simple library that allows playing DTMF and ringing tones using Web Audio API.
It should work in any browser supporting [Web Audio API](http://caniuse.com/#feat=audio-api).

## Usage

```javascript
import {PhoneTonePlayer} from 'play-dtmf';
const audioContext = new AudioContext();
const phoneTonePlayer = new PhoneTonePlayer(audioContext);
const tone = phoneTonePlayer.playDtmf('1');
tone.stop(1000)
```

## TODO list

*   Improve tests.
*   Improve documentation.
