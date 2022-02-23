import { userAtom } from "../Atoms/userAtom";
import {getRecoil} from 'recoil-nexus';

export const isOwner = () => {
    const user = getRecoil(userAtom)
    return user.roles.includes('owner');
}

export const isAdmin = () => {
    const user = getRecoil(userAtom)
    return user.roles.includes('admin');
}

export const isFinancial = () => {
    const user = getRecoil(userAtom)
    return user.roles.includes('financial');
}

export const hasAccess = (accesses) => {
    const user = getRecoil(userAtom)
    return accesses.some(item => user.roles.includes(item))
}