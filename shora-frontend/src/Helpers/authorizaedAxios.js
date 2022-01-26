const axios = require('axios');
const authorizedAxios = (options) => {
    if (options.user) {
        if (options.headers)
            options.headers.Authorization = "Bearer " + options.user.token;
        else
            options.headers = {Authorization: "Bearer " + options.user.token}
        delete options.user;
    }
    return axios(options);
}

export default authorizedAxios;