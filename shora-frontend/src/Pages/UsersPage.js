import * as React from 'react';
import { useRecoilState } from 'recoil';
import { userAtom } from '../Atoms/userAtom';
import getAllUsers from '../AxiosCalls/User/getAllUsers';
import UsersGrid from '../Components/UsersGrid';

export default function ({setSelectedItem}) {
    const [user, setUser] = useRecoilState(userAtom);
    const [usersList, setUsersList] = React.useState(null);

    
    React.useEffect(() => {
        setSelectedItem('کاربران');
        getAllUsers(user, (res) => {setUsersList(res.data)}, () => {})
    }, [])
    return (
        <UsersGrid users={usersList} />
    )
}