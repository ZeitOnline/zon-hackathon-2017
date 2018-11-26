export function getDefaultVoice() {
    const voices = speechSynthesis.getVoices();
    const defaultVoice = voices.find(voice => voice.default);

    return defaultVoice ? defaultVoice.name : '';
}

const utterance = new SpeechSynthesisUtterance('');

// NOTE: voice will be populated with default voice *after* getVoices
// is available (i. e. when onvoiceschanged is triggered)
export const defaultAudioSettings = {
    voice: getDefaultVoice(),
    rate: utterance.rate,
    pitch: utterance.pitch,
    volume: utterance.volume,
};


function sortVoices(a, b) {
    return a.lang.localeCompare(b.lang);
}

export function getVoices() {
    return speechSynthesis
        .getVoices()
        .filter(voice => voice.localService)
        .sort(sortVoices);
}
