import { getVoices, defaultAudioSettings, getDefaultVoice } from 'app/utilities';

export const UPDATE_AUDIO_SETTINGS = 'UPDATE_AUDIO_SETTINGS';
export const RESET_AUDIO_SETTINGS = 'RESET_AUDIO_SETTINGS';

export function updateAudioSettings(settings) {
    return {
        type: UPDATE_AUDIO_SETTINGS,
        payload: settings,
    };
}

export function resetAudioSettings() {
    return {
        type: RESET_AUDIO_SETTINGS,
        payload: {
            ...defaultAudioSettings,
            voiceList: getVoices(),
            voice: getDefaultVoice(),
        },
    };
}
