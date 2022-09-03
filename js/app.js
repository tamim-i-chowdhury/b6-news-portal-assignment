const loadNewsCategories = () => {
  fetch("https://openapi.programming-hero.com/api/news/categories")
    .then((res) => res.json())
    .then((data) => displayNewsCategory(data.data.news_category))
    .catch((error) => console.log(error));
};

const displayNewsCategory = (newsCategories) => {
  //   console.log(newsCatagory);
  const newsCategoryDiv = document.getElementById("news-category-container");
  newsCategories.forEach((newsCategory) => {
    // console.log(newsCategory.category_name);
    const categoryHolder = document.createElement("span");
    categoryHolder.classList.add("category");
    categoryHolder.innerHTML = `
        <span class="text-secondary" href="#" onclick="loadNews('${newsCategory.category_id}')">${newsCategory.category_name}</span>
    `;
    newsCategoryDiv.appendChild(categoryHolder);
  });
};
const loadNews = async (newsId) => {
  const url = `https://openapi.programming-hero.com/api/news/category/${newsId}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    displayNews(data.data);
  } catch (error) {
    console.log(error);
  }
};

const displayNews = (newsData) => {
  const newsContainer = document.getElementById("news-conatiner");
  newsContainer.textContent = "";

  // no news found message...
  const noNewsMessage = document.getElementById("no-news");
  if (newsData.length === 0) {
    noNewsMessage.classList.remove("d-none");
  } else {
    noNewsMessage.classList.add("d-none");
  }
  newsData.forEach((data) => {
    const newsDiv = document.createElement("div");
    newsDiv.classList.add("row");
    newsDiv.classList.add("mb-4");
    newsDiv.classList.add("h-50");
    newsDiv.innerHTML = `
        <div class="col-md-3">
            <img src="${
              data.thumbnail_url
            }" class="img fluid w-100" alt="..." />
        </div>
        <div class="col-md-9">
            <div class="card-body py-5">
                <h3 class="card-title">${data.title}</h3>
                <p class="card-text mt-4">
                ${data.details.slice(0, 350)}
                </p>
                <h5 class="mt-2">Written By: ${data.author.name}</h5>
                <h6>Total Views: ${data.total_view}</h6>
                <button class="btn btn-primary" type="submit">Show Details</button>
            </div>
        </div>
    `;
    newsContainer.appendChild(newsDiv);
  });
};
loadNewsCategories();
