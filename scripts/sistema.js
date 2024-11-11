const sidebar = document.getElementById("sidebar");
const hambgOutside = document.getElementById("hambg-outside");
const hambgInside = document.getElementById("hambg-inside");
const logoSidebar = document.getElementById("logo-sidebar");
let menuItems = document.querySelectorAll('.sidebar-link');


// Função para alternar a visibilidade dos botões
function toggleButtonsDisplay() {
    if (sidebar.classList.contains("expand")) {
        hambgInside.style.display = "none"; // Mostra o botão de dentro quando expandido
        hambgOutside.style.display = "flex"; // Esconde o botão de fora
        logoSidebar.style.display = "flex";
        menuItems.forEach(function(elemento) {
            elemento.style.justifyContent = "left";
        });
    } else {
        hambgOutside.style.display = "none"; // Mostra o botão de fora
        hambgInside.style.display = "flex"; // Esconde o botão de dentro quando retraído
        logoSidebar.style.display = "none"
        menuItems.forEach(function(elemento) {
            elemento.style.justifyContent = "center";
        });
        
    }
}

// Evento de clique para expandir/retrair usando o botão de dentro
hambgInside.addEventListener("click", function () {
    sidebar.classList.add("expand"); // Retrai a sidebar
    toggleButtonsDisplay(); // Atualiza os botões
});


// Evento de clique para expandir/retrair usando o botão de fora
hambgOutside.addEventListener("click", function () {
    sidebar.classList.remove("expand"); // Expande a sidebar
    toggleButtonsDisplay(); // Atualiza os botões
});


// Chama a função para definir o estado inicial dos botões
toggleButtonsDisplay();
