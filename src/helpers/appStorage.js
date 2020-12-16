const appStorage = {
    store(token, user) {
        localStorage.setItem('token_4692', token);
        localStorage.setItem('user', user);
    },

    getToken() {
        return localStorage.getItem('token_4692');
    },

    getUser() {
        return localStorage.getItem('user');
    },

    clear() {
        localStorage.removeItem('token_4692');
        localStorage.removeItem('user');
    },
}

export default appStorage;
