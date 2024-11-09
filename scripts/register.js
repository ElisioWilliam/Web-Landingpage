const form = document.getElementById('form');
const fields = document.querySelectorAll('.required');
const emailRegex = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

form.addEventListener('submit', (event) => {
    event.preventDefault();
    nameValidate();
    emailValidate();
    mainPasswordValidate();
    comparePassword();
})

function setError(index) {
    fields[index].classList.remove('is-valid');
    fields[index].classList.add('is-invalid');
}

function removeError(index) {
    fields[index].classList.remove('is-invalid');
    fields[index].classList.add('is-valid');
}

function nameValidate(){
    if(fields[0].value.length < 3){
        setError(0);
    }else {
        removeError(0);
    }
}

function emailValidate(){
    if(!emailRegex.test(fields[1].value)){
        setError(1);
    }else{
        removeError(1);
    }
}

function mainPasswordValidate(){
    if(fields[2].value.length < 6){
        setError(2)
    }else{
        removeError(2)
        comparePassword();
    }
}

function comparePassword(){
    if(fields[2].value == fields[3].value && fields[3].value.length >= 6){
        removeError(3);
    }else{
        setError(3);
    }
}