/**
 * Cookie Manager - Funcții utilitare pentru gestionarea cookie-urilor
 * ACEST COD VĂ ESTE FURNIZAT - NU TREBUIE MODIFICAT
 */
const CookieManager = {
    /**
     * Setează un cookie
     * @param {string} name - Numele cookie-ului
     * @param {string} value - Valoarea cookie-ului
     * @param {number} days - Numărul de zile până la expirare
     * @param {string} path - Calea (default: '/')
     */
    set: function(name, value, days = 365, path = '/') {
        let expires = '';
        if (days) {
            const date = new Date();
            // Calculează data de expirare: data curentă + (zile * 24h * 60min * 60sec * 1000ms)
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = '; expires=' + date.toUTCString();
        }
        // Construiește string-ul cookie și îl asignă
        // encodeURIComponent asigură că caracterele speciale sunt escape-uite corect
        document.cookie = name + '=' + encodeURIComponent(value) + expires + '; path=' + path;
        console.log(`🍪 Cookie setat: ${name}=${value}`);
    },

    /**
     * Obține valoarea unui cookie
     * @param {string} name - Numele cookie-ului
     * @returns {string|null} - Valoarea cookie-ului sau null dacă nu există
     */
    get: function(name) {
        const nameEQ = name + '=';  // Căutăm "nume=" în string-ul de cookies
        const cookies = document.cookie.split(';');  // Separăm cookies individuale
        
        for (let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i].trim();  // Eliminăm spațiile de la început/sfârșit
            if (cookie.indexOf(nameEQ) === 0) {  // Dacă cookie-ul începe cu "nume="
                // Extragem valoarea și o decodificăm
                return decodeURIComponent(cookie.substring(nameEQ.length));
            }
        }
        return null;  // Cookie-ul nu a fost găsit
    },

    /**
     * Șterge un cookie
     * @param {string} name - Numele cookie-ului
     */
    delete: function(name) {
        // Pentru a șterge un cookie, îl setăm cu o dată de expirare în trecut
        this.set(name, '', -1);
        console.log(`🗑️ Cookie șters: ${name}`);
    },

    /**
     * Obține toate cookie-urile ca obiect JavaScript
     * @returns {Object} - Obiect cu perechi cheie-valoare
     */
    getAll: function() {
        const cookies = {};
        if (document.cookie) {  // Verificăm dacă există cookie-uri
            document.cookie.split(';').forEach(cookie => {
                const [name, value] = cookie.trim().split('=');  // Separăm nume și valoare
                if (name) {
                    cookies[name] = decodeURIComponent(value || '');
                }
            });
        }
        return cookies;
    },

    /**
     * Șterge toate cookie-urile
     */
    deleteAll: function() {
        const cookies = this.getAll();  // Obținem toate cookie-urile
        for (const name in cookies) {
            this.delete(name);  // Ștergem fiecare cookie individual
        }
        console.log('🧹 Toate cookie-urile au fost șterse');
    },

    /**
     * Verifică dacă un cookie există
     * @param {string} name - Numele cookie-ului
     * @returns {boolean} - true dacă există, false dacă nu
     */
    exists: function(name) {
        return this.get(name) !== null;
    }
};

// Export pentru utilizare globală în browser
// Acest lucru permite accesarea CookieManager din orice alt script
window.CookieManager = CookieManager;