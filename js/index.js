const app={
    init:()=>{
        document.addEventListener('DOMContentLoaded',app.load);
        console.log('HTML LOADED');
    },
    load:()=>{
        //the page has finished loading its HTML
        app.showLoading();
        app.getData();
    },
    showLoading:()=>{
        console.log("loading");
    },
    getData:()=>{
        //based on the current page youre at right now
        let page=document.body.id;
        switch(page){
            case 'index':
                app.detectSearch();
                break;
            case 'search':
                app.getResponse();
                break;
            case 'recipe':
                app.getRecipeInfo();
                break;
        }
    },
    detectSearch:()=>{
        const body=document.querySelector("body");
        const searchPanel=document.querySelector(".search");
        const openSearch=document.querySelector(".openSearch-btn");
        const searchBtn=document.querySelector(".submit-btn");
        const closeSearch=document.querySelector(".crossbtn");
       
        openSearch.addEventListener('click',()=>{
            searchPanel.style.height="100vh";
            body.style.overflow="hidden";
        });
        closeSearch.addEventListener('click',()=>{
            searchPanel.style.height="0vh";
        });
        searchBtn.addEventListener('click',(e)=>{
            e.preventDefault();
            let query=document.querySelector(".searchQuery").value;
            //console.log(query);
            localStorage.setItem("menu",query);
            location.href='search.html';

        });
        

    },

    getResponse:async ()=>{
        var queryString=localStorage.getItem("menu");
        var response= await fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${queryString}&apiKey=7519e0106e38451fb4321c7ea80f0035`);
        var data=await response.json();
        app.showResponse(data);
    },
    showResponse:(responses)=>{
        //console.log(responses);
        const recipeList=document.querySelector(".search_result");
        //var recipeClick=document.querySelector(".recipe_info");
        var recipes=responses.results;

      
        for (let i=0;i<recipes.length;i++){
            var ID=recipes[i].id;
            //app.getRecipeInfo(ID);
            var image=recipes[i].image;
            var title=recipes[i].title;
            var recipeDiv=document.createElement("div");
            recipeDiv.classList.add("recipe");
            var recipe_detail=document.createElement("a");
            recipe_detail.classList.add("recipe_info");
            recipe_detail.classList.add(ID);
            recipe_detail.href="#";
            recipeDiv.appendChild(recipe_detail);
            var recipeImg=document.createElement("img");
            recipeImg.classList.add("recipe_img");
            recipeImg.classList.add(ID);
            recipeImg.src=(image);
            recipeDiv.appendChild(recipeImg);
            recipeList.appendChild(recipeDiv);
            var recipeTitle=document.createElement("p");
            recipeTitle.classList.add("recipe_title");
            recipeTitle.classList.add(ID);
            recipeTitle.innerText=title;
            recipe_detail.appendChild(recipeImg);
            recipe_detail.appendChild(recipeTitle);
        }
        document.addEventListener('click',(e)=>{
            var id=e.target.classList[1];
            localStorage.setItem("id",id);
            location.href='recipe.html';
        })


    },
    getRecipeInfo:async ()=>{
        var ID=localStorage.getItem("id");
        var response2=await fetch(`https://api.spoonacular.com/recipes/${ID}/information?includeNutrition=false&apiKey=7519e0106e38451fb4321c7ea80f0035`);
        var data2=await response2.json();
        //console.log(data2);
        var recipeInfos=document.querySelectorAll(".recipe");
        app.showRecipeInfo(data2);
    },
    showRecipeInfo:(data2)=>{
       var type=document.querySelector(".dish_types");
       var title=document.querySelector(".recipeTitle");
       var like=document.querySelector(".likes");
       var img=document.querySelector(".recipeImg");
       var summary=document.querySelector(".recipe-summary");


       like.innerText="LIKES: "+data2.aggregateLikes;
       title.innerText=data2.title;
       img.src=data2.image;
       type.innerText=data2.dishTypes;
       summary.innerHTML="<p>"+data2.summary+"</p>";

    }
    
}
app.init();