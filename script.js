document.addEventListener("wheel", event => {
  const delta = event.deltaY;
  let scrollDirection = delta > 0 ? 1 : -1;
  
  // Encontra a seção atualmente visível
  let currentPage = document.querySelector('.page-visible');
  if (!currentPage) {
    currentPage = document.querySelector('.page');
    currentPage.classList.add('page-visible');
  }
  
  // Calcula o índice da próxima página baseado na direção do scroll
  let nextPageIndex = [...document.querySelectorAll('.page')].indexOf(currentPage) + scrollDirection;
  let pages = document.querySelectorAll('.page');
  if (nextPageIndex >= 0 && nextPageIndex < pages.length) {
    // Remove a classe da página atual e adiciona à próxima
    currentPage.classList.remove('page-visible');
    pages[nextPageIndex].classList.add('page-visible');
    
    // Scroll para a próxima página
    pages[nextPageIndex].scrollIntoView({ behavior: 'smooth' });
  }

  event.preventDefault();
}, { passive: false });