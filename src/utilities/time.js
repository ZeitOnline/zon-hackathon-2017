import distanceInWordsStrict from 'date-fns/distance_in_words_strict';
import deLocale from 'date-fns/locale/de';
import format from 'date-fns/format';

export function distanceToNow(date, addSuffix = true) {
    return distanceInWordsStrict(
        Date.now(),
        date,
        {
            addSuffix,
            locale: deLocale,
        },
    );
}

export function formatDate(date, pattern) {
    return format(date, pattern, { locale: deLocale });
}
