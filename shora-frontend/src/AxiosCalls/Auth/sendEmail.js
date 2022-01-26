import links from "../../Data/Links";

const axios = require('axios');
const sendEmail = (email, onSuccess, onFailure) => {
    let options = {
        method: 'post',
        url: links.sendEmail,
        data: {
            email: email
        }
    }
    axios(options)
        .then((res) => {
            if (res.data.status === 'ok')
                onSuccess(res.data);
            else
                onFailure(res.message);
        });
}

export default sendEmail;