/**
 * Count the words in a given string.
 *
 * @param {string} text The string for counting the words.
 * @param {number} [untilIndex]
 *      If given, only the number of words up to the given
 *      character index are counted.
 */
export function countWords(text, untilIndex = undefined) {
    const cleanedText = text.trim().replace(/\s+/, ' ');
    if (untilIndex >= 0) {
        const lastIndex = text.lastIndexOf(' ', untilIndex);
        return cleanedText.substring(0, lastIndex + 1).split(' ').length;
    }
    return cleanedText.split(' ').length;
}

/**
 * Get an estimated reading time for a given number of words, based
 * on the average words per minute when reading aloud in German of
 * about 145 words/min.
 *
 * @see https://de.wikipedia.org/wiki/Lesegeschwindigkeit#Lesen_von_Texten
 * @param {number} wordCount The number of words in the text.
 * @param {number} [speechRate] Factor of how much the default speech
 *      rate is reduced or increased.
 * @returns {number} The estimated reading time in miliseconds.
 */
export function estimatedReadingTime(wordCount, speechRate = 1) {
    const avgWordsPerMs = 145 / 60 / 1000;
    return Math.ceil(wordCount / (avgWordsPerMs * speechRate));
}
