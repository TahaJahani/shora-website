import authorizedAxios from "../../Helpers/authorizaedAxios";
import links from "../../Data/Links";
import { getRecoil } from "recoil-nexus";
import { userAtom } from "../../Atoms/userAtom";
import { demandCategoryAtom } from "../../Atoms/demandCategoryAtom";
import { setRecoil } from "recoil-nexus";

export default function getDemands(onSuccess, onFailure) {

    const user = getRecoil(userAtom)
    let options = {
        method: 'get',
        url: links.getDemandCategories,
        user: user,
    }
    authorizedAxios(options)
        .then((res) => {
            if (res.data.status === 'ok') {
                setRecoil(demandCategoryAtom, res.data.data.categories);
                console.log(res.data.data.categories);
                onSuccess(res.data);
            } else
                onFailure(res.data.message);
        }, (err) => {
            console.log(err.response)
        });
}