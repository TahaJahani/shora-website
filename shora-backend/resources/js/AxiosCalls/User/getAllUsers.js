import authorizedAxios from "../../Helpers/authorizaedAxios";
import links from "../../Data/Links";
const getAllUsers = (user, onSuccess, onFailure) => {
    let options = {
        method: 'get',
        url: links.getUsers,
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

export default getAllUsers;