/* eslint-disable class-methods-use-this */
class SpeechSynth {
    constructor() {
        this.synth = window.speechSynthesis;
    }

    play(content) {
        const utterance = new SpeechSynthesisUtterance(content);
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

    get playing() {
        return this.synth.playing;
    }
}

export default new SpeechSynth(); // eslint-disable-line
