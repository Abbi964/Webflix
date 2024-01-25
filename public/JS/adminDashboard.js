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
        else if (selected === 'update_user'){
            showUpdateUserForm()
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
        let userUl = document.createElement('ul');
        userUl.id = 'user_ul'
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
        // adding eventlisteners
        addUserEventListeners()
    }
    catch(err){
        console.log(err)
    }
}

function showUpdateUserForm(){
    // making an iframe
    let iframe = document.createElement('iframe')
    iframe.src = 'http://localhost:3000/user/update'

    contentDiv.appendChild(iframe)
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

async function showAllLists(){
    try{
        let token = localStorage.getItem('token')
        // first getting All the Lists
        let response = await axios.get('http://localhost:3000/list/all',{headers:  {Authorization : token}})
        console.log(response)
        // appending a listUl to contentDiv
        let listsUl = document.createElement('ul')
        listsUl.id = 'lists_ul'
        listsUl.className = 'user_ul'
        contentDiv.appendChild(listsUl)

        response.data.lists.forEach((list)=>{
            // making an listLi
            let listLi = document.createElement('li');
            listLi.id = list._id
            listLi.className = 'user_li'
            listLi.innerHTML = `<h3>${list.title}</h3>
            <h4>Genre - ${list.genre},    Type - ${list.type}</h4><br>`
            // adding movies from content arr
            list.content.forEach((movie)=>{
                let p = document.createElement('p')
                p.innerText = `${movie.title}, =====> id(${movie._id})`
                listLi.appendChild(p)
            })

            // appending a delete and edit btn on user_li
            let editBtn = document.createElement('button');
            editBtn.className = 'editBtnList'
            editBtn.innerText = 'Edit'

            let delBtn = document.createElement('button')
            delBtn.className = 'delBtnList'
            delBtn.innerText = 'Del'

            listLi.appendChild(delBtn);
            listLi.appendChild(editBtn);

            // finally appending userLi to userUl
            listsUl.appendChild(listLi)

        })

        // changing contendDiv style
        contentDiv.style.width = '75vw'
        // adding EventListeners on listUL
        addListEventListeners()

    }
    catch(err){
        console.log(err)
    }
}

function showCreateListForm(){
    // making an iframe
    let iframe = document.createElement('iframe')
    iframe.src = 'http://localhost:3000/list/create'

    contentDiv.appendChild(iframe)
}


function showUpdateListForm(){
    // making an iframe
    let iframe = document.createElement('iframe')
    iframe.src = 'http://localhost:3000/list/update'

    contentDiv.appendChild(iframe)
}

///------------------------------------------------------------------------//

function addUserEventListeners(){
    try{
        let userUl = document.getElementById('user_ul');
    
        userUl.addEventListener('click',async(e)=>{
            // if delBtnUser is clicked
            if (e.target.className === 'delBtn'){
                // First conferming
                let isConfermed = window.confirm('Are you sure you want to delete user');

                if(isConfermed){
                    // deleting movie from database
                    let token = localStorage.getItem('token')
                    let userId = e.target.parentElement.id
                    console.log(userId)
                    await axios.delete(`http://localhost:3000/user/delete/${userId}`,{headers:  {Authorization : token}})
    
                    // removing from UI
                    e.target.parentElement.remove()
                }
            }
            // if editBtnUser button is clicked
            else if (e.target.className === 'editBtn'){
                // changing selected and editID in localstorage
                localStorage.setItem('editId',e.target.parentElement.id);
                localStorage.setItem('selected','update_user')

                window.location.reload()
            }
        })
    }
    catch(err){
        console.log(err)
    }

}


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


function addListEventListeners(){
    try{
        let listsUl = document.getElementById('lists_ul');
        listsUl.addEventListener('click',async(e)=>{
            // if delBtnList is clicked
            if (e.target.className === 'delBtnList'){
                // First conferming
                let isConfermed = window.confirm('Are you sure you want to delete list');

                if(isConfermed){
                    // deleting list from database
                    let token = localStorage.getItem('token')
                    let listId = e.target.parentElement.id
                    await axios.delete(`http://localhost:3000/list/delete/${listId}`,{headers:  {Authorization : token}})
    
                    // removing from UI
                    e.target.parentElement.remove()
                }
            }
            // if editBtnList button is clicked
            else if (e.target.className === 'editBtnList'){
                // changing selected and editID in localstorage
                localStorage.setItem('editId',e.target.parentElement.id);
                localStorage.setItem('selected','update_list')

                window.location.reload()
            }
        })
    }
    catch(err){
        console.log(err)
    }

}