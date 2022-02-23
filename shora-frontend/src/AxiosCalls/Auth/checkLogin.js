import links from "../../Data/Links";
import { setRecoil } from "recoil-nexus";
import {notificationsAtom} from "../../Atoms/notificationsAtom"
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
                setRecoil(notificationsAtom, res.data.data.notifications)
                onSuccess();
            } else{
                onFailure();
            }
        }, (err) => {
            console.log(err.response)
        });
}