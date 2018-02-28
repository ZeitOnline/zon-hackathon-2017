import { TEASER } from 'app/shapes';
import demoJSON from './demo.json';

const headers = new Headers({
    'X-Authorization':
    process.env.ZON_API_KEY,
});

const fetchData = async () => {
    const fields = Object.keys(TEASER).join(',');
    const uri = IS_PRODUCTION ? demoJSON : `http://api.zeit.de/product/zede?fields=${fields}`;
    const response = await fetch(uri, { headers });
    return response.json();
};

export default fetchData;
