document.addEventListener('DOMContentLoaded', async () => {

const NEWS_DISPLAY = 3;
const NEWS_PATH = "https://kkolodziej-dev.github.io/imcspoland/entities/news/news.json";

let newsContainer = document.getElementById("newsContent");

setNewsArray();

async function setNewsArray() {
    let lJson = await Promise.resolve(
        fetch(NEWS_PATH)
            .then(response => response.json())
            .then(data => data));

    NEWS_DISPLAY = lJson.display;

    for (let i = 0; i <= NEWS_DISPLAY; i++) {
        let lDiv = document.createElement("div");

        let lH3 = document.createElement("h3");
        lH3.innerText = lJson.news[i].title;
        lDiv.appendChild(lH3);

        let lP = document.createElement("p");
        lP.innerText = lJson.news[i].content;
        lDiv.appendChild(lP);

        let lSpan = document.createElement("span");
        lSpan.className = "newsDate";
        lSpan.innerText = lJson.news[i].date;
        lDiv.appendChild(lSpan);

        newsContainer.appendChild(lDiv);
    }

}
})