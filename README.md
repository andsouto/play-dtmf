# play-dtmf

This is a simple library that allows playing DTMF tones using Web Audio API.
It should work in any browser supporting [Web Audio API](http://caniuse.com/#feat=audio-api).

## Usage

```javascript
import {Dtmf} from 'play-dtmf';
let dtmf = new Dtmf();
dtmf.play('1');
setTimeout(() => {
  dtmf.stop();
  dtmf.close();
});
```

## TODO list

*   Improve tests.
*   Add documentation.
*   Add fallback using a recorded sound (needed to support IE>=9).
