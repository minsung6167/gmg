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
        <div className="page">
            <div className="start-page">
                <div className="top-right">
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
                        className="icon-btn"
                        title="목록"
                        onClick={() => navigate('/plans')}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="8" y1="6" x2="21" y2="6"></line>
                            <line x1="8" y1="12" x2="21" y2="12"></line>
                            <line x1="8" y1="18" x2="21" y2="18"></line>
                            <line x1="3" y1="6" x2="3.01" y2="6"></line>
                            <line x1="3" y1="12" x2="3.01" y2="12"></line>
                            <line x1="3" y1="18" x2="3.01" y2="18"></line>
                        </svg>
                    </button>
                </div>

                <button
                    className="pick-button"
                    onClick={() => navigate('/home')}
                >
                    뽑기
                </button>
            </div>
        </div>
    )
}

export default StartPage