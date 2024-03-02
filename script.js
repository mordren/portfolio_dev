let startY = 0; // Inicializa a posição inicial do toque em Y

// Evento de início de toque
document.addEventListener("touchstart", function(e) {
  startY = e.touches[0].clientY;
}, { passive: false });

// Evento de fim de toque
document.addEventListener("touchend", function(e) {
  let endY = e.changedTouches[0].clientY;
  let deltaY = endY - startY;
  let scrollDirection = deltaY > 0 ? -1 : 1; // Inverte a direção porque um gesto de deslizar para cima significa rolar para baixo

  navigatePages(scrollDirection);
  e.preventDefault();
}, { passive: false });

// Função para navegar entre as páginas
function navigatePages(scrollDirection) {
  let currentPage = document.querySelector('.page-visible');
  if (!currentPage) {
    currentPage = document.querySelector('.page');
    currentPage.classList.add('page-visible');
  }

  let nextPageIndex = [...document.querySelectorAll('.page')].indexOf(currentPage) + scrollDirection;
  let pages = document.querySelectorAll('.page');
  if (nextPageIndex >= 0 && nextPageIndex < pages.length) {
    currentPage.classList.remove('page-visible');
    pages[nextPageIndex].classList.add('page-visible');
    
    pages[nextPageIndex].scrollIntoView({ behavior: 'smooth' });
  }
}

// Reutiliza a função navigatePages no evento de rolagem do mouse
document.addEventListener("wheel", event => {
  const delta = event.deltaY;
  let scrollDirection = delta > 0 ? 1 : -1;
  navigatePages(scrollDirection);
  event.preventDefault();
}, { passive: false });