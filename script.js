function updateBodyClassForScrolling() {
  if (isMobileDevice()) {
    document.body.classList.remove('disable-scrolling');
  } else {
    document.body.classList.add('disable-scrolling');
  }
}

// Função para verificar se está em um dispositivo móvel
function isMobileDevice() {
  return window.innerWidth <= 768;
}

// Atualiza a classe no carregamento e no redimensionamento da página
updateBodyClassForScrolling();
window.addEventListener('resize', updateBodyClassForScrolling);

document.addEventListener("DOMContentLoaded", function() {
  // Considera dispositivos com largura maior que 768px como desktop
  const isDesktop = window.innerWidth > 768;

  if (isDesktop) {
      // Inicializa variáveis para controle de toque
      let startY = 0; 

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

      // Apenas adiciona eventos de rolagem e toque se for desktop
      document.addEventListener("wheel", function(event) {
          const delta = event.deltaY;
          let scrollDirection = delta > 0 ? 1 : -1;
          navigatePages(scrollDirection);
          event.preventDefault(); // Previne a rolagem padrão
      }, { passive: false });

      document.addEventListener("touchstart", function(e) {
          startY = e.touches[0].clientY;
      }, { passive: false });

      document.addEventListener("touchend", function(e) {
          let endY = e.changedTouches[0].clientY;
          let deltaY = endY - startY;
          let scrollDirection = deltaY > 0 ? -1 : 1;

          navigatePages(scrollDirection);
          e.preventDefault(); // Previne a rolagem padrão
      }, { passive: false });
  }
});