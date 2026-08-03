   // Smooth scroll con offset per header fisso
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                if(targetId === '#') return;
                const target = document.querySelector(targetId);
                
                if(target) {
                    target.scrollIntoView({
                        behavior: 'smooth'
                    });
                    
                    document.querySelectorAll('nav a').forEach(navA => navA.classList.remove('active'));
                    if(this.parentElement.tagName === 'NAV') {
                        this.classList.add('active');
                    }
                }
            });
        });

        const menuToggle = document.querySelector('#mobile-menu');
        const navMenu = document.querySelector('#nav-menu');
        const navLinks = document.querySelectorAll('nav a');

        // Toggle apertura/chiusura menu mobile
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('is-active');
            navMenu.classList.toggle('is-active');
        });

        // Chiudi il menu mobile quando si clicca su una voce del menu
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('is-active');
                navMenu.classList.remove('is-active');
            });
            });



    // gallery estesa
    const projectsData = {
        'modal-merch': {
            title: "Apparel & Accessories Line",
            description: "Studio grafico del brand applicato su linea merchandising. Realizzazione vettoriale in Adobe Illustrator e preparazione file per la serigrafia e la stampa su tessuto.",
            media: [
                "immagini/bag.png",
                "immagini/btb.png",
                "immagini/biglietto.png",
                "immagini/picture.png",
                "immagini/moon_pitto.png",
                "immagini/wall.png"
            ]
        },
        'modal-editorial': {
            title: "Editorial & Brand Guidelines",
            description: "Impaginazione di cataloghi prodotti e Brand Book. Gestione delle gabbie di impaginazione, scelta tipografica ed esecutivi di stampa creati in InDesign.",
            media: [
                "immagini/book1.png",
                "immagini/book2.png",
                "immagini/book3.png"
            ]
        },
        'modal-video': {
            title: "Reel & Promo Video Content",
            description: "Produzione e post-produzione di contenuti video dinamici. Montaggio ritmato, color grading e audio design con Adobe Premiere Pro.",
            media: [
                "video/video1.mp4",
                "video/video2.mp4",
                "video/video3.mp4"

        ]
    },
    'modal-brand': {
        title: "Brand Identity & Web Site",
        description: "Progettazione completa dell'identità visiva (Logo, Palette colori, Typography) e sviluppo del sito web landing page responsive.",
        media: [
            "immagini/sito1.png",
            "immagini/sito2.png",
            "immagini/sito3.png"
        ]
    }
};

// Selettori elementi Modal
const modal = document.getElementById('project-modal');
const modalClose = document.getElementById('modal-close');
const carouselTrack = document.getElementById('carousel-track');
const modalTitle = document.getElementById('modal-title');
const modalDesc = document.getElementById('modal-description');
const prevBtn = document.getElementById('carousel-prev');
const nextBtn = document.getElementById('carousel-next');

let currentIndex = 0;
let currentMediaList = [];

// Apertura Modal
document.querySelectorAll('.grid-item').forEach(item => {
    item.addEventListener('click', () => {
        const modalKey = item.getAttribute('data-modal');
        const data = projectsData[modalKey];

        if (data) {
            modalTitle.textContent = data.title;
            modalDesc.textContent = data.description;
            currentMediaList = data.media;
            currentIndex = 0;

            // Pulizia carosello
            carouselTrack.innerHTML = '';
            
            data.media.forEach((src, idx) => {
                if(src.endsWith('.mp4')) {
                    const video = document.createElement('video');
                    video.src = src;
                    video.controls = true;
                    video.playsInline = true;
                    // Muto di default per evitare il caos audio
                    video.muted = true; 
                    video.classList.add('carousel-slide');
                    carouselTrack.appendChild(video);
                } else {
                    const img = document.createElement('img');
                    img.src = src;
                    img.classList.add('carousel-slide');
                    carouselTrack.appendChild(img);
                }
            });

            updateCarousel();
            modal.classList.add('active');
        }
    });
});

    // Funzione scorrimento Carosello con gestione Smart del Video
    function updateCarousel() {
        carouselTrack.style.transform = `translateX(-${currentIndex * 100}%)`;

        // Mette in pausa tutti i video nel carosello
        const allVideos = carouselTrack.querySelectorAll('video');
        allVideos.forEach(v => {
            v.pause();
            v.currentTime = 0; // Resetta il video dall'inizio
        });

        const currentSlide = carouselTrack.children[currentIndex];
        if (currentSlide && currentSlide.tagName === 'VIDEO') {
            currentSlide.play();
        }
    }

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % currentMediaList.length;
        updateCarousel();
    });

    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + currentMediaList.length) % currentMediaList.length;
        updateCarousel();
    });

    // Funzione helper per fermare l'audio/video alla chiusura
    function closeModal() {
        modal.classList.remove('active');
        const allVideos = carouselTrack.querySelectorAll('video');
        allVideos.forEach(v => v.pause()); // Stoppa tutti i video
    }

    // Chiusura Modal
    modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });


 //mail
  document.querySelector('.email-link').addEventListener('click', function (e) {
  const isDesktop = window.innerWidth > 768;

  if (isDesktop) {
    e.preventDefault(); // SOLO desktop

    window.open(
      'https://mail.google.com/mail/?view=cm&fs=1&to=benedetta.catricala@gmail.com&su=Contatto%20dal%20Portfolio',
      '_blank',
      'width=600,height=600'
    );
  }
});