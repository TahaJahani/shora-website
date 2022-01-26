import links from "../../Data/Links";

const axios = require('axios');
export default function resetPassword (data, onSuccess, onFailure) {
    let options = {
        method: 'post',
        url: links.resetPass,
        data: data
    }
    axios(options)
        .then((res) => {
            if (res.data.status === 'ok')
                onSuccess(res.data);
            else 
                onFailure(res.data.message);
        });
}