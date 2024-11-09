const form = document.getElementById('form');
const fields = document.querySelectorAll('.required');
const emailRegex = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

form.addEventListener('submit', (event) => {
    event.preventDefault();
    emailValidate();
    mainPasswordValidate();
})

function setError(index) {
    fields[index].classList.add('is-invalid');
}

function removeError(index) {
    fields[index].classList.remove('is-invalid');
}

function emailValidate(){
    if(!emailRegex.test(fields[0].value)){
        setError(0);
    }else{
        removeError(0);
    }
}

function mainPasswordValidate(){
    if(fields[1].value.length < 6){
        setError(1)
    }else{
        removeError(1)
    }
}