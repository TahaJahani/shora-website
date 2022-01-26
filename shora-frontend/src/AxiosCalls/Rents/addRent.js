import authorizedAxios from "../../Helpers/authorizaedAxios";
import links from "../../Data/Links";
import { getRecoil } from "recoil-nexus";
import { userAtom } from "../../Atoms/userAtom";
import {rentsAtom} from "../../Atoms/rentsAtom"
import { lockersAtom } from "../../Atoms/lockersAtom";
import { setRecoil } from "recoil-nexus";

export default function addRent(data, onSuccess, onFailure) {
    console.log("Adding rent")
    const user = getRecoil(userAtom)
    const rents = getRecoil(rentsAtom)
    const lockers = getRecoil(lockersAtom)

    let options = {
        method: 'post',
        url: links.addRent,
        user: user,
        data: data,
    }
    authorizedAxios(options)
        .then((res) => {
            if (res.data.status === 'ok') {
                rents && setRecoil(rentsAtom, [...rents, res.data.data.rent])
                if (data.rentable_type === 'locker')
                    lockers && setRecoil(lockersAtom, lockers.filter((locker) => locker.id !== data.rentable_id))
                //TODO: for books
                onSuccess(res.data);
            } else{
                onFailure(res.data.message);
            }
        }, (err) => {
            console.log(err.response)
        });
}