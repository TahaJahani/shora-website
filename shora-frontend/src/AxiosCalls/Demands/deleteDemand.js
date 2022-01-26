import authorizedAxios from "../../Helpers/authorizaedAxios";
import links from "../../Data/Links";
import { getRecoil } from "recoil-nexus";
import { userAtom } from "../../Atoms/userAtom";
import { demandsAtom } from "../../Atoms/demandsAtom";
import { setRecoil } from "recoil-nexus";

export default function deleteDemand(id, onSuccess, onFailure) {

    const user = getRecoil(userAtom)

    let options = {
        method: 'delete',
        url: links.getDemands + `/${id}`,
        params: data,
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