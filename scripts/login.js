const form = document.getElementById('form');
const fields = document.querySelectorAll('.required');
const emailRegex = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const isEmailValid = emailValidate();
    const isPasswordValid = mainPasswordValidate();

    if (isEmailValid && isPasswordValid) {
        const formData = new FormData(form);

        try {
            const response = await fetch('login.php', {
                method: 'POST',
                body: formData
            });

            const data = await response.json();

            if (data.success) {
                console.log("Logou com sucesso!");
                window.location.href = 'sistema.php';
            } else {
                console.log('Erro ao logar: ' + data.message);
            }
        } catch (error) {
            console.error('Erro no AJAX:', error);
            alert('Houve um erro ao enviar o formulário.');
        }
    }
});


function setError(index) {
    fields[index].classList.add('is-invalid');
}

function removeError(index) {
    fields[index].classList.remove('is-invalid');
}

function emailValidate(){
    if(!emailRegex.test(fields[0].value)){
        setError(0);
        return false;
    }else{
        removeError(0);
        return true;
    }
}

function mainPasswordValidate(){
    if(fields[1].value.length < 6){
        setError(1);
        return false;
    }else{
        removeError(1);
        return true;
    }
}