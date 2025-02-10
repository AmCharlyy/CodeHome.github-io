document.addEventListener('DOMContentLoaded', function() {
    /* ---------- Recupera y aplica el tema guardado ---------- */
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      document.documentElement.setAttribute('data-theme', savedTheme);
      document.getElementById('themeSelect').value = savedTheme;
    }
    
    /* ---------- Recupera y aplica el idioma guardado (por defecto 'es') ---------- */
    const savedLanguage = localStorage.getItem('language') || 'es';
    
    /* ---------- Inicializa i18next con recursos para Inglés y Español ---------- */
    i18next.init({
      lng: savedLanguage,
      debug: false,
      resources: {
        en: {
          translation: {
            "nav": {
              "account": "Account",
              "appearance": "Appearance",
              "language": "Language"
            },
            "account": {
              "title": "Account Settings",
              "description": "This section will allow you to manage your account details."
            },
            "appearance": {
              "title": "Appearance Settings",
              "selectTheme": "Select a theme:",
              "saveButton": "Theme Saved"
            },
            "language": {
              "title": "Language Settings",
              "selectLanguage": "Select a language:",
              "saveButton": "Language Saved",
              "spanish": "Spanish",
              "english": "English"
            },
            "theme": {
              "metallic": "Metallic",
              "matte": "Matte",
              "neon": "Neon",
              "cyberpunk": "Cyberpunk",
              "dark": "Dark",
              "light": "Light"
            },
            "footer": {
              "text": "© 2025 Premium Settings. All rights reserved."
            }
          }
        },
        es: {
          translation: {
            "nav": {
              "account": "Cuenta",
              "appearance": "Apariencia",
              "language": "Idioma"
            },
            "account": {
              "title": "Configuración de Cuenta",
              "description": "Esta sección permitirá gestionar los detalles de tu cuenta."
            },
            "appearance": {
              "title": "Configuración de Apariencia",
              "selectTheme": "Selecciona un tema:",
              "saveButton": "Tema Guardado"
            },
            "language": {
              "title": "Configuración de Idioma",
              "selectLanguage": "Selecciona un idioma:",
              "saveButton": "Idioma Guardado",
              "spanish": "Español",
              "english": "Inglés"
            },
            "theme": {
              "metallic": "Metallic",
              "matte": "Matte",
              "neon": "Neon",
              "cyberpunk": "Cyberpunk",
              "dark": "Oscuro",
              "light": "Claro"
            },
            "footer": {
              "text": "© 2025 Premium Settings. Todos los derechos reservados."
            }
          }
        }
      }
    }, function(err, t) {
      updateContent();
    });
    
    /* Función para actualizar el contenido traducido */
    function updateContent() {
      document.querySelectorAll('[data-i18n]').forEach(function(element) {
        const key = element.getAttribute('data-i18n');
        element.innerHTML = i18next.t(key);
      });
    }
    
    /* ---------- Manejo del formulario de Tema ---------- */
    document.getElementById('themeForm').addEventListener('submit', function(e) {
      e.preventDefault();
      const selectedTheme = document.getElementById('themeSelect').value;
      document.documentElement.setAttribute('data-theme', selectedTheme);
      localStorage.setItem('theme', selectedTheme);
      alert(i18next.t('appearance.saveButton') + ': ' + selectedTheme);
    });
    
    /* ---------- Manejo del formulario de Idioma ---------- */
    document.getElementById('languageForm').addEventListener('submit', function(e) {
      e.preventDefault();
      const selectedLanguage = document.getElementById('languageSelect').value;
      i18next.changeLanguage(selectedLanguage, function(err, t) {
        updateContent();
        localStorage.setItem('language', selectedLanguage);
        alert(i18next.t('language.saveButton') + ': ' + selectedLanguage);
      });
    });
    
    /* Establece el valor del select de idioma según el guardado */
    document.getElementById('languageSelect').value = savedLanguage;
    
    /* ---------- Navegación del Sidebar ---------- */
    const sidebarLinks = document.querySelectorAll('.sidebar-link');
    const sections = document.querySelectorAll('.content-section');
    
    sidebarLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        // Quita la clase "active" de todos los links y secciones
        sidebarLinks.forEach(l => l.classList.remove('active'));
        sections.forEach(section => section.classList.remove('active'));
        // Activa el link y la sección correspondiente
        this.classList.add('active');
        const targetId = this.getAttribute('href').substring(1);
        document.getElementById(targetId).classList.add('active');
      });
    });
  });
  