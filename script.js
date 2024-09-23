// Smooth scroll para los enlaces del menú de navegación
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

// Animación de los elementos de la línea de tiempo al hacer scroll
document.addEventListener('DOMContentLoaded', function() {
    const items = document.querySelectorAll('.timeline-item');
    const section = document.getElementById('nuestro-proceso');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                console.log('Sección "Nuestro Proceso" está visible');
                items.forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.add('visible');
                        console.log(`Elemento ${index + 1} visible`);
                    }, index * 200); // Agregar un pequeño retraso entre cada item
                });
            } else {
                console.log('Sección "Nuestro Proceso" está fuera de la vista');
                items.forEach(item => {
                    item.classList.remove('visible');
                });
            }
        });
    }, { 
        threshold: 0.2, // Ajuste del umbral
        rootMargin: '0px 0px -100px 0px' // Ajuste del margen
    });

    observer.observe(section);
});
