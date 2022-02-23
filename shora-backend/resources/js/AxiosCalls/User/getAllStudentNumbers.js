import authorizedAxios from "../../Helpers/authorizaedAxios";
import links from "../../Data/Links";
import {getRecoil} from "recoil-nexus";
import {userAtom} from "../../Atoms/userAtom";
const getAllStudentNumbers = (onSuccess, onFailure) => {
    const user = getRecoil(userAtom)
    let options = {
        method: 'get',
        url: links.getStudentNumbers,
        user: user,
    }
    authorizedAxios(options)
        .then((res) => {
            if (res.data.status === 'ok')
                onSuccess(res.data);
            else
                onFailure(res.message);
        });
}

export default getAllStudentNumbers;