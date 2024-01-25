const nav = document.getElementById('nav')
const contentForYouRow = document.getElementById('content-for-you-row');
const banner = document.querySelector('.banner');
const bannerTitle = document.querySelector('.banner_title');
const bannerDesc = document.querySelector('.banner_description');
const rowDiv_lists = document.getElementById('lists')
const floatingDiv = document.getElementById('floatingDiv')
const bannerPlayBtn = document.getElementById('banner_play')

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

        // checking if user is Admin, if yes then showing adminDashboard Button-------//
        let nav_subdiv = document.querySelector('.nav_subdiv')

        let resp = await axios.get('http://localhost:3000/admin/verify',{headers : {Authorization : token}})

        if (resp.data.isAdmin){
            let a = document.createElement('a');
            a.href = '/admin/dashboard'
            a.style.color = 'white'
            a.style.textDecoration = 'none';
            a.innerHTML = '<h3>Admin Dashboard</h3>'
            nav_subdiv.appendChild(a)
        }
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

//---------- adding eventlistner for clicking on a movie/series----------------//
rowDiv_lists.addEventListener('click',(e)=>{
    // checking if a movie/series is clicked
    if (e.target.className === 'movieImg'){
        console.log('clicked')
        // redirecting to view movie page
        window.location.href = `/movie/view/${e.target.parentElement.id}`
    }
})
//---------- adding eventlistner for clicking play btn on banner----------------//
bannerPlayBtn.addEventListener('click',(e)=>{
     // redirecting to view movie page
     window.location.href = `/movie/view/${e.target.parentElement.parentElement.parentElement.id}`
})


//---------- adding eventlistners for hovering over a movie/series----------------//

// when hoveringIn
rowDiv_lists.addEventListener('mousemove',(e)=>{
    // if hovering over an movie/series
    if (e.target.className === 'movieImg'){
        let movieDiv = e.target.parentElement;
        // filling info in the floatingDiv
        floatingDiv.innerHTML = `<h3>${movieDiv.getAttribute('data-title')}</h3><br>
        <p>${movieDiv.getAttribute('data-desc')}</p>
        <h4>Year - ${movieDiv.getAttribute('data-year')}</h4>
        <h4>Age Limit - ${movieDiv.getAttribute('data-limit')}</h4>
        <h4>Genre - ${movieDiv.getAttribute('data-genre')}</h4>`
        // making it visible
        floatingDiv.style.display = 'block';
    }
})
// when hoveringOut
rowDiv_lists.addEventListener('mouseout',(e)=>{
    // if hovering over an movie/series
    if (e.target.className === 'movieImg'){
        floatingDiv.innerHTML = ''
        floatingDiv.style.display = 'none';
    }
})
// attaching floatingDiv to cursor
document.addEventListener('mousemove', (e)=>{
    // Updateing the position of the floatingDiv to follow the cursor
    floatingDiv.style.left = (e.pageX) + 'px'; 
    floatingDiv.style.top = (e.pageY + 10) + 'px';  
});


//----------------------------------------------------------------------------//
function fillContentForYouRow(moviesArr){
    moviesArr.forEach((movie)=>{
        // making a div element and also adding custom data
        let div = document.createElement('div')
        div.className = 'row_poster';
        div.id = movie._id;
        div.setAttribute('data-title',movie.title)      // adding custom attributes
        div.setAttribute('data-desc',movie.desc)
        div.setAttribute('data-limit',movie.limit)
        div.setAttribute('data-year',movie.year)
        div.setAttribute('data-genre',movie.genre)
        // making a img element
        let image = document.createElement('img');
        image.src = movie.img
        image.className = 'movieImg'
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
            // making a div element and also adding custom attributes
            let div = document.createElement('div')
            div.className = 'row_poster'
            div.id = movie._id;
            div.setAttribute('data-title',movie.title)      // adding custom attributes
            div.setAttribute('data-desc',movie.desc)
            div.setAttribute('data-limit',movie.limit)
            div.setAttribute('data-year',movie.year)
            div.setAttribute('data-genre',movie.genre)
            // making a img element
            let image = document.createElement('img');
            image.src = movie.img
            image.className = 'movieImg'
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
    banner.id = movie._id;
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
