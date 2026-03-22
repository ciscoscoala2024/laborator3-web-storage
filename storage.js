/**
 * Storage Manager - Gestionare localStorage și sessionStorage
 * ACEST COD VĂ ESTE FURNIZAT - NU TREBUIE MODIFICAT
 */
const StorageManager = {
    /**
     * Salvează date în localStorage (persistente - nu expiră niciodată)
     * @param {string} key - Cheia sub care salvăm datele
     * @param {*} value - Valoarea de salvat (orice tip de date)
     * @returns {boolean} - true dacă a reușit, false dacă a eșuat
     */
    setLocal: function(key, value) {
        try {
            // localStorage stochează doar string-uri, deci convertim obiectele în JSON
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (e) {
            console.error('❌ Eroare localStorage:', e);
            return false;  // Poate eșua dacă storage-ul este plin sau dezactivat
        }
    },

    /**
     * Obține date din localStorage
     * @param {string} key - Cheia datelor de recuperat
     * @returns {*} - Datele parseate sau null dacă nu există
     */
    getLocal: function(key) {
        try {
            const item = localStorage.getItem(key);
            // Dacă există, încercăm să parsăm JSON-ul; altfel returnăm null
            return item ? JSON.parse(item) : null;
        } catch (e) {
            // Dacă parsarea eșuează (date corupte), returnăm valoarea brută
            return localStorage.getItem(key);
        }
    },

    /**
     * Șterge o intrare din localStorage
     * @param {string} key - Cheia de șters
     */
    removeLocal: function(key) {
        localStorage.removeItem(key);
    },

    /**
     * Salvează date în sessionStorage (temporare - expiră la închiderea tab-ului)
     * @param {string} key - Cheia sub care salvăm datele
     * @param {*} value - Valoarea de salvat
     * @returns {boolean} - true dacă a reușit, false dacă a eșuat
     */
    setSession: function(key, value) {
        try {
            sessionStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (e) {
            console.error('❌ Eroare sessionStorage:', e);
            return false;
        }
    },

    /**
     * Obține date din sessionStorage
     * @param {string} key - Cheia datelor de recuperat
     * @returns {*} - Datele parseate sau null dacă nu există
     */
    getSession: function(key) {
        try {
            const item = sessionStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch (e) {
            return sessionStorage.getItem(key);
        }
    },

    /**
     * Șterge o intrare din sessionStorage
     * @param {string} key - Cheia de șters
     */
    removeSession: function(key) {
        sessionStorage.removeItem(key);
    },

    /**
     * Golește complet sessionStorage
     */
    clearSession: function() {
        sessionStorage.clear();
    },

    /**
     * Golește complet localStorage
     */
    clearLocal: function() {
        localStorage.clear();
    },

    /**
     * Obține TOATE datele din localStorage ca obiect
     * @returns {Object} - Obiect cu toate perechile cheie-valoare
     */
    getAllLocal: function() {
        const data = {};
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);  // Obținem cheia de la indexul i
            data[key] = this.getLocal(key);   // Recuperăm și parsăm valoarea
        }
        return data;
    },

    /**
     * Obține TOATE datele din sessionStorage ca obiect
     * @returns {Object} - Obiect cu toate perechile cheie-valoare
     */
    getAllSession: function() {
        const data = {};
        for (let i = 0; i < sessionStorage.length; i++) {
            const key = sessionStorage.key(i);
            data[key] = this.getSession(key);
        }
        return data;
    }
};

// Export pentru utilizare globală în browser
window.StorageManager = StorageManager;