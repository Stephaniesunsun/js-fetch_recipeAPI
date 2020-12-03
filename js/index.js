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
                app.getResponse()
                break;
        }
    },
    detectSearch:()=>{
        const body=document.querySelector("body");
        const searchPanel=document.querySelector(".search");
        const openSearch=document.querySelector(".openSearch-btn");
        const searchBtn=document.querySelector(".submit-btn");
       
        openSearch.addEventListener('click',()=>{
            searchPanel.style.height="100vh";
            body.style.overflow="hidden";
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
        var recipes=responses.results;
        for (let i=0;i<recipes.length;i++){
            var image=recipes[i].image;
            var title=recipes[i].title;
            
            var recipeDiv=document.createElement("div");
            recipeDiv.classList.add("recipe");
            var recipe_detail=document.createElement("a");
            recipe_detail.classList.add("recipe_info");
            recipe_detail.href="#";
            recipeDiv.appendChild(recipe_detail);
            var recipeImg=document.createElement("img");
            recipeImg.classList.add("recipe_img");
            recipeImg.src=(image);
            recipeDiv.appendChild(recipeImg);
            recipeList.appendChild(recipeDiv);
            var recipeTitle=document.createElement("p");
            recipeTitle.classList.add("recipe_title");
            recipeTitle.innerText=title;
            recipe_detail.appendChild(recipeImg);
            recipe_detail.appendChild(recipeTitle);
            //recipeDiv.appendChild(recipeTitle);

        }

    }
}
app.init();