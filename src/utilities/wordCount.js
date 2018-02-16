/**
 * Count the words in a given string.
 *
 * @param {string} text The string for counting the words.
 * @param {number} [untilIndex]
 *      If given, only the number of words up to the given
 *      character index are counted.
 */
export default function countWords(text, untilIndex = undefined) {
    const cleanedText = text.trim().replace(/\s+/, ' ');
    if (untilIndex >= 0) {
        const lastIndex = text.lastIndexOf(' ', untilIndex);
        return cleanedText.substring(0, lastIndex + 1).split(' ').length;
    }
    return cleanedText.split(' ').length;
}
