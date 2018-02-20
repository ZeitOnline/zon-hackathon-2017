import { TEASER } from 'app/shapes';

const headers = new Headers({
    'X-Authorization':
    process.env.ZON_API_KEY,
});


const fetchData = async () => {
    if (!IS_PRODUCTION) {
        const fields = Object.keys(TEASER).join(',');
        const uri = `http://api.zeit.de/product/zede?fields=${fields}`;
        const response = await fetch(uri, { headers });
        return response.json();
    }
    return testJSON;
};

const testJSON = {
    matches: [
        {
            body: 'Ein zwei drei vier fünf sechs sieben acht neun zehn Ein zwei drei vier fünf sechs sieben acht neun zehn Ein zwei drei vier fünf sechs sieben acht neun zehn Ein zwei drei vier fünf sechs sieben acht neun zehn Ein zwei drei vier fünf sechs sieben acht neun zehn Ein zwei drei vier fünf sechs sieben acht neun zehn Ein zwei drei vier fünf sechs sieben acht neun zehn Ein zwei drei vier fünf sechs sieben acht neun zehn Ein zwei drei vier fünf sechs sieben acht neun zehn Ein zwei drei vier fünf sechs sieben acht neun zehn.',
            uuid: 'test1',
            title: 'Testtitel 1',
            href: 'http://www.zeit.de/kultur/film/2018-02/dieter-wedel-sexuelle-uebergriffe-zdf',
            release_date: '2018-02-15T12:20:19Z',
            supertitle: 'Testkicker',
            teaser_text: 'langer Text',
        },
        {
            body: 'Ein zwei drei vier fünf sechs sieben acht neun zehn',
            uuid: 'test2',
            title: 'Testtitel 2',
            href: 'http://www.zeit.de/kultur/film/2018-02/dieter-wedel-sexuelle-uebergriffe-zdf',
            release_date: '2018-02-15T12:20:19Z',
            supertitle: 'Testkicker',
            teaser_text: 'Ein zwei drei vier fünf sechs sieben acht neun zehn',
        },
        {
            body: 'Ein zwei drei vier fünf sechs sieben acht neun zehn',
            uuid: 'test3',
            title: 'Testtitel 3',
            href: 'http://www.zeit.de/kultur/film/2018-02/dieter-wedel-sexuelle-uebergriffe-zdf',
            release_date: '2018-02-15T12:20:19Z',
            supertitle: 'Testkicker',
            teaser_text: 'Ein zwei drei vier fünf sechs sieben acht neun zehn',
        },
        {
            body: 'Ein zwei drei vier fünf sechs sieben acht neun zehn',
            uuid: 'test4',
            title: 'Testtitel 4',
            href: 'http://www.zeit.de/kultur/film/2018-02/dieter-wedel-sexuelle-uebergriffe-zdf',
            release_date: '2018-02-15T12:20:19Z',
            supertitle: 'Testkicker',
            teaser_text: 'Ein zwei drei vier fünf sechs sieben acht neun zehn',
        },
    ],
};

export default fetchData;
