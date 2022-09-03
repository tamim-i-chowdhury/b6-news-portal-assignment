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
        <span class="text-secondary" href="#" onclick="loadNews('${newsCategory.category_id}', '${newsCategory.category_name}')">${newsCategory.category_name}</span>
    `;
    newsCategoryDiv.appendChild(categoryHolder);
  });
};
const loadNews = async (newsId, categoryName) => {
  // start the spinner
  toggleSpinner(true);
  const url = `https://openapi.programming-hero.com/api/news/category/${newsId}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    displayNews(data.data, categoryName);
  } catch (error) {
    console.log(error);
  }
};

const displayNews = (newsData, categoryName) => {
  const newsContainer = document.getElementById("news-conatiner");
  newsContainer.textContent = "";

  // no news found message...
  const noNewsMessage = document.getElementById("no-news");
  if (newsData.length === 0) {
    noNewsMessage.classList.remove("d-none");
  } else {
    noNewsMessage.classList.add("d-none");
  }

  // total news for each catagory
  const totalNewsOfEachCategory = document.getElementById("total-news");
  totalNewsOfEachCategory.innerText = `${newsData.length} items found for category ${categoryName}`;
  newsData.forEach((data) => {
    const newsDiv = document.createElement("div");
    newsDiv.classList.add("row");
    newsDiv.classList.add("mb-4");
    newsDiv.classList.add("h-50", "bg-white");

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
                <h5 class="mt-2">Written By: ${
                  data.author.name ? data.author.name : "Name is not found"
                }</h5>
                <h6>Total Views: ${
                  data.total_view ? data.total_view : "Data is not available"
                }</h6>
                <button class="btn btn-primary" type="submit" data-bs-toggle="modal" data-bs-target="#newsDetailModal" onclick="loadShowNewsDetail('${
                  data._id
                }')">Show Details</button>
            </div>
        </div>
    `;
    newsContainer.appendChild(newsDiv);
  });
  // stop the spinner
  toggleSpinner(false);
};

const toggleSpinner = (isLoading) => {
  const spinnerSection = document.getElementById("spinner-section");
  if (isLoading) {
    spinnerSection.classList.remove("d-none");
  } else {
    spinnerSection.classList.add("d-none");
  }
};

const loadShowNewsDetail = async (id) => {
  try {
    const url = `https://openapi.programming-hero.com/api/news/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayNewsDetailByModal(data.data[0]);
  } catch (error) {
    console.log(error);
  }
};

const displayNewsDetailByModal = (modalData) => {
  console.log(modalData);
  const modalTitle = document.getElementById("newsDetailModalLabel");
  modalTitle.innerText = `${
    modalData.title ? modalData.title : "No title found."
  }`;
  const newsDetail = document.getElementById("news-detail");
  newsDetail.innerText = `${
    modalData.details
      ? modalData.details.slice(0, 200)
      : "No details information found."
  }`;
  const authorName = document.getElementById("author-name");
  authorName.innerText = `Written By - ${
    modalData.author.name ? modalData.author.name : "Not found."
  }`;
  const totalViews = document.getElementById("total-views");
  totalViews.innerText = `Total Views - ${
    modalData.total_view ? modalData.total_view : "Data is not found."
  }`;
};
loadNewsCategories();
