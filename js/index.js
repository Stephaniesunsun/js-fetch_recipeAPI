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
                app.allRecipes();
            case 'search':
                app.detectSearchMore();
                app.getResponse();
                break;
            case 'recipe':
                app.getRecipeInfo();
                break;
        }
    },
    detectSearch:()=>{
        const body=document.querySelector("body");
        const searchPanel=document.querySelector(".search_form");
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
    allRecipes:async()=>{
        var response=await fetch(`https://api.spoonacular.com/recipes/complexSearch?query=&apiKey=7519e0106e38451fb4321c7ea80f0035`);
        var data=await response.json();
        app.showAllRecieps(data);
    },
    showAllRecieps:(data)=>{
        
        for (var i=0;i<data.results.length;i++){
            //console.log(data.results[i]);
            const index_body=document.querySelector(".body");
            var index_recipe=document.createElement("div");
            index_recipe.classList.add("index-recipe");
            index_recipe.classList.add(data.results[i].id);
            index_body.appendChild(index_recipe);
            var index_img=document.createElement("img");
            index_img.src=data.results[i].image;
            index_recipe.appendChild(index_img);
            var index_title=document.createElement("p");
            index_title.classList.add("index_recipeTitle");
            index_title.innerText=data.results[i].title;
            index_recipe.appendChild(index_title);
            var index_button=document.createElement("button");
            index_button.classList.add("recipe-btn");
            index_button.innerText="SEE RECIPE";
            index_recipe.appendChild(index_button);     
        }
        var recipeBtns=document.querySelectorAll(".recipe-btn");
        recipeBtns.forEach(recipeBtn=>{
            recipeBtn.addEventListener('click',(e)=>{
            var id=e.target.parentNode.classList[1];
            //console.log(e.target.parentNode);
            localStorage.setItem("id",id);
            location.href='recipe.html';
        });
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
        var returnbtn=document.querySelector(".fa-chevron-left");
      
        for (let i=0;i<recipes.length;i++){
            var ID=recipes[i].id;
            //app.getRecipeInfo(ID);
            var image=recipes[i].image;
            var title=recipes[i].title;
            var recipeDiv=document.createElement("div");
            recipeDiv.classList.add("recipe");
            recipeDiv.classList.add(ID);
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
        var recipeLinks=document.querySelectorAll(".recipe");
        recipeLinks.forEach(recipelink=>{
            recipelink.addEventListener('click',(e)=>{
                var id=e.target.classList[1];
                //console.log(id);
                localStorage.setItem("id",id);
                location.href='recipe.html';
            })
        });
        returnbtn.addEventListener('click',()=>{
            history.back();
            //location.href="index.html";
        });
    },
    detectSearchMore:()=>{
        var searchbtn=document.querySelector(".filter-search");
        var searchcontent=document.querySelector(".search-content");
        
        searchbtn.addEventListener('click',(e)=>{
            e.preventDefault();
            console.log('click');
            localStorage.setItem("menu",searchcontent.value);
            location.href="search.html";
        });
        

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
       var returnbtn=document.querySelector(".hamburger");
       var title=document.querySelector(".recipeTitle");
       var like=document.querySelector(".likes");
       var img=document.querySelector(".recipeImg");
       var summary=document.querySelector(".recipe-summary");

        returnbtn.addEventListener('click',()=>{
            history.back();
        });
       like.innerText="LIKES: "+data2.aggregateLikes;
       title.innerText=data2.title;
       img.src=data2.image;
       type.innerText=data2.dishTypes;
       summary.innerHTML="<p>"+data2.summary+"</p>";

    }
    
}
app.init();