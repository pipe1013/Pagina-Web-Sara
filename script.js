document.querySelectorAll('nav ul li a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Obtenemos el destino del ancla
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        // Calculamos el desplazamiento
        const headerHeight = document.querySelector('header').offsetHeight;
        const offset = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;

        // Desplazamos a la posición ajustada
        window.scrollTo({
            top: offset,
            behavior: 'smooth'
        });
    });
});
