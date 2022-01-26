import * as React from 'react';
import AddRentForm from '../Components/AddRentForm';
import RentsGrid from '../Components/RentsGrid';
import { rentsAtom } from '../Atoms/rentsAtom';
import {useRecoilState} from "recoil"
import getRents from "../AxiosCalls/Rents/getRents"

export default function() {

    const [rents, setRents] = useRecoilState(rentsAtom)

    React.useEffect(() => {
        if (!rents)
            getRents((res) => setRents(res.data.rents))
    }, [])

    return(
        <div style={{height: '100%'}}>
            <AddRentForm />
            <RentsGrid rents={rents} />
        </div>
    )
}