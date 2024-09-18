const textos = ["Inspire", "Inove", "Conecte-se", "Transforme"];
let indice = 0;
let elemento = document.getElementById("dynamic-text");
let isDeleting = false;
let charIndex = 0;
let velocidade = 100; 

function digitar() {
  const textoAtual = textos[indice];
  
  if (!isDeleting && charIndex < textoAtual.length) {
    elemento.textContent += textoAtual.charAt(charIndex);
    charIndex++;
    setTimeout(digitar, velocidade);
  } else if (isDeleting && charIndex > 0) {
    elemento.textContent = textoAtual.substring(0, charIndex - 1);
    charIndex--;
    setTimeout(digitar, velocidade);
  } else if (!isDeleting && charIndex === textoAtual.length) {
    isDeleting = true;
    setTimeout(digitar, 1000); 
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    indice = (indice + 1) % textos.length;
    setTimeout(digitar, 500); 
  }
}

document.querySelector('.arrow-link').addEventListener('click', function(e) {
  e.preventDefault();
  document.querySelector('#about-us').scrollIntoView({
      behavior: 'smooth' 
  });
});

digitar();
