const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
const results = document.getElementById("results");

searchBtn.addEventListener("click", () => {
  const query = searchInput.value.trim();
  if(query === "") {
    results.innerHTML = "<p>Please enter a search term.</p>";
    return;
  }
  fetchRecipes(query);
});

searchInput.addEventListener("keypress", (e) => {
  if(e.key === "Enter") {
    searchBtn.click();
  }
});

function fetchRecipes(query) {
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`;
  
  fetch(url)
    .then(res => res.json())
    .then(data => {
      if(!data.meals) {
        results.innerHTML = "<p>No recipes found. Try another search.</p>";
        return;
      }
      displayRecipes(data.meals);
    })
    .catch(() => {
      results.innerHTML = "<p>Error fetching recipes. Please try again later.</p>";
    });
}

function displayRecipes(meals) {
  results.innerHTML = meals.map(meal => `
    <div class="recipe">
      <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
      <h3>${meal.strMeal}</h3>
      <p><strong>Category:</strong> ${meal.strCategory}</p>
      <p><strong>Area:</strong> ${meal.strArea}</p>
      <a href="${meal.strSource || '#'}" target="_blank">View Recipe</a>
    </div>
  `).join("");
}
