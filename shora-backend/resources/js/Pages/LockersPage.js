import * as React from 'react';
import { lockersDetailAtom } from '../Atoms/lockresDetailAtom';
import getLockersList from "../AxiosCalls/Lockers/getLockersList"
import LockerGroup from "../Components/Lockers/LockerGroup"
import { useRecoilState } from 'recoil';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default function ({setSelectedItem}) {

    const [lockers, setLockers] = useRecoilState(lockersDetailAtom)

    React.useEffect(() => {
        setSelectedItem('کمدها');
        let resdatalocker = JSON.parse(localStorage.getItem("resdatalocker"));
        if (resdatalocker != undefined && resdatalocker != null) {
            setLockers(resdatalocker.lockers);
        }
        getLockersList((res) => {
            setLockers(res.data.lockers);
            localStorage.setItem("resdatalocker", JSON.stringify(res.data));
        }, () => { })
    }, [])

    return (
        <div>
            <ReactCSSTransitionGroup
        transitionAppear={true}
        transitionAppearTimeout={600}
        transitionEnterTimeout={600}
        transitionLeaveTimeout={200}
        transitionName={'SlideIn'}
        >
            <LockerGroup lockers={lockers}/>
            </ReactCSSTransitionGroup>
        </div>
    )
}