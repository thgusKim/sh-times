const API_KEY = `8ca46f5c8b624a54badf9b8ccc56354c`;
let newsList = [];
const menus = document.querySelectorAll(".menus button");
menus.forEach(menu => menu.addEventListener("click", (event) => getNewsByCategory(event)));

const getLatestNews = async () => {
    //const url = new URL(`https://sh-times.netlify.app/top-headlines`);
    const url = new URL(`https://newsapi.org/v2/top-headlines?country=kr&apiKey=${API_KEY}`);
    const response = await fetch(url);
    const data = await response.json();
    newsList = data.articles;
    render();
}

const getNewsByCategory = async (event) => {
    const category = event.target.textContent.toLowerCase();
    const url = new URL(`https://newsapi.org/v2/top-headlines?country=kr&category=${category}&apiKey=${API_KEY}`);
    const response = await fetch(url);
    const data = await response.json();
    newsList = data.articles;
    render();
}

const getNewsByKeyword = async () => {
    const keyword = document.getElementById("search-input").value;
    const url = new URL(`https://newsapi.org/v2/top-headlines?country=kr&q=${keyword}&apiKey=${API_KEY}`);
    const response = await fetch(url);
    const data = await response.json();
    newsList = data.articles;
    render();
}

const render = () => {
    const newsHTML = newsList.map(news => `<div class="row news">
    <div class="col-lg-4">
        <img class="news-img-size" src="${news.urlToImage}">
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

const openNav = () => {
    document.getElementById("mySidenav").style.width = "250px";
};

const closeNav = () => {
    document.getElementById("mySidenav").style.width = "0";
};

const openSearchBox = () => {
    let inputArea = document.getElementById("input-area");
    if (inputArea.style.display === "inline") {
        inputArea.style.display = "none";
    } else {
        inputArea.style.display = "inline";
    }
};

// 1. 버튼들에 클릭 이벤트 주기
// 2. 카테고리별 뉴스 가져오기
// 3. 뉴스 보여주기
