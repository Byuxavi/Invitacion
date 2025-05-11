document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const envelope = document.getElementById('envelope');
    const envelopeInner = envelope.querySelector('.envelope');
    const invitation = document.getElementById('invitation');
    const story = document.getElementById('story');
    const showStoryBtn = document.getElementById('show-story');
    const musicToggle = document.getElementById('music-toggle');
    const backgroundMusic = document.getElementById('background-music');
    const langFr = document.getElementById('lang-fr');
    const langEs = document.getElementById('lang-es');
    const invitationImg = document.getElementById('invitation-img');
    const collageImg = document.getElementById('collage-img');
    
    // Default language
    let currentLang = 'fr';
    
    // Language selector
    langFr.addEventListener('click', function() {
        setLanguage('fr');
        langFr.classList.add('active');
        langEs.classList.remove('active');
    });
    
    langEs.addEventListener('click', function() {
        setLanguage('es');
        langEs.classList.add('active');
        langFr.classList.remove('active');
    });
    
    function setLanguage(lang) {
        currentLang = lang;
        
        // Update text content
        document.querySelectorAll('[data-fr], [data-es]').forEach(element => {
            if(element.getAttribute(`data-${lang}`)) {
                element.textContent = element.getAttribute(`data-${lang}`);
            }
        });
        
        // Update images
        updateImages(lang);
    }
    
    function updateImages(lang) {
        // Update invitation image
        if (invitationImg.getAttribute(`data-${lang}-img`)) {
            invitationImg.src = invitationImg.getAttribute(`data-${lang}-img`);
            
            // Update alt text based on language
            if (lang === 'fr') {
                invitationImg.alt = "Invitation de Mariage";
            } else if (lang === 'es') {
                invitationImg.alt = "Invitación de Boda";
            }
        }
        
        // Update collage image
        if (collageImg.getAttribute(`data-${lang}-img`)) {
            collageImg.src = collageImg.getAttribute(`data-${lang}-img`);
            
            // Update alt text based on language
            if (lang === 'fr') {
                collageImg.alt = "Notre histoire d'amour";
            } else if (lang === 'es') {
                collageImg.alt = "Nuestra historia de amor";
            }
        }
    }
    
    // Initialize with default language
    setLanguage(currentLang);
    
    // Envelope click animation with smoother transition
    envelope.addEventListener('click', function() {
        envelope.classList.remove('pulse');
        envelopeInner.classList.add('opened');
        
        setTimeout(function() {
            envelope.style.display = 'none';
            invitation.classList.add('visible');
        }, 1500);
    });
    
    // Show story button
    showStoryBtn.addEventListener('click', function() {
        story.classList.add('visible');
        
        // Scroll to story section smoothly
        story.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    
    // Music controls
    let musicPlaying = false;
    
    // Add support for background music if a source is provided
    if (backgroundMusic.querySelector('source').src) {
        backgroundMusic.volume = 0.5; // Set default volume to 50%
        
        musicToggle.addEventListener('click', function() {
            if (musicPlaying) {
                backgroundMusic.pause();
                musicToggle.textContent = '♪';
                musicToggle.style.background = 'linear-gradient(135deg, var(--color-accent), #b89a75)';
            } else {
                backgroundMusic.play().catch(e => {
                    console.log('Audio playback failed:', e);
                });
                musicToggle.textContent = '✕';
                musicToggle.style.background = 'linear-gradient(135deg, #8a785d, #4a453f)';
            }
            musicPlaying = !musicPlaying;
        });
    } else {
        // Hide music control if no music source
        musicToggle.style.display = 'none';
    }
});