const searchBox = document.querySelector('.searchBox');
const searchBtn = document.querySelector('.searchBtn');
const recipeContainer = document.querySelector('.receipe-container');
const recipeDetailsContent = document.querySelector('.recipe-details-content');
const recipeCloseBtn = document.querySelector('.recipe-close-btn');

// Fetch Recipes
const fetchRecipes = async (query) => {
    recipeContainer.innerHTML = "<h2>Fetching Recipes...</h2>";

    try {
        const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
        const response = await data.json();

        if (!response.meals) {
            recipeContainer.innerHTML = "<h2>No recipes found!</h2>";
            return;
        }

        recipeContainer.innerHTML = "";

        response.meals.forEach(meal => {
            const recipeDiv = document.createElement('div');
            recipeDiv.classList.add('recipe');
            recipeDiv.innerHTML = `
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                <h3>${meal.strMeal}</h3>
                <button class="view-recipe" data-id="${meal.idMeal}">View Details</button>
            `;
            recipeContainer.appendChild(recipeDiv);
        });

    } catch (error) {
        recipeContainer.innerHTML = "<h2>Error fetching recipes. Try again!</h2>";
        console.error("Error fetching recipes:", error);
    }
};

// Fetch Ingredients
const fetchIngredients = (meal) => {
    let ingredientsList = "";
    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        if (ingredient) {
            const measure = meal[`strMeasure${i}`] || "";
            ingredientsList += `<li>${measure} ${ingredient}</li>`;
        } else {
            break;
        }
    }
    return ingredientsList;
};

// Open Recipe Details Popup
const openRecipePopup = (meal) => {
    recipeDetailsContent.innerHTML = `
        <h2 class="recipeName">${meal.strMeal}</h2>
        <h3>Ingredients:</h3>
        <ul class="IngredientList">${fetchIngredients(meal)}</ul>
        <div class="recipeInstructions">
           <h3>Instructions:</h3>
           <p class="recipeinstructions">${meal.strInstructions}</p>
        </div>
    `;
    
    recipeDetailsContent.parentElement.style.display = "block";
};

// Close Recipe Popup
recipeCloseBtn.addEventListener('click', () => {
   recipeDetailsContent.parentElement.style.display = "none";
});

// Listen for Clicks on View Recipe Buttons
document.addEventListener("click", async function (event) {
    if (event.target.classList.contains("view-recipe")) {
        const mealId = event.target.getAttribute("data-id");

        try {
            const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
            const data = await response.json();
            
            if (data.meals) {
                openRecipePopup(data.meals[0]);
            } else {
                console.error("Recipe details not found.");
            }
        } catch (error) {
            console.error("Error fetching recipe details:", error);
        }
    }
});

// Search Button Event Listener
searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const searchInput = searchBox.value.trim();
    if (searchInput) {
        fetchRecipes(searchInput);
    } else {
        recipeContainer.innerHTML = "<h2>Please enter a recipe name!</h2>";
    }
});

