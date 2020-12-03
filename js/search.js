//index.html
const searchPanel=document.querySelector(".search");
const openSearch=document.querySelector(".openSearch-btn");
const whole=document.querySelector("body");
const searchBtn=document.querySelector(".submit-btn");
const inputSearch=document.querySelector(".searchQuery");

//search.html
const resultContainer=document.querySelector(".search_result");
const searchContent=document.querySelector(".search-content");


openSearch.addEventListener('click',showSearch);
searchBtn.addEventListener('click',setUp);


function showSearch(event){
    searchPanel.style.height="100vh";
    whole.style.overflow="hidden";
}

function setUp(event){
    event.preventDefault();
    
    //console.log(query);
    getRecipe()
    .then(results=>{
        location.href="search.html";
        showRecipe(results.title,results.image);
        
    })
    .catch(err=>console.err)
}
async function getRecipe(){
    const query=inputSearch.value.toString();
    let response=await fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=7519e0106e38451fb4321c7ea80f0035`);
    let result=await response.json();
    console.log(result.results[0].title);
   
    return {
        title:result.results[0].title,
        image:result.results[0].image
    }
    
    //console.log(result);
}

function showRecipe(title,image){
    searchContent.placeholder=inputSearch.value;
    console.log(searchContent);
    resultContainer.innerHTML="<p>${title}</p>";
}

