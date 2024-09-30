//DECLARACION DE VARIABLES Y CONSTANTES
const URL = "https://japceibal.github.io/japflix_api/movies-data.json"
let searchInput = document.getElementById("inputBuscar");
const btn = document.getElementById("btnBuscar");
const list = document.getElementById("lista");
let dataArray = []; // ARRAY DE PELICULAS

//EVENTO QUE GUARDA LOS DATOS DEL JSON UNA VEZ QUE SE CARGA LA PAGINA
window.addEventListener("DOMContentLoaded", ()=>{
    fetch(URL)
    .then(response => response.json())
    .then(movies =>{
            dataArray = movies;
            console.log(dataArray)
        })
    .catch(error =>{
        console.error("Error:", error )
    });
});

//EVENTO DEL BUSCADOR
btn.addEventListener("click", ()=>{
    let regex = new RegExp(searchInput.value, 'i');
    let matchData = [];
    dataArray.forEach(element => {   
        if(regex.test(element.title) || regex.test(element.tagline) || regex.test(element.genres.map(genre => genre.name)) || regex.test(element.overview)){
            matchData.push(element);
            showData(matchData);
        }       
    });
});

//FUNCION QUE MUESTRA LAS PELICULAS Y OFFCANVAS
function showData(array){
    dataToAppend = "";   
    array.forEach(element => {
        let year = new Date(element.release_date).getFullYear();
        dataToAppend += `
        <li class="list-group-item bg-dark border-light" data-bs-toggle="offcanvas" data-bs-target="#offcanvasTop${element.id}" aria-controls="offcanvasTop">
        <div class="d-flex justify-content-between">
            <h3 class="text-light">${element.title}</h3>
            <div>
                 ${addStars(element)} 
            </div>
        </div>
        <p class="text-light">${element.tagline}</p> 
        </li>

        <div class="offcanvas offcanvas-top bg-dark" tabindex="-1" id="offcanvasTop${element.id}" aria-labelledby="offcanvasTopLabel">
            <div class="offcanvas-header">
                <h5 class="offcanvas-title text-light" id="offcanvasTopLabel">${element.title}</h5>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div class="offcanvas-body py-0">
                <div class="border-bottom py-2">
                    <p class="text-light">${element.overview}</p>
                </div>
                <p class="py-2 text-light">${element.genres.map(genre => genre.name).join(' - ')}</p>

                <div class="my-3 dropright">
                <button class="btn btn-primary dropdown-toggle"  type="button" id="dropdownMenuButton${element.id}"data-bs-toggle="dropdown" aria-expanded="false">Mas info</button>
                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton${element.id}" >
                        <li class="dropdown-item d-flex justify-content-between"><p>Year: </p> <p>${year}</p></li>
                        <li class="dropdown-item d-flex justify-content-between"><p>Runtime: </p> <p>${element.runtime} mins</p></li>
                         <li class="dropdown-item d-flex justify-content-between"><p>Budget: </p> <p>$${element.budget}</p></li>
                        <li class="dropdown-item d-flex justify-content-between"><p>Revenue: $</p> <p> ${element.revenue}</p></li>
                    </ul>
                </div>
            </div>
        </div>
        `;
    });
    list.innerHTML = dataToAppend;                
};
 
//FUNCION QUE AGREGA ESTRELLAS
function addStars(element){
    let checkedStars = Math.round(element.vote_average / 2);
    let stars = "";
    for (let i = 0; i < 5; i++) {
        if (i< checkedStars){
            stars += `<span class="fa fa-star checked"></span>`  
        }else {
            stars += `<span class="fa fa-star star-color"></span>` 
        }  
    }
    return stars
} 


