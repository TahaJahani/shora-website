import authorizedAxios from "../../Helpers/authorizaedAxios";
import links from "../../Data/Links";
import { getRecoil } from "recoil-nexus";
import { userAtom } from "../../Atoms/userAtom";

export default function addRent(onSuccess, onFailure) {
    console.log("Getting rents")
    const user = getRecoil(userAtom)

    let options = {
        method: 'get',
        url: links.getRents,
        user: user,
    }
    authorizedAxios(options)
        .then((res) => {
            if (res.data.status === 'ok') {
                onSuccess(res.data);
            } else{
                onFailure(res.data.message);
            }
        }, (err) => {
            console.log(err.response)
        });
}