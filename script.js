
const app_id = '84929276';
const app_key = '4aadf4cde1e048f303d049b80c6fd268';
const searchResult = document.querySelectorAll('.searchResult');
searchForm  = document.querySelector('form');
let searchQuery ='';
const container = document.querySelector('.container'); 

searchForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    searchQuery = e.target.querySelector('input').value;
    recipeFinder();
});

async function recipeFinder(){
    const baseURL =`https://api.edamam.com/search?q=${searchQuery}&app_id=${app_id}&app_key=${app_key}&to=20`;
    const response = await fetch(baseURL);
    const data = await response.json(); 
    generateHTML(data.hits);
}

function generateHTML(results){
    let generatedHTML = ''; 
    results.map(result => {
        generatedHTML += `
            <div class="card mb-lg-5 mb-sm-3" id="item" style="width: 18rem;">
                <img src="${result.recipe.image}"  class="card-img-top" alt="${result.recipe.label}">
                <div class="card-body">
                    <h5 class="card-title">${result.recipe.label}</h5>
                    <p class="card-text">Calories: ${(result.recipe.calories).toFixed(2)}</p>
                    <a id="recipe_btn" href="${result.recipe.url} target="_blank" class="btn"> Recipe Details</a>
                </div>
            </div>
        `;
    });
    searchResult.forEach(div => {
        div.innerHTML = generatedHTML; 
    });
}
