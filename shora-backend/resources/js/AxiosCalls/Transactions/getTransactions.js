import authorizedAxios from "../../Helpers/authorizaedAxios";
import links from "../../Data/Links";
import { getRecoil, setRecoil } from "recoil-nexus";
import { userAtom } from "../../Atoms/userAtom";
import {transactionsAtom} from "../../Atoms/transactionsAtom"

export default function getTransactions(onSuccess, onFailure) {
    console.log("Getting transactions...")
    const user = getRecoil(userAtom)

    let options = {
        method: 'get',
        url: links.getTransactions,
        user: user,
    }
    authorizedAxios(options)
        .then((res) => {
            if (res.data.status === 'ok') {
                setRecoil(transactionsAtom, res.data.data.transactions)
                console.log(res.data.data.transactions)
                onSuccess(res.data);
            } else{
                onFailure(res.data.message);
            }
        }, (err) => {
            console.log(err.response)
        });
}