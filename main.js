const API_KEY = `8ca46f5c8b624a54badf9b8ccc56354c`;
let newsList = [];
const getLatestNews = async () => {
    const url = new URL(`https://sh-times.netlify.app/top-headlines`);
    const response = await fetch(url);
    const data = await response.json();
    newsList = data.articles;
    render();
    console.log("ddd", newsList);
}

const render = () => {
    const newsHTML = newsList.map(news => `<div class="row news">
    <div class="col-lg-4">
        <img src="${news.urlToImage}">
    </div>
    <div class="col-lg-8">
        <h2>${news.title}</h2>
        <p>${news.description}</p>
        <div>${news.source.name} * ${news.publishedAt}</div>
    </div>
</div>`).join('');

    document.getElementById("news-board").innerHTML = newsHTML;
}

getLatestNews();
