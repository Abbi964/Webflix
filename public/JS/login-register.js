const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

const signupName = document.getElementById('signup-name');
const signupEmail = document.getElementById('signup-email');
const signupPassword = document.getElementById('signup-password');
const signupPassConfrm = document.getElementById('signup-passConfrm');
const signupSubmitBtn = document.getElementById('signup-submit');
const signupAlert = document.getElementById('signup-alert');

const signinEmail = document.getElementById('signin-email');
const signinPassword = document.getElementById('signin-password');
const signinSubmitBtn = document.getElementById('signin-submit');
const signinAlert = document.getElementById('signin-alert');


// For overalys
signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});


//--------------------- Handling Signup ----------------------------------------//
signupSubmitBtn.addEventListener('click',async(e)=>{
	e.preventDefault()
	try{
		if (signupName.value === '' || signupEmail.value === '' || signupPassword.value === '' || signupPassConfrm.value === ''){
			signupAlert.innerHTML = 'Please fill all the fields'
			setTimeout(()=>signupAlert.innerHTML = '',1000)
		}
		else if (signupPassword.value !== signupPassConfrm.value) {
			signupAlert.innerHTML = "Password do not match"
			setTimeout(()=>signupAlert.innerHTML = '',1000)
		}
		else{
			// making user obj
			let obj = {
				username : signupName.value,
				email : signupEmail.value,
				password : signupPassword.value
			}
	
			// posting 
			let user = await axios.post("http://localhost:3000/auth/register",obj)
	
			if (user){
				// clearing the inputs
				signupName.value = '',
				signupEmail.value = '',
				signupPassword.value = '',
				signupPassConfrm.value = '',

				signupAlert.innerHTML = 'Signup successful'
				setTimeout(()=>signupAlert.innerHTML = '',1000)
			}
			else{
				signupAlert.innerHTML = 'Something Went wrong...'
				setTimeout(()=>signupAlert.innerHTML = '',1000)
			}
		}
	}
	catch(err){
		console.log(err);
	}
})


//------------------------- Handling Sign In ----------------------------------//
signinSubmitBtn.addEventListener('click',async(e)=>{
	e.preventDefault();
	try{
		if (signinEmail.value === '' || signinPassword.value === ''){
			signinAlert.innerHTML = 'Please fill all the fields'
			setTimeout(()=>signinAlert.innerHTML = '',1000)
		}
		else{
			// making a login req
			let obj = {
				email : signinEmail.value,
				password : signinPassword.value
			}

			let response = await axios.post("http://localhost:3000/auth/login",obj);

			if (response.data.user){
				// if login is successfull then storing the accesskey in localstorage
				localStorage.setItem('token',response.data.accessToken)
	
				// redirecting to home page
				window.location.href = '/movie/home'
			}
		}
	}
	catch(err){
		signinAlert.innerHTML = err.response.data.msg
		setTimeout(()=>signinAlert.innerHTML = '',1000)
		console.log(err)
	}
})
