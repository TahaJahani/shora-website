import * as React from 'react';
import { useRecoilState } from 'recoil'
import { userAtom } from '../Atoms/userAtom'
import { hasAccess } from "../Helpers/UserHelper"
import AddLostAndFoundForm from "../Components/LostAndFound/AddLostAndFoundForm"
import getLostAndFound from "../AxiosCalls/LostAndFound/getLostAndFound"
import LostAndFoundGrid from '../Components/LostAndFound/LostAndFoundGrid';
import { lostAndFoundAtom } from "../Atoms/lostAndFoundAtom"
import { getRecoil, setRecoil } from 'recoil-nexus';

export default function () {
    const [found, setFound] = useRecoilState(lostAndFoundAtom);

    React.useEffect(() => {
        if (!found) {
            getLostAndFound((res) => {
                setFound(res.data.lost_and_found);
            }, () => { })
        }
    }, [])

    const onAdd = (newItem) => {
        setFound([...found, newItem])
    }
    const onRowDeleted = (deleted_id) => {
        const found = getRecoil(lostAndFoundAtom)
        setRecoil(lostAndFoundAtom, found.filter(item => item.id !== deleted_id))
    }

    return (
        <div>
            {hasAccess(['owner', 'admin', 'financial']) && <AddLostAndFoundForm onAdd={onAdd} />}
            <LostAndFoundGrid found={found} onRowDeleted={onRowDeleted} />
        </div>
    )
}