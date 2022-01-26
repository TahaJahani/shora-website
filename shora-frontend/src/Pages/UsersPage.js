import * as React from 'react';
import { useRecoilState } from 'recoil';
import { userAtom } from '../Atoms/userAtom';
import getAllUsers from '../AxiosCalls/User/getAllUsers';
import UsersGrid from '../Components/UsersGrid';

export default function () {
    const [user, setUser] = useRecoilState(userAtom);
    const [usersList, setUsersList] = React.useState(null);

    
    React.useEffect(() => {
        getAllUsers(user, (res) => {setUsersList(res.data)}, () => {})
    }, [])
    return (
        <div>
            <UsersGrid users={usersList} />
        </div>
    )
}