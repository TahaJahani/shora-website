import authorizedAxios from "../../Helpers/authorizaedAxios";
import links from "../../Data/Links";
import { getRecoil } from "recoil-nexus";
import { userAtom } from "../../Atoms/userAtom";
import { assignmentsAtom } from "../../Atoms/assignmentsAtom";
import { setRecoil } from "recoil-nexus";

export default function addAssignment(data, onSuccess, onFailure) {

    const user = getRecoil(userAtom)
    let options = {
        method: 'post',
        url: links.courses,
        user: user,
        data: data,
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