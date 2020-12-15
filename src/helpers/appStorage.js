const appStorage = {
    store(token, user) {
        localStorage.setItem('token', token);
        localStorage.setItem('user', user);
    },

    getToken() {
        return localStorage.getItem('token');
    },

    getUser() {
        return localStorage.getItem('user');
    },

    clear() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    },
}

export default appStorage;
