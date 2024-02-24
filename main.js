const API_KEY = `8ca46f5c8b624a54badf9b8ccc56354c`;
let newsList = [];
const menus = document.querySelectorAll(".menus button");
menus.forEach(menu => menu.addEventListener("click", (event) => getNewsByCategory(event)));
let url = new URL(`https://sh-times.netlify.app/top-headlines?country=kr&apiKey=${API_KEY}`);
let totalResults = 0;
let page = 1;
const pageSize = 10;
const groupSize = 5;

const getNews = async () => {
    try {
        url.searchParams.set("page", page);
        url.searchParams.set("pageSize", pageSize);
        const response = await fetch(url);
        const data = await response.json();
        if (response.status === 200) {
            if (data.articles.length === 0) {
                throw new Error("No result for this search");
            }
            newsList = data.articles;
            totalResults = data.totalResults;
            render();
            paginationRender();
        } else {
            throw new Error(data.message);
        }
    } catch (error) {
        errorRender(error.message);
    }

}
const getLatestNews = async () => {
    //const url = new URL(`https://sh-times.netlify.app/top-headlines`);
    url = new URL(`https://sh-times.netlify.app/top-headlines?country=kr&apiKey=${API_KEY}`);
    getNews();
}

const getNewsByCategory = async (event) => {
    const category = event.target.textContent.toLowerCase();
    url = new URL(`https://sh-times.netlify.app/top-headlines?country=kr&category=${category}&apiKey=${API_KEY}`);
    getNews();
}

const getNewsByKeyword = async () => {
    const keyword = document.getElementById("search-input").value;
    url = new URL(`https://sh-times.netlify.app/top-headlines?country=kr&q=${keyword}&apiKey=${API_KEY}`);
    getNews();
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


const errorRender = (errorMessage) => {
    const errorHTML = `<div class="alert alert-danger" role="alert">
    ${errorMessage}
  </div>`;
    document.getElementById("news-board").innerHTML = errorHTML;
}

const paginationRender = () => {
    const totalPages = Math.ceil(totalResults / pageSize);
    const pageGroup = Math.ceil(page / groupSize);
    let lastPage = pageGroup * groupSize;
    if (lastPage > totalPages) {
        lastPage = totalPages;
    }

    const firstPage = lastPage - (groupSize - 1) <= 0 ? 1 : lastPage - (groupSize - 1);
    let paginationHTML = ``;

    for (let i = firstPage; i <= lastPage; i++) {
        paginationHTML += `<li class="page-item ${i === page ? "active" : ""}" onclick="moveToPage(${i})"><a class="page-link">${i}</a></li>`;
    }

    document.querySelector(".pagination").innerHTML = paginationHTML;
}

const moveToPage = (pageNum) => {
    page = pageNum;
    getNews();
}

getLatestNews();
