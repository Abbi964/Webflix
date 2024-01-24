const optionsDiv = document.getElementById('options')
const contentDiv = document.getElementById('content')


// Making a variable to check  which option is selected
let selected = localStorage.getItem('selected') ? localStorage.getItem('selected') : 'all_users'
    // making UI change accordingly
    document.getElementById(selected).style.color = '#f7370f';


//  Changing selected in localstorage according to option selected
optionsDiv.addEventListener('click',(e)=>{
    try{
        if(e.target.className === 'options_li'){
            localStorage.setItem('selected',e.target.id)
            location.reload()
        }
    }
    catch(err){
        console.log(err)
    }
})


// Loading form or list according to what is selected in options
window.addEventListener('DOMContentLoaded',(e)=>{
    try{
        if (selected === 'all_users'){
            showAllUsers()
        }
        else if (selected === 'all_movies'){
            showAllMovies()
        }
        else if (selected === 'create_movie'){
            showCreateMovieForm()
        }
        else if (selected === 'update_movie'){
            showUpdateMovieForm()
        }
        else if (selected === 'all_lists'){
            showAllLists()
        }
        else if (selected === 'create_list'){
            showCreateListForm()
        }
        else if (selected === 'update_list'){
            showUpdateListForm()
        }
    }
    catch(err){
        console.log(err)
    }
})


/////////////////////////////////////////////////////////////////////////////////////////

async function showAllUsers(){
    try{
        let token = localStorage.getItem('token')
        // first getting All the users
        let response = await axios.get('http://localhost:3000/user/findAll',{headers:  {Authorization : token}})
        // appending a userUL to contentDiv
        let userUl = document.createElement('ul')
        userUl.className = 'user_ul'
        contentDiv.appendChild(userUl)

        response.data.users.forEach((user)=>{
            // making an userLi
            let userLi = document.createElement('li');
            userLi.id = user._id
            userLi.className = 'user_li'
            userLi.innerHTML = `<p>${user.username} - ${user.email}</p>`

            // appending a delete and edit btn on user_li
            let editBtn = document.createElement('button');
            editBtn.className = 'editBtn'
            editBtn.innerText = 'Edit'

            let delBtn = document.createElement('button')
            delBtn.className = 'delBtn'
            delBtn.innerText = 'Del'

            userLi.appendChild(delBtn);
            userLi.appendChild(editBtn);

            // finally appending userLi to userUl
            userUl.appendChild(userLi)

        })

        // changing contendDiv style
        contentDiv.style.width = '75vw'

    }
    catch(err){
        console.log(err)
    }
}

async function showAllMovies(){
    try{
        let token = localStorage.getItem('token')
        // first getting All the movie/series
        let response = await axios.get('http://localhost:3000/movie/findAll',{headers:  {Authorization : token}})
        // appending a movieUl to contentDiv
        let movieUl = document.createElement('ul')
        movieUl.id = 'movie_ul'
        movieUl.className = 'user_ul'
        contentDiv.appendChild(movieUl)

        response.data.movies.forEach((movie)=>{
            // making an movieLi
            let movieLi = document.createElement('li');
            movieLi.id = movie._id
            movieLi.className = 'user_li'
            movieLi.innerHTML = `<h3>${movie.title}</h3>
            <p>${movie.desc}</p>
            <a href="${movie.img}"><h4>Image Link</h4></a>
            <a href="${movie.video}"><h4>Video Link</h4></a>
            <a href="${movie.banner}"><h4>Banner Link</h4></a>
            <h4>Year - ${movie.year} --- Age Limit - ${movie.limit}</h4>
            <h4>Genre - ${movie.genre} --- Is Series - ${movie.isSeries}</h4>`

            // appending a delete and edit btn on user_li
            let editBtn = document.createElement('button');
            editBtn.className = 'editBtnMovie'
            editBtn.innerText = 'Edit'

            let delBtn = document.createElement('button')
            delBtn.className = 'delBtnMovie'
            delBtn.innerText = 'Del'

            movieLi.appendChild(delBtn);
            movieLi.appendChild(editBtn);

            // finally appending userLi to userUl
            movieUl.appendChild(movieLi)

        })

        // changing contendDiv style
        contentDiv.style.width = '75vw'
        // adding EventListeners on movieUL
        addMovieEventListeners()

    }
    catch(err){
        console.log(err)
    }
}

function showCreateMovieForm(){
    // making an iframe
    let iframe = document.createElement('iframe')
    iframe.src = 'http://localhost:3000/movie/create'

    contentDiv.appendChild(iframe)
}

function showUpdateMovieForm(){
    // making an iframe
    let iframe = document.createElement('iframe')
    iframe.src = 'http://localhost:3000/movie/update'

    contentDiv.appendChild(iframe)
}

function showCreateListForm(){
    // making an iframe
    let iframe = document.createElement('iframe')
    iframe.src = 'http://localhost:3000/list/create'

    contentDiv.appendChild(iframe)
}

///------------------------------------------------------------------------//

function addMovieEventListeners(){
    try{
        let movieUl = document.getElementById('movie_ul');
    
        movieUl.addEventListener('click',async(e)=>{
            // if delBtnMovie is clicked
            if (e.target.className === 'delBtnMovie'){
                // First conferming
                let isConfermed = window.confirm('Are you sure you want to delete movie');

                if(isConfermed){
                    // deleting movie from database
                    let token = localStorage.getItem('token')
                    let movieId = e.target.parentElement.id
                    await axios.delete(`http://localhost:3000/movie/delete/${movieId}`,{headers:  {Authorization : token}})
    
                    // removing from UI
                    e.target.parentElement.remove()
                }
            }
            // if editBtnMovie button is clicked
            else if (e.target.className === 'editBtnMovie'){
                // changing selected and editID in localstorage
                localStorage.setItem('editId',e.target.parentElement.id);
                localStorage.setItem('selected','update_movie')

                window.location.reload()
            }
        })
    }
    catch(err){
        console.log(err)
        alert(err.data.msg)
    }

}

