
const headers = new Headers({
    'X-Authorization':
    process.env.ZON_API_KEY,
});


const fetchData = async () => {
    const response = await fetch('http://api.zeit.de/product/zede', { headers });
    return response.json();
};
export default fetchData;

