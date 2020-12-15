import appStorage from './appStorage'
import token from './token'
import url from './url'
import axios from "axios";

const user = {
    responseAfterLogin(res) {
        let access_token = res.data.access_token
        let username = res.data.name

        if (token.isValid(access_token)) {
            appStorage.store(access_token, username)
        }
    },

    hasToken() {
        const storedToken = appStorage.getToken();
        if (storedToken) {
            return token.isValid(storedToken) ? true : false
        }
        return false
    },

    authToken() {
        const token = appStorage.getToken();

        if (this.hasToken(token)) {
            return "Bearer" + token;
        } else {
            return null;
        }
    },

    name() {
        if (this.hasToken()) {
            return appStorage.getUser()
        }
    },

    async loginCheck() {
        let bool = false;
        await axios
            .get(
                url.make("api/auth/loginCheck"), {
                    headers: {
                        Authorization: this.authToken(),
                    },
                }
            )
            .then(() => {
                bool = true;
            })
            .catch(() => {
                bool = false;
            })
        return bool;
    },

    logout() {
        appStorage.clear()
    }
}

export default user;