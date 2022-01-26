import authorizedAxios from "../../Helpers/authorizaedAxios";
import links from "../../Data/Links";
import { getRecoil } from "recoil-nexus";
import { userAtom } from "../../Atoms/userAtom";

export default function completeInfo(data, onSuccess, onFailure) {

    const user = getRecoil(userAtom);

    let filteredData = Object.fromEntries(Object.entries(data).filter(([_, v]) => v != null && v !== ''));

    let options = {
        method: 'post',
        url: links.completeInfo,
        data: filteredData,
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