/*
Imgur
Authorization: Client-ID YOUR_CLIENT_ID
-----
Client ID:
6607c0024e28969
Client secret:
<redacted>
*/

/*
After auth gets redirected to URL:
http://localhost:8080/oauth2/callback#
access_token=<redacted>&
expires_in=315360000&
token_type=bearer&
refresh_token=<redacted>&
account_username=astrogaut&
account_id=147070819
*/

import qs from 'qs'
import axios from 'axios'

const CLIENT_ID = '6607c0024e28969'
const ROOT_URL = 'https://api.imgur.com'

export default {
    login() {
        // https://api.imgur.com/oauth2/authorize?
        // client_id=YOUR_CLIENT_ID&
        // response_type=REQUESTED_RESPONSE_TYPE&
        // state=APPLICATION_STATE
        const querystring = {
            client_id: CLIENT_ID,
            response_type: 'token',
        };

        window.location = `${ROOT_URL}/oauth2/authorize?${qs.stringify(querystring)}`;
    },
    getToken(args) {
        const parsedArgs = qs.parse(args);
        return parsedArgs.access_token;
    },
    fetchImages(access_token) {
        return axios.get(`${ROOT_URL}/3/account/me/images`, {
            headers: {
                Authorization: `Bearer ${access_token}`
            },
        });
    },
    upload(images, access_token) {
        const promises = Array.from(images).map(image => {
            const formData = new FormData();
            formData.append('image', image);
            return axios.post(`${ROOT_URL}/3/image`, formData, {
                    headers: {
                        Authorization: `Bearer ${access_token}`,
                    },
                });
        });
        return Promise.all(promises);
    },
};