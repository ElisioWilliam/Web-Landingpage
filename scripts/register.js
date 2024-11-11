const form = document.getElementById('form');
const fields = document.querySelectorAll('.required');
const emailRegex = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const isNameValid = nameValidate();
    const isEmailValid = emailValidate();
    const isPasswordValid = mainPasswordValidate();
    const isPasswordMatch = comparePassword();

    if (isNameValid && isEmailValid && isPasswordValid && isPasswordMatch) {
         const formData = new FormData(form);

         fetch('form.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.text())
        .then(data => {
            console.log(data);
            try {
                const jsonResponse = JSON.parse(data);
                if (jsonResponse.success) {
                    const validElements = form.querySelectorAll('.is-valid');
                    validElements.forEach(element => {
                        element.classList.remove('is-valid');
                    });
                    form.reset();
                    alert('Sucesso: ' + jsonResponse.message);
                    window.location.href = 'login.html';
                } else {
                    alert('Erro ao cadastrar: ' + jsonResponse.message);
                }
            } catch (error) {
                console.error('Erro ao tentar fazer o parse JSON:', error);
            }
        })
        .catch(error => {
            console.error('Erro no AJAX:', error);
            alert('Houve um erro ao enviar o formulário.');
        });
    }
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
        return false;
    }else {
        removeError(0);
        return true;
    }
}

function emailValidate(){
    if(!emailRegex.test(fields[1].value)){
        setError(1);
        return false;
    }else{
        removeError(1);
        return true;
    }
}

function mainPasswordValidate(){
    if(fields[2].value.length < 6){
        setError(2)
        return false;
    }else{
        removeError(2);
        comparePassword();
        return true;
    }
}

function comparePassword(){
    if(fields[2].value == fields[3].value && fields[3].value.length >= 6){
        removeError(3);
        return true;
    }else{
        setError(3);
        return false;
    }
}