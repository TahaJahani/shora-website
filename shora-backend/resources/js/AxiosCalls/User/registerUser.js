import authorizedAxios from "../../Helpers/authorizaedAxios";
import links from "../../Data/Links";
import { getRecoil, setRecoil } from "recoil-nexus";
import { userAtom } from "../../Atoms/userAtom";
import { usersAtom } from "../../Atoms/usersAtom";
const registerUser = (data, onSuccess, onFailure) => {

    const user = getRecoil(userAtom)
    const studentNumbers = getRecoil(usersAtom)

    let options = {
        method: 'post',
        url: links.registerUser,
        user: user,
        data: Object.fromEntries(Object.entries(data).filter(([_, v]) => v)),
    }
    authorizedAxios(options)
        .then((res) => {
            if (res.data.status === 'ok') {
                let createdUser = res.data.data.user
                setRecoil(usersAtom, [...studentNumbers, {id: createdUser.id, student_number: createdUser.student_number}])
                onSuccess(res.data);
            } else{
                console.log(res)
                onFailure(res.message);
            }
        });
}

export default registerUser;