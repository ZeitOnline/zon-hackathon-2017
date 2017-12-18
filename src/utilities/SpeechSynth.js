class SpeechSynth {
    constructor() {
        this.synth = window.speechSynthesis;
    }

    play(utterance, id) {
        this.id = id;
        this.synth.cancel();
        this.synth.speak(utterance);
    }

    pause() {
        this.synth.pause();
    }

    resume() {
        this.synth.resume();
    }

    cancel() {
        this.synth.cancel();
    }

    get paused() {
        return this.synth.paused;
    }

    get speaking() {
        return this.synth.speaking;
    }
}

export default new SpeechSynth();

function getDefaultName() {
    const voices = speechSynthesis.getVoices();
    const defaultVoice = voices.find(voice => voice.default);

    return defaultVoice ? defaultVoice.name : '';
}

const utterance = new SpeechSynthesisUtterance('');
const defaultAudioSettings = {
    name: getDefaultName(),
    rate: utterance.rate.toString(),
    pitch: utterance.pitch.toString(),
    volume: utterance.volume.toString(),
};

// Fix Chrome - still cheesy
if (!defaultAudioSettings.name) {
    speechSynthesis.addEventListener('voiceschanged', () => {
        defaultAudioSettings.name = getDefaultName();
    });
}

export { defaultAudioSettings };
