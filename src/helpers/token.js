import url from "./url"

const token = {
    isValid(token) {
        const payload = this.payload(token);

        if (payload) {
            return payload.iss === url.make("api/auth/login") || payload.iss === url.make("api/auth/refresh") ? true : false;
        }

        return false;
    },

    payload(token) {
        const payload = token.split('.')[1];
        return this.decode(payload);
    },

    decode(payload) {
        return JSON.parse(atob(payload));
    },
}


export default token;
