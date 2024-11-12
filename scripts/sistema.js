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
