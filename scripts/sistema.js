const sidebar = document.getElementById("sidebar");
const hambgOutside = document.getElementById("hambg-outside");
const hambgInside = document.getElementById("hambg-inside");
const logoSidebar = document.getElementById("logo-sidebar");
let menuItems = document.querySelectorAll('.sidebar-link');


function toggleButtonsDisplay() {
    if (sidebar.classList.contains("expand")) {
        hambgInside.style.display = "none";
        hambgOutside.style.display = "flex";
        logoSidebar.style.display = "flex";
        menuItems.forEach(function(elemento) {
            elemento.style.justifyContent = "left";
        });
    } else {
        hambgOutside.style.display = "none"; 
        hambgInside.style.display = "flex";
        logoSidebar.style.display = "none"
        menuItems.forEach(function(elemento) {
            elemento.style.justifyContent = "center";
        });
        
    }
}

hambgInside.addEventListener("click", function () {
    sidebar.classList.add("expand");
    toggleButtonsDisplay();
});


hambgOutside.addEventListener("click", function () {
    sidebar.classList.remove("expand");
    toggleButtonsDisplay();
});


toggleButtonsDisplay();

function openConfirmDialog() {
    document.getElementById('confirmDialog').style.display = 'flex';
}

function closeDialog() {
    document.getElementById('confirmDialog').style.display = 'none';
    document.getElementById('messageDialog').style.display = 'none';
    document.getElementById('messageText').style.display = 'none';
    document.getElementById('closeButton').style.display = 'none';
    document.getElementById('loadingSpinner').style.display = 'none';
}

function confirmRegistration() {
    // Fechar o diálogo de confirmação
    closeDialog();

    // Exibir o diálogo de carregamento
    document.getElementById('messageDialog').style.display = 'flex';
    document.getElementById('loadingSpinner').style.display = 'block';

    // Obter o formulário e o ID do evento
    const form = document.getElementById('eventForm');
    const formData = new FormData(form);

    // Fazer a requisição AJAX para o PHP
    fetch('register_event.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        // Ocultar o spinner e exibir a mensagem
        document.getElementById('loadingSpinner').style.display = 'none';
        document.getElementById('messageText').textContent = data;
        document.getElementById('messageText').style.display = 'block';
        document.getElementById('closeButton').style.display = 'block';
    })
    .catch(error => {
        console.error('Erro:', error);
        document.getElementById('loadingSpinner').style.display = 'none';
        document.getElementById('messageText').textContent = 'Ocorreu um erro. Tente novamente.';
        document.getElementById('messageText').style.display = 'block';
        document.getElementById('closeButton').style.display = 'block';
    });
}
