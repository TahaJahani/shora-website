import authorizedAxios from "../../Helpers/authorizaedAxios";
import links from "../../Data/Links";
import { getRecoil } from "recoil-nexus";
import { userAtom } from "../../Atoms/userAtom";
import { demandsAtom } from "../../Atoms/demandsAtom";
import { setRecoil } from "recoil-nexus";

export default function getDemands(data, onSuccess, onFailure) {

    const user = getRecoil(userAtom)
    let filteredData = Object.fromEntries(Object.entries(data).filter(([_, v]) => v && v != null && v !== '' && v != 0));
    let options = {
        method: 'get',
        url: links.getDemands,
        params: filteredData,
        user: user,
    }
    authorizedAxios(options)
        .then((res) => {
            if (res.data.status === 'ok') {
                onSuccess(res.data);
            } else
                onFailure(res.data.message);
        }, (err) => {
            console.log(err.response)
        });
}