const API_KEY = `8ca46f5c8b624a54badf9b8ccc56354c`;
let news = [];
const getLatestNews = async () => {
    const url = new URL(`https://sh-times.netlify.app/top-headlines`);
    const response = await fetch(url);
    const data = await response.json();
    news = data.articles;
    console.log("ddd", news);
}

getLatestNews();