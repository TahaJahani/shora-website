import links from "../../Data/Links";
const axios = require('axios')

export default function checkLogin(user, onSuccess, onFailure) {
    console.log("checking login...")
    let options = {
        method: 'get',
        url: links.checkLogin,
        params: {
            token: user.token
        }
    }
    axios(options)
        .then((res) => {
            if (res.data.status === 'ok') {
                onSuccess();
            } else{
                onFailure();
            }
        }, (err) => {
            console.log(err.response)
        });
}