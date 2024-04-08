const searchBox = document.querySelector('#searchInput');
const searchBtn = document.querySelector('.search_btn');
const recipecontainer = document.querySelector('#recipeCards');
const recipeDetails = document.querySelector('#recipe-details');
const btnClose = document.querySelector('.btn-close');

// Function to fetch recipes
const fetchRecipe = async (query) => {
    try {
        const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
        const response = await data.json();
        if (response.meals) {
            response.meals.forEach(meal => {
                // console.log(meal)
                const recipeDiv = document.createElement('div');
                recipeDiv.classList.add('col-lg-4');

                recipeDiv.innerHTML = `
                    <div class="card">
                        <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">${meal.strMeal}</h5>
                            <p class="card-text">${meal.strArea}</p>
                        </div>
                    </div>
                `;

                //append btn for model open to see full details of recipe

                const button = document.createElement('button');
                button.textContent = 'View recipe';
                const cardDiv = recipeDiv.querySelector('.card');
                cardDiv.appendChild(button);

                button.addEventListener('click', () => {
                    openrecipePopup(meal);
                });

                recipecontainer.appendChild(recipeDiv);
            });
        } else {
            recipecontainer.innerHTML = "<p>No recipes found.</p>";
        }
    } catch (error) {
        console.error('Error fetching recipes:', error);
    }
};
//function to fetch Ingreent and measurements
const fetchIngreents = (meal) =>{
  let ingredientList  = "";
  for (let i=1; i<=20; i++){
    const ingredient = meal[`strIngredient${i}`];

    if (ingredient){
        const mesure  = meal[`strMeasure${i}`];
        ingredientList += `<li> ${mesure} ${ingredient}</li>`

    }
    else{
        break;
    }

  }
  return ingredientList;
}

const openrecipePopup = (meal) => {
    recipeDetails.innerHTML = `
        <div class="popupheader-box">
            <h2>${meal.strMeal}</h2>
        </div>
        <div class="popupbody-box">
            <h3>Ingredient:</h3>
            <ul>${fetchIngreents(meal)}</ul>
            <div>
            <h3> Instructions</h3>
                <p>${meal.strInstructions}</p>
            </div>
        </div>
    `;
    recipeDetails.parentElement.style.display = "block";
};

btnClose.addEventListener('click', ()=>{
    recipeDetails.parentElement.style.display = "none";

})


searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const searchInput = searchBox.value.trim();
    if (searchInput !== "") {
        recipecontainer.innerHTML = ""; // Clear previous search results
        fetchRecipe(searchInput);
    } else {
        alert("Please enter a search term.");
    }
});
