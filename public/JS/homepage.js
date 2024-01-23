const nav = document.getElementById('nav')
const contentForYouRow = document.getElementById('content-for-you-row');
const banner = document.querySelector('.banner');
const bannerTitle = document.querySelector('.banner_title');
const bannerDesc = document.querySelector('.banner_description');
const rowDiv_lists = document.getElementById('lists')


// Making a variable to check home, movie, series which one is selected
let selectedPage = localStorage.getItem('selectedPage') ? localStorage.getItem('selectedPage') : 'home'
    // making UI change accordingly
    document.getElementById(selectedPage).style.color = '#f7370f';

    
window.addEventListener('DOMContentLoaded',async(e)=>{
    let token = localStorage.getItem('token')
    try{
        let type = findType(selectedPage)

        // adding content in content for you row-------------------------------//
        let response = await axios.get(`http://localhost:3000/movie/random?type=${type}&amount=8`,{headers : {Authorization : token}})
        fillContentForYouRow(response.data.movies)

        // adding other lists-----------------------------------//
        let result = await axios.get(`http://localhost:3000/list?type=${type}`,{headers : {Authorization : token}})
        console.log(result.data.lists)
        fillLists(result.data.lists)
    }
    catch(err){
        console.log(err)
    }
})

// ------------ Changing nav background color after scrolling ----------------//
window.addEventListener('scroll',()=>{
    if (window.scrollY >= 50){
        nav.classList.add('nav_black')
    }
    else{
        nav.classList.remove('nav_black')
    }
})

//------------- reloading page after home, movies , series which is selected
nav.addEventListener('click',(e)=>{
    if(e.target.className === 'nav_link'){
        // changing selected page
        localStorage.setItem('selectedPage',e.target.innerHTML.toLowerCase())
        location.reload();
    }
})



//----------------------------------------------------------------------------//
function fillContentForYouRow(moviesArr){
    moviesArr.forEach((movie)=>{
        // making a div element
        let div = document.createElement('div')
        div.className = 'row_poster'
        // making a img element
        let image = document.createElement('img');
        image.src = movie.img
        // making a h3 
        let h4 = document.createElement('h4');
        h4.innerHTML = movie.title

        div.appendChild(image);
        div.appendChild(h4)
        contentForYouRow.appendChild(div)

        // if banner is not filled yet and movie has a banner filling the banner
        if (bannerTitle.innerHTML === '' || movie.banner){
            fillBanner(movie)
        }
    })
}

function fillLists(lists){
    lists.forEach((list)=>{
        // making row heading
        let h2 = document.createElement('h2');
        h2.innerHTML = list.title;

        // making a div element to contain row posters
        let rp_div = document.createElement('div')
        rp_div.className = 'row_posters'

        // ---------- making a row Poster for each movie of list contents -----------------------//

        list.contentDetails.forEach((movie)=>{
            // making a div element
            let div = document.createElement('div')
            div.className = 'row_poster'
            // making a img element
            let image = document.createElement('img');
            image.src = movie.img
            // making a h3 
            let h4 = document.createElement('h4');
            h4.innerHTML = movie.title

            div.appendChild(image);
            div.appendChild(h4)

            // adding poster in row_posters
            rp_div.appendChild(div)
        })

        //--------------- appending rp_div  and h2 to row and that to lists-------------//
        // making a row_div element
        let row_div = document.createElement('div')
        row_div.className = 'row'

        row_div.appendChild(h2)
        row_div.appendChild(rp_div)

        // appending to the main lists div
        rowDiv_lists.appendChild(row_div)
    })
}


function fillBanner(movie){
    bannerTitle.innerHTML = movie.title;
    bannerDesc.innerHTML = movie.desc;
    banner.style.backgroundImage = `url(${movie.banner})`
}

function findType(selectedPage){
    if (selectedPage === 'home'){
        return 'all'
    }
    else if (selectedPage === 'movies'){
        return 'movie'
    }
    else{
        return 'series'
    }
}
