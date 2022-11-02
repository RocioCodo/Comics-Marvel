/*******************  DOM  ******************/

const searchType = document.getElementById('search-type');
const results = document.getElementById('results');




/****************  USO DE API  **************/

const apiPublic = 'f55289a35024e2fd197aaf18b1dc0a29';
const apiPrivate = '5883f33cf3fe1781e32ff2ad84ea70f27697189f';

const baseUrl = 'http://gateway.marvel.com/v1/public/';

let offset= 0;

const getSearchParams = (isSearch) => {
    let url = baseUrl;
    let searchParams = `?apikey=${apiPublic}&offset=${offset}`;

    if(!searchParams){
        return searchParams
    }

    // if(searchType.value === 'comics'){
    //     searchParams += `${searchType.value}${searchParams}`
    // }
    return searchParams

}

const getApiURL = (resourse, resourseId, subResourse ) =>{
    const isSearch = !resourseId && !subResourse;
    let url = `${baseUrl}${resourse}` 

    if(resourseId){
        url += `/${resourseId}`
    }
    
    if(subResourse){
        url += `/${subResourse}`
    }

    url += getSearchParams(isSearch)
    return url;
}

const fetchUrl = async url => {

    const response = await fetch(url)
    const json = await response.json();
    return json
}

const fetchComics = async () => {
    const {data : {results, total}
} = await fetchUrl(getApiURL('comics'))

printComics(results)
    
}

const printComics = comics => {
    if(comics.length === 0){
        results.innerHTML='<h2 class="no-results">No se encontraron resultados</h2>'
    }

    for (const comic of comics) {
        const comicCard = document.createElement('div');
        comicCard.tabIndex = 0;
        comicCard.classList.add('comic');
        comicCard.onclick = () => {
            console.log(comic, comic.id)
        }
        comicCard.innerHTML= `
        <div class="comic-img-container">
        <img src="${comic.thumbnail.path}/portrait_uncanny.${comic.thumbnail.extension}" alt="${comic.title}" class="comic-thumbnail" />
        </div>
        <h6 class="comic-title">${comic.title}</h6>`

        results.append(comicCard)
    }
}

const search = () =>{
    if(searchType.value === 'comics'){
        fetchComics()
    }
}

const inicio = () => {
    search()
}

window.onload = inicio;














// /*BTN DROPDOWN*/
$( document ).ready(function(){
    $('select').formSelect();
})

