import authorizedAxios from "../../Helpers/authorizaedAxios";
import links from "../../Data/Links";
import { getRecoil } from "recoil-nexus";
import { userAtom } from "../../Atoms/userAtom";
import { coursesAtom } from "../../Atoms/coursesAtom";
import { setRecoil } from "recoil-nexus";

export default function getCourses(onSuccess, onFailure) {

    const user = getRecoil(userAtom)
    let options = {
        method: 'get',
        url: links.courses,
        user: user,
    }
    authorizedAxios(options)
        .then((res) => {
            if (res.data.status === 'ok') {
                setRecoil(coursesAtom, res.data.data.courses);
                console.log(res.data.data.courses);
                onSuccess(res.data);
            } else
                onFailure(res.data.message);
        }, (err) => {
            console.log(err.response)
        });
}