import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchMe, logout } from '../api/Login'
import './StartPage.css'

function StartPage() {
    const navigate = useNavigate()
    const [user, setUser] = useState(null)

    useEffect(() => {
        fetchMe().then(setUser)
    }, [])

    const handleLogout = async () => {
        await logout()
        setUser(null)
    }

    return (
        <div className="start-page">
            {user ? (
                <div className="user-info">
                    <span>{user.name}님</span>
                    <button onClick={handleLogout}>로그아웃</button>
                </div>
            ) : (
                <button
                    className="login-button"
                    onClick={() => navigate('/login')}
                >
                    로그인
                </button>
            )}
            <button
                className="pick-button"
                onClick={() => navigate('/random')}
            >
                뽑기
            </button>
        </div>
    )
}

export default StartPage
