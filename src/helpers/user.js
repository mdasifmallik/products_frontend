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

    // Check if token stored and it's valid
    hasValidToken() {
        const storedToken = appStorage.getToken();
        if (storedToken) {
            if (token.isValid(storedToken)) {
                return token.tokenExpired(storedToken) ? false : true
            }
        }
        return false
    },

    // Refresh token if it's need to be and return true if everything is ok 
    async refreshToken() {
        let bool = false;
        
        if (this.hasValidToken()) {
            bool = true;
            if (token.tokenNeedsRefresh(appStorage.getToken())) {
                await axios
                    .post(
                        url.make("api/auth/refresh"), {}, {
                            headers: {
                                Authorization: this.authToken(),
                            },
                        }
                    )
                    .then((result) => {
                        this.responseAfterLogin(result);
                        bool = true;
                    })
                    .catch((error) => {
                        console.log(error.response.data);
                        bool = false;
                    })
            }
        }

        return bool;
    },

    authToken() {
        const token = appStorage.getToken();

        if (this.hasValidToken(token)) {
            return "Bearer" + token;
        } else {
            return null;
        }
    },

    name() {
        if (this.hasValidToken()) {
            return appStorage.getUser()
        }
    },

    logout() {
        appStorage.clear()
    }
}

export default user;