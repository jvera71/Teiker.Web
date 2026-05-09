// ============================================
// TEIKER - Shared JavaScript
// ============================================

function detectLanguage() {
    const path = window.location.pathname;
    const langMatch = path.match(/\/(en|es|pt|fr|it|de|ru)\//);
    if (langMatch) {
        return langMatch[1];
    }
    const browserLang = navigator.language.substring(0, 2);
    const supported = ['en', 'es', 'pt', 'fr', 'it', 'de', 'ru'];
    return supported.includes(browserLang) ? browserLang : 'en';
}

let currentLang = detectLanguage();

document.addEventListener('DOMContentLoaded', () => {
    // --- Navbar Scroll Effect ---
    const navbar = document.getElementById('navbar');
    if (navbar) {
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    if (window.scrollY > 50) {
                        navbar.classList.add('scrolled');
                    } else {
                        navbar.classList.remove('scrolled');
                    }
                    ticking = false;
                });
                ticking = true;
            }
        });
    }

    // --- Mobile Hamburger Menu ---
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navLinks.classList.toggle('open');
        });

        // Close menu when a link is clicked
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navLinks.classList.remove('open');
            });
        });

        // Close menu on outside click
        document.addEventListener('click', (e) => {
            if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
                navToggle.classList.remove('active');
                navLinks.classList.remove('open');
            }
        });
    }

    // --- Smooth Scroll ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // --- Scroll Reveal (IntersectionObserver) ---
    const revealElements = document.querySelectorAll(
        '.feature-card, .glass-card, .faq-item, .timeline-item, .business-card'
    );

    if (revealElements.length > 0 && 'IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // Staggered delay for grid children
                    const delay = Math.min(index * 80, 400);
                    entry.target.style.transitionDelay = delay + 'ms';
                    entry.target.classList.add('visible');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -60px 0px'
        });

        revealElements.forEach(el => {
            el.classList.add('reveal');
            revealObserver.observe(el);
        });
    }

    // --- FAQ Accordion (for distribuidores and other pages) ---
    document.querySelectorAll('.faq-question').forEach(item => {
        item.style.cursor = 'pointer';
        item.addEventListener('click', () => {
            const answer = item.nextElementSibling;
            const faqItem = item.closest('.faq-item');
            const isOpen = answer.style.maxHeight && answer.style.maxHeight !== '0px';

            // Simple toggle
            if (isOpen) {
                answer.style.maxHeight = '0px';
                answer.style.opacity = '0';
                faqItem.style.borderColor = '';
            } else {
                answer.style.maxHeight = answer.scrollHeight + 'px';
                answer.style.opacity = '1';
                faqItem.style.borderColor = 'var(--color-primary-200)';
            }
        });
    });

    // --- Formulario de Contacto (Internationalized) ---
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        const submitBtn = document.getElementById('contact-submit');
        const feedback = document.getElementById('contact-feedback');

        const formTranslations = {
            "en": {
                "sending": "Sending...",
                "success": "✓ Message sent successfully. We will contact you soon.",
                "error": "An error occurred. Please try again.",
                "connError": "Could not connect to the server. Please try again later.",
                "button": "I want more information"
            },
            "es": {
                "sending": "Enviando...",
                "success": "✓ Mensaje enviado correctamente. Nos pondremos en contacto contigo pronto.",
                "error": "Ha ocurrido un error. Por favor, inténtalo de nuevo.",
                "connError": "No se ha podido conectar con el servidor. Inténtalo más tarde.",
                "button": "Quiero más información"
            },
            "pt": {
                "sending": "Enviando...",
                "success": "✓ Mensagem enviada com sucesso. Entraremos em contato em breve.",
                "error": "Ocorreu um erro. Por favor, tente novamente.",
                "connError": "Não foi possível conectar ao servidor. Tente mais tarde.",
                "button": "Quero mais informações"
            },
            "fr": {
                "sending": "Envoi en cours...",
                "success": "✓ Message envoyé avec succès. Nous vous contacterons bientôt.",
                "error": "Une erreur est survenue. Veuillez réessayer.",
                "connError": "Impossible de se connecter au serveur. Veuillez réessayer plus tard.",
                "button": "Je souhaite plus d'informations"
            },
            "it": {
                "sending": "Invio in corso...",
                "success": "✓ Messaggio inviato correttamente. Ti contatteremo presto.",
                "error": "Si è verificato un errore. Per favore, riprova.",
                "connError": "Impossibile connettersi al server. Riprova più tardi.",
                "button": "Desidero maggiori informazioni"
            },
            "de": {
                "sending": "Wird gesendet...",
                "success": "✓ Nachricht erfolgreich gesendet. Wir werden uns bald bei Ihnen melden.",
                "error": "Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.",
                "connError": "Verbindung zum Server fehlgeschlagen. Bitte versuchen Sie es später erneut.",
                "button": "Ich möchte mehr Informationen"
            },
            "ru": {
                "sending": "Отправка...",
                "success": "✓ Сообщение успешно отправлено. Мы скоро с вами свяжемся.",
                "error": "Произошла ошибка. Пожалуйста, попробуйте еще раз.",
                "connError": "Не удалось подключиться к серверу. Пожалуйста, попробуйте позже.",
                "button": "Я хочу получить больше информации"
            }
        };

        const t = (key) => (formTranslations[currentLang] || formTranslations['en'])[key];

        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const payload = {
                nombre: document.getElementById('contact-nombre').value.trim(),
                telefono: document.getElementById('contact-telefono').value.trim(),
                email: document.getElementById('contact-email').value.trim(),
                mensaje: document.getElementById('contact-mensaje').value.trim()
            };

            submitBtn.disabled = true;
            submitBtn.textContent = t('sending');
            feedback.style.color = 'rgba(255,255,255,0.8)';
            feedback.textContent = '';

            try {
                const response = await fetch('https://formspree.io/f/xojnrjea', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });

                if (response.ok) {
                    feedback.style.color = 'rgba(150,255,180,0.95)';
                    feedback.textContent = t('success');
                    contactForm.reset();
                } else {
                    feedback.style.color = 'rgba(255,180,150,0.95)';
                    feedback.textContent = t('error');
                }
            } catch (_) {
                feedback.style.color = 'rgba(255,180,150,0.95)';
                feedback.textContent = t('connError');
            } finally {
                submitBtn.disabled = false;
                submitBtn.textContent = t('button');
            }
        });
    }
});


// ============================================
// TEIKER - Chat Widget (Integrated)
// ============================================
(function () {
    const lang = currentLang;


    const translations = {
        "en": {
            "connecting": "Connecting...",
            "online": "Online",
            "offline": "Offline",
            "typing": "Typing...",
            "placeholder": "Type a message...",
            "assistant": "Teiker Assistant",
            "welcomeMessage": "Hello! I'm Teiker, how can I help you?",
            "error": "Sorry, there was an error processing your message.",
            "emptyMessage": "Empty message",
            "messageTooLong": "Message too long",
            "invalidContent": "Invalid content"
        },
        "es": {
            "connecting": "Conectando...",
            "online": "En línea",
            "offline": "Sin conexión",
            "typing": "Escribiendo...",
            "placeholder": "Escribe un mensaje...",
            "assistant": "Asistente Teiker",
            "welcomeMessage": "¡Hola! Soy Teiker, ¿en qué puedo ayudarte?",
            "error": "Lo siento, hubo un error procesando tu mensaje.",
            "emptyMessage": "Mensaje vacío",
            "messageTooLong": "Mensaje demasiado largo",
            "invalidContent": "Contenido inválido"
        },
        "pt": {
            "connecting": "Conectando...",
            "online": "Online",
            "offline": "Offline",
            "typing": "Digitando...",
            "placeholder": "Digite uma mensagem...",
            "assistant": "Assistente Teiker",
            "welcomeMessage": "Olá! Sou Teiker, como posso ajudar?",
            "error": "Desculpe, ocorreu um erro ao processar sua mensagem.",
            "emptyMessage": "Mensagem vazia",
            "messageTooLong": "Mensagem muito longa",
            "invalidContent": "Conteúdo inválido"
        },
        "fr": {
            "connecting": "Connexion...",
            "online": "En ligne",
            "offline": "Hors ligne",
            "typing": "En train d'écrire...",
            "placeholder": "Tapez un message...",
            "assistant": "Assistant Teiker",
            "welcomeMessage": "Bonjour ! Je suis Teiker, comment puis-je vous aider ?",
            "error": "Désolé, une erreur s'est produite lors du traitement de votre message.",
            "emptyMessage": "Message vide",
            "messageTooLong": "Message trop long",
            "invalidContent": "Contenu invalide"
        },
        "it": {
            "connecting": "Connessione...",
            "online": "Online",
            "offline": "Offline",
            "typing": "Sta scrivendo...",
            "placeholder": "Scrivi un messaggio...",
            "assistant": "Assistente Teiker",
            "welcomeMessage": "Ciao! Sono Teiker, come posso aiutarti?",
            "error": "Spiacente, si è verificato un errore nell'elaborazione del messaggio.",
            "emptyMessage": "Messaggio vuoto",
            "messageTooLong": "Messaggio troppo lungo",
            "invalidContent": "Contenuto non valido"
        },
        "de": {
            "connecting": "Verbinden...",
            "online": "Online",
            "offline": "Offline",
            "typing": "Schreibt...",
            "placeholder": "Nachricht eingeben...",
            "assistant": "Teiker Assistent",
            "welcomeMessage": "Hallo! Ich bin Teiker, wie kann ich helfen?",
            "error": "Entschuldigung, bei der Verarbeitung Ihrer Nachricht ist ein Fehler aufgetreten.",
            "emptyMessage": "Leere Nachricht",
            "messageTooLong": "Nachricht zu lang",
            "invalidContent": "Ungültiger Inhalt"
        },
        "ru": {
            "connecting": "Подключение...",
            "online": "Онлайн",
            "offline": "Не в сети",
            "typing": "Набирает...",
            "placeholder": "Введите сообщение...",
            "assistant": "Ассистент Teiker",
            "welcomeMessage": "Здравствуйте! Я Teiker, чем могу помочь?",
            "error": "Извините, произошла ошибка при обработке вашего сообщения.",
            "emptyMessage": "Пустое сообщение",
            "messageTooLong": "Сообщение слишком длинное",
            "invalidContent": "Недопустимое содержание"
        }
    };

    function t(key) {
        return (translations[lang] && translations[lang][key]) ||
            (translations.en && translations.en[key]) || key;
    }

    // Configuration
    const config = Object.assign({
        // Default to the current origin for the SignalR hub.
        // Hardcoded dev tunnels should be avoided in production.
        apiUrl: window.location.origin,
        theme: 'light',
        primaryColor: '#667eea',
        position: 'bottom-right',
        language: currentLang
    }, window.TeikerChatConfig || {});

    // Update language if specified in config
    if (config.language) {
        currentLang = config.language;
    }

    // Helper to load SignalR
    function loadSignalR(callback) {
        if (window.signalR) {
            callback();
            return;
        }
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/microsoft-signalr/8.0.0/signalr.min.js';
        script.onload = callback;
        document.head.appendChild(script);
    }

    // Initialize widget
    initWidget();

    function initWidget() {
        // Create Widget Container
        const container = document.createElement('div');
        container.id = 'teiker-chat-widget-container';
        container.setAttribute('data-theme', config.theme);
        container.style.setProperty('--chat-primary-color', config.primaryColor);

        container.innerHTML = `
            <button class="chat-launcher-btn" aria-label="Open chat">
                <svg viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg>
            </button>
            <div class="chat-window">
                <div class="chat-header">
                    <div class="chat-info">
                        <h3>${t('assistant')}</h3>
                        <span class="status-text">${t('connecting')}</span>
                    </div>
                    <button class="close-btn">×</button>
                </div>
                <div class="chat-messages" id="chatMessages"></div>
                <div class="chat-input-area">
                    <textarea id="chatInput" placeholder="${t('placeholder')}" rows="1"></textarea>
                    <button id="sendButton" class="send-btn" disabled>
                        <svg viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(container);

        // Elements
        const chatWindow = container.querySelector('.chat-window');
        const launcherBtn = container.querySelector('.chat-launcher-btn');
        const closeBtn = container.querySelector('.close-btn');
        const messagesDiv = container.querySelector('.chat-messages');
        const input = container.querySelector('#chatInput');
        const sendBtn = container.querySelector('#sendButton');
        const statusText = container.querySelector('.status-text');

        let connection = null;
        let sessionId = null;

        // Toggle Chat
        function toggleChat() {
            if (chatWindow.classList.contains('open')) {
                chatWindow.classList.remove('open');
                setTimeout(() => {
                    chatWindow.style.display = 'none';
                }, 300);
                launcherBtn.style.display = 'flex';
            } else {
                chatWindow.style.display = 'flex';
                setTimeout(() => chatWindow.classList.add('open'), 10);
                launcherBtn.style.display = 'none';
                if (!connection) {
                    initConnection();
                } else {
                    scrollToBottom();
                }
            }
        }

        launcherBtn.addEventListener('click', toggleChat);
        closeBtn.addEventListener('click', toggleChat);

        // SignalR Connection
        function initConnection() {
            loadSignalR(() => {
                const hubUrl = config.apiUrl ? `${config.apiUrl}/chathub` : '/chathub';
                connection = new signalR.HubConnectionBuilder()
                    .withUrl(hubUrl, {
                        // Skip MS Dev Tunnels anti-phishing page if used for development
                        headers: { "X-Tunnel-Skip-AntiPhishing-Page": "true" }
                    })
                    .withAutomaticReconnect()
                    .build();

                connection.on("SessionStarted", (data) => {
                    sessionId = data.sessionId;
                    statusText.innerText = t('online');
                    addMessage({
                        role: "bot",
                        content: data.welcomeMessage || t('welcomeMessage'),
                        timestamp: new Date()
                    });
                    input.disabled = false;
                    sendBtn.disabled = false;
                });

                connection.on("ReceiveMessage", (data) => {
                    addMessage(data);
                });

                connection.on("MessageReceived", (data) => {
                    // Acknowledge sending
                });

                connection.on("BotTyping", (isTyping) => {
                    let indic = messagesDiv.querySelector('.typing-indicator-msg');
                    if (isTyping) {
                        if (!indic) {
                            const div = document.createElement('div');
                            div.className = 'message bot-message typing-indicator-msg';
                            div.innerText = t('typing');
                            messagesDiv.appendChild(div);
                            scrollToBottom();
                        }
                    } else {
                        if (indic) indic.remove();
                    }
                });

                connection.on("Error", (data) => {
                    addMessage({ role: 'bot', content: data.message || t('error') });
                });

                connection.onreconnecting(() => {
                    statusText.innerText = t('connecting');
                });

                connection.onreconnected(() => {
                    statusText.innerText = t('online');
                });

                connection.onclose(() => {
                    statusText.innerText = t('offline');
                });

                connection.start()
                    .catch(err => {
                        console.error('SignalR Error', err);
                        statusText.innerText = t('offline');
                    });
            });
        }

        function addMessage(msg) {
            const div = document.createElement('div');
            const roleClass = (msg.role === 'User' || msg.role === 'user') ? 'user-message' : 'bot-message';
            div.className = `message ${roleClass}`;
            div.innerText = msg.content;

            const options = msg.options || msg.Options;
            if (options && Array.isArray(options) && options.length > 0) {
                const optionsContainer = document.createElement('div');
                optionsContainer.className = 'chat-options-container';
                options.forEach(opt => {
                    const btn = document.createElement('button');
                    btn.className = 'chat-option-btn';
                    btn.innerText = opt;
                    btn.onclick = () => {
                        sendText(opt);
                        const allBtns = optionsContainer.querySelectorAll('button');
                        allBtns.forEach(b => b.disabled = true);
                    };
                    optionsContainer.appendChild(btn);
                });
                div.appendChild(optionsContainer);
            }

            // Remove typing indicator if exists
            const indic = messagesDiv.querySelector('.typing-indicator-msg');
            if (indic) indic.remove();

            messagesDiv.appendChild(div);
            scrollToBottom();
        }

        function scrollToBottom() {
            messagesDiv.scrollTop = messagesDiv.scrollHeight;
        }

        async function sendText(text) {
            if (!text || !connection) return;

            addMessage({ role: 'user', content: text });

            try {
                await connection.invoke("SendMessage", text);
            } catch (err) {
                console.error(err);
                addMessage({ role: 'bot', content: t('error') });
            }
        }

        // Send Message
        async function sendMessage() {
            const text = input.value.trim();
            if (!text) return;
            input.value = '';
            input.style.height = 'auto';
            await sendText(text);
        }

        sendBtn.addEventListener('click', sendMessage);
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
            }
        });

        // Auto-resize textarea
        input.addEventListener('input', function () {
            this.style.height = 'auto';
            this.style.height = (this.scrollHeight) + 'px';
        });
    }
})();

// ============================================
// Google Analytics (Lazy Loading)
// ============================================
let analyticsLoaded = false;
function loadGoogleAnalytics() {
    if (analyticsLoaded) return;
    analyticsLoaded = true;
    // 1. Cargamos el script externo de Google
    const script = document.createElement('script');
    script.src = 'https://www.googletagmanager.com/gtag/js?id=G-1NH4YR6FW4'; 
    script.async = true;
    document.head.appendChild(script);
    // 2. Iniciamos la configuración de Google Analytics
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-1NH4YR6FW4'); 
    // 3. Limpiamos los eventos para no consumir recursos
    ['scroll', 'mousemove', 'touchstart', 'keydown'].forEach(function(event) {
        window.removeEventListener(event, loadGoogleAnalytics);
    });
}
// Disparamos Analytics cuando el usuario interactúa con la web
['scroll', 'mousemove', 'touchstart', 'keydown'].forEach(function(event) {
    window.addEventListener(event, loadGoogleAnalytics, { once: true, passive: true });
});
// Opcional: Cargar por defecto después de 5 segundos si el usuario no hace nada
setTimeout(loadGoogleAnalytics, 5000);
