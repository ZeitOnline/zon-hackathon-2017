export function getDefaultName() {
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

export { defaultAudioSettings };

function sortVoices(a, b) {
    return a.lang.localeCompare(b.lang);
}

export function getVoices() {
    return speechSynthesis
        .getVoices()
        .filter(voice => voice.localService)
        .sort(sortVoices);
}