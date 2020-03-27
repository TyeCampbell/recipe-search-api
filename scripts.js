
function handleError(error) {
    const errorMessage = `Opps! Looks like there was an error. ${error}`;
    console.log(errorMessage);
}

const baseEndPoint = `http://www.recipepuppy.com/api/`;
const proxy = `https://cors-anywhere.herokuapp.com/`;
const formButton = document.querySelector('form.search button');
const recipesGrid = document.querySelector('.recipes');

async function fetchRecipes(query) { 

    const response = await fetch(`${proxy}${baseEndPoint}?q=${query}`);
    const data = await response.json();
    return data;
}

async function handleSubmit(event) {
    event.preventDefault();
    formButton.textContent = "Serving up some recipes... Please wait."
    formButton.disabled = true;
    const queryItem = event.currentTarget.parentElement.query.value;
    const recipes = await fetchRecipes(queryItem).catch(handleError);
    formButton.disabled = false;
    formButton.textContent = "Submit"
    displayRecipes(recipes.results);
}

function displayRecipes(recipes){
    const html = recipes.map( 
        recipe => 
        `<div class="recipe">
            <h2>${recipe.title}</h2>
            ${recipe.thumbnail && `<img src="${recipe.thumbnail}" alt="${recipe.title}"/>`}
            <p>${recipe.ingredients}</p>
            <a href="${recipe.href}">View Recipe →</a>
        </div>`
    )
    recipesGrid.innerHTML = html.join('');
}   

formButton.addEventListener('click', handleSubmit);



