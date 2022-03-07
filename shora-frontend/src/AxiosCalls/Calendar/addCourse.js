import authorizedAxios from "../../Helpers/authorizaedAxios";
import links from "../../Data/Links";
import { getRecoil } from "recoil-nexus";
import { userAtom } from "../../Atoms/userAtom";

export default function addCourse(course_id, onSuccess, onFailure) {

    const user = getRecoil(userAtom)
    let options = {
        method: 'post',
        url: links.courses + `/${course_id}`,
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