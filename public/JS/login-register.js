const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

const signupName = document.getElementById('signup-name');
const signupEmail = document.getElementById('signup-email');
const signupPassword = document.getElementById('signup-password');
const signupPassConfrm = document.getElementById('signup-passConfrm');
const signupSubmitBtn = document.getElementById('signup-submit');

const signinEmail = document.getElementById('signin-email');
const signinPassword = document.getElementById('signin-password');
const signinSubmitBtn = document.getElementById('signin-submit');


// For overalys
signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});


//--------------------- Handling Register ----------------------------------------//
signupSubmitBtn.addEventListener('click',async(e)=>{
	e.preventDefault()
	try{
		if (signupName.value === '' || signupEmail.value === '' || signupPassword.value === '' || signupPassConfrm.value === ''){
			window.alert('Please fill all the fields')
		}
		else if (signupPassword.value !== signupPassConfrm.value) {
			window.alert("Password do not match")
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

				window.alert('Signup successful')
			}
			else{
				window.alert('Something Went wrong...')
			}
		}
	}
	catch(err){
		console.log(err);
	}
})