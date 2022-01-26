import * as React from 'react';
import { useRecoilState } from 'recoil'
import { useNavigate } from 'react-router-dom';
import { userAtom } from '../Atoms/userAtom';
import { useCookies } from 'react-cookie';
import checkLogin from "../AxiosCalls/Auth/checkLogin"
const axios = require('axios')

function MainPage() {
    const navigate = useNavigate()
    const [user, setUser] = useRecoilState(userAtom)
    const [userCookie, setUserCookie] = useCookies(['user'])

    React.useEffect(() => {
        if (userCookie && userCookie.user) {
            checkLogin(userCookie.user, () => {
                console.log(userCookie.user)
                setUser(userCookie.user)
                navigate('/home')
            }, () => {
                navigate("/login")
            })
        } else {
            navigate('/login')
        }
    }, [])

    return (
        <div>
            <h2>Loading...</h2>
        </div>
    )
}

export default MainPage