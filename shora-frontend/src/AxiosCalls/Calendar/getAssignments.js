import authorizedAxios from "../../Helpers/authorizaedAxios";
import links from "../../Data/Links";
import { getRecoil } from "recoil-nexus";
import { userAtom } from "../../Atoms/userAtom";
import { assignmentsAtom } from "../../Atoms/assignmentsAtom";
import { setRecoil } from "recoil-nexus";

export default function getAssignments(onSuccess, onFailure) {

    const user = getRecoil(userAtom)
    let options = {
        method: 'get',
        url: links.assignments,
        user: user,
    }
    authorizedAxios(options)
        .then((res) => {
            if (res.data.status === 'ok') {
                setRecoil(assignmentsAtom, res.data.data.courses);
                console.log(res.data.data.courses);
                onSuccess(res.data);
            } else
                onFailure(res.data.message);
        }, (err) => {
            console.log(err.response)
        });
}