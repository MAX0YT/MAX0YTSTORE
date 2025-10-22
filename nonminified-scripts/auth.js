import { 
    auth, 
    signInWithEmailAndPassword, 
    signOut, 
    onAuthStateChanged
} from './firebase.js';

export class AuthManager {
    constructor() {
        this.currentUser = null;
        this.init();
    }

    init() {
        onAuthStateChanged(auth, (user) => {
            this.currentUser = user;
            this.updateUI();
            
            if (user && window.location.pathname.includes('Authorization.html')) {
                window.location.href = '/index.html';
            }
        });
    }

    async login(email, password) {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            return { success: true, user: userCredential.user };
        } catch (error) {
            let errorMessage = error.message;
            return { success: false, error: errorMessage };
        }
    }

    async logout() {
        try {
            await signOut(auth);
            window.location.href = '/index.html';
            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    // Обновление UI в зависимости от статуса
    updateUI() {
        const loginButton = document.querySelector('a[href="/HTML/Authorization.html"]');
        
        if (this.currentUser) {
            if (loginButton) {
                loginButton.innerHTML = `
                    <button type="button" class="hover:text-viol text-yell bg-viol hover:bg-yell focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center">
                        ${this.currentUser.email}
                    </button>
                `;
                loginButton.href = "/HTML/Profile.html";
                this.addLogoutButton();
            }
        }
    }

    addLogoutButton() {
        if (document.getElementById('logout-btn')) return;

        const nav = document.getElementById('loginDiv');
        if (nav) {
            const logoutBtn = document.createElement('button');
            logoutBtn.id = 'logout-btn';
            logoutBtn.className = 'ml-2 hover:text-viol text-yell bg-red-600 hover:bg-red-700 font-medium rounded-lg text-sm px-4 py-2 text-center ml-2';
            logoutBtn.textContent = 'Выйти';
            logoutBtn.onclick = () => this.logout();
            
            nav.appendChild(logoutBtn);
        }
    }
}

// Создаем глобальный экземпляр
const authManager = new AuthManager();
export { authManager };