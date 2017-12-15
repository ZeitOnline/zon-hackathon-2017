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
