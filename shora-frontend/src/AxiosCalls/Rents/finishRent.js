import authorizedAxios from "../../Helpers/authorizaedAxios";
import links from "../../Data/Links";
import { getRecoil } from "recoil-nexus";
import { userAtom } from "../../Atoms/userAtom";
import {rentsAtom} from "../../Atoms/rentsAtom"
import { lockersDetailAtom } from "../../Atoms/lockresDetailAtom";
import { lockersAtom } from "../../Atoms/lockersAtom";
import { setRecoil } from "recoil-nexus";

export default function finishRent(data, onSuccess, onFailure) {
    const user = getRecoil(userAtom)
    const rents = getRecoil(rentsAtom)
    const lockers = getRecoil(lockersDetailAtom)

    let options = {
        method: 'post',
        url: links.finishRent,
        user: user,
        data: data,
    }
    authorizedAxios(options)
        .then((res) => {
            if (res.data.status === 'ok') {
                rents && setRecoil(rentsAtom, rents.filter((rent) => rent.id !== data.rent_id))
                lockers && setRecoil(lockersAtom, lockers.filter(locker => {
                    if (locker.id === data.rentable_id){
                        let this_locker = JSON.parse(JSON.stringify(locker))
                        this_locker.rents.pop()
                        return this_locker
                    }
                    return locker;
                }))
                onSuccess(res.data);
            } else{
                onFailure(res.data.message);
            }
        }, (err) => {
            console.log(err.response)
        });
}