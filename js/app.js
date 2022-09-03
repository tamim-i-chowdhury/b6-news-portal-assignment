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
    console.log(newsCategory.category_name);
    const categoryHolder = document.createElement("span");
    categoryHolder.classList.add("category");
    categoryHolder.innerHTML = `
        <span class="text-secondary" href="#">${newsCategory.category_name}</span>
    `;
    newsCategoryDiv.appendChild(categoryHolder);
  });
};
loadNewsCategories();
