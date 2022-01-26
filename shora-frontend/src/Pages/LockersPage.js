import * as React from 'react';
import { lockersDetailAtom } from '../Atoms/lockresDetailAtom';
import getLockersList from "../AxiosCalls/Lockers/getLockersList"
import LockerGroup from "../Components/Lockers/LockerGroup"
import { useRecoilState } from 'recoil';

export default function () {

    const [lockers, setLockers] = useRecoilState(lockersDetailAtom)

    React.useEffect(() => {
        getLockersList((res) => {
            setLockers(res.data.lockers);
        }, () => { })
    }, [])

    return (
        <div>
            <LockerGroup lockers={lockers}/>
        </div>
    )
}