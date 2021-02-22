const user = document.querySelector('#username');
const emailDetails = document.querySelector('#email');
const secret = document.querySelector('#password');
const confirmSecret = document.querySelector('#confirm-password');
const form = document.querySelector('#signup');

form.addEventListener('submit', function(e){
    e.preventDefault();

    let isName = checkUserName();
    let isEmail = checkEmail();
    let isPassword = checkPassword();
    let isConfirmPass= checkConfirmPassword();

    let isForm = isName && isEmail && isPassword && isConfirmPass;;

});

const ErrorMessage = (input, message)=>{
        const formField = input.parentElement;
        formField.classList.remove('success');
        formField.classList.add('error');

        const error = formField.querySelector('small');
        error.textContent = message;

}

const SuccessMessage = (input)=>{
        const formField = input.parentElement;

        formField.classList.remove('error');
        formField.classList.add('success');

        const error = formField.querySelector('small');
        error.textContent = '';
} 

const isRequired = value => value === ''? false : true;
const isBetween = (length, min, max)=>length < min || length > max ? false:true;


const isEmail = (email) =>{
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}


const checkUserName =()=>{
    const min = 3;
    const max = 50;

    const username = user.value.trim();

    if(!isRequired(username)){
        ErrorMessage(user, 'Bu sahəni boş qoymaq olmaz!')
    } else if(!isBetween(username.length, min, max)){
        ErrorMessage(user, `Adinizin xarakterleri ${min} ve ${max} arasinda olmalidir`)
    } else{
        SuccessMessage(user);
    }
}

const checkEmail=()=>{
    const email = emailDetails.value.trim();
    if(!isRequired(email)){
        ErrorMessage(emailDetails, 'Bu xana bos ola bilmez');
    } else if(!isEmail(email)){
        ErrorMessage(emailDetails, 'E-pocta yanlisdir')
    }else{
        SuccessMessage(emailDetails);
    }
}

const checkPassword = ()=>{
    const password = secret.value.trim();

    if(!isRequired(password)){
        ErrorMessage(secret, 'Sifre bos qoyulmamalidir!')
    }else if(!isPasswordSecure(password)){
        ErrorMessage(secret, 'Sifre minimum 8 xarakter olsun, 1 reqem ve 1 xarakter ve 1 herf boyuk olsun')
    }else{
        SuccessMessage(secret);
    }
}

const checkConfirmPassword = ()=>{
    const confirmPassword = confirmSecret.value.trim();
    const password = secret.value.trim();

    if(!isRequired(confirmPassword)){
        ErrorMessage(confirmSecret, 'Zehmet olmasa sifreni daxil edin')
    }else if(password!==confirmPassword){
        ErrorMessage(confirmSecret, 'Sifre ust uste dusmur')
    }else{
        SuccessMessage(confirmSecret);
    }
}
/*edit*/
const isPasswordSecure = (password)=>{
    const re = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    return re.test(password);
}


/*modal*/
const modals = document.querySelectorAll('[data-modal-target]');
const closeModalButton = document.querySelectorAll('[data-close-target]');
const overlay = document.getElementById('overlay');

modals.forEach(x=>{
    x.addEventListener('click', ()=>{
        const modal = document.querySelector(x.dataset.modalTarget)
        openModal(modal)
    })
})
overlay.addEventListener('click', ()=>{
    const modalb = document.querySelectorAll('.modal.active')
    modalb.forEach(modal=>{
        closeModal(modal)
    })
})

closeModalButton.forEach(x=>{
    x.addEventListener('click', (e)=>{
        const modal = x.closest('.modal')
        closeModal(modal)
    })
})

function  openModal(modal){
    if(modal==null) return
        modal.classList.add('active')
        overlay.classList.add('active')
}

function closeModal(modal){
    if(modal == null) return
        modal.classList.remove('active')
        overlay.classList.remove('active')
}

//show-hide password
const togglePassword = document.querySelector('#togglePassword');
const togglePassword2 = document.querySelector('#togglePassword2');
const xpassword = document.querySelector('#password');
const password2 = document.querySelector('#confirm-password')

togglePassword.addEventListener('click', function(e){

    let type = xpassword.getAttribute('type') === 'password'?'text':'password';
    xpassword.setAttribute('type', type);

    this.classList.toggle('fa-eye-slash')
})

togglePassword2.addEventListener('click', function(e){

    let type = password2.getAttribute('type') === 'password'?'text':'password';
    password2.setAttribute('type', type);

    this.classList.toggle('fa-eye-slash')

})