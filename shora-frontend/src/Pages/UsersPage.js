import * as React from 'react';
import { useRecoilState } from 'recoil';
import { userAtom } from '../Atoms/userAtom';
import getAllUsers from '../AxiosCalls/User/getAllUsers';
import UsersGrid from '../Components/UsersGrid';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default function ({setSelectedItem}) {
    const [user, setUser] = useRecoilState(userAtom);
    const [usersList, setUsersList] = React.useState(null);

    
    React.useEffect(() => {
        setSelectedItem('اعضای شورا');
        getAllUsers(user, (res) => {setUsersList(res.data)}, () => {})
    }, [])
    return (
        <ReactCSSTransitionGroup
            transitionAppear={true}
            transitionAppearTimeout={600}
            transitionEnterTimeout={600}
            transitionLeaveTimeout={200}
            transitionName={'SlideIn'}
        >
            <UsersGrid users={usersList} />
        </ReactCSSTransitionGroup>
    )
}