import url from "./url"

const token = {
    isValid(token) {
        const payload = this.payload(token);

        if (payload) {
            return payload.iss === url.make("api/auth/login") || payload.iss === url.make("api/auth/refresh") || payload.iss === url.make("api/auth/register") ? true : false;
        }

        return false;
    },

    // Check if the token is expired
    tokenExpired(token) {
        const payload = this.payload(token);
        const expirationTime = new Date((payload.exp * 1000) - 300000);

        if (expirationTime <= new Date()) {
            return true;
        }

        return false;
    },

    // Check if the token is 15 minutes old and needs to be refreshed
    tokenNeedsRefresh(token) {
        const payload = this.payload(token);
        const expirationTime = new Date((payload.nbf * 1000) + 900000);

        if (expirationTime < new Date()) {
            return true;
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
