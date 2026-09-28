import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../api/Login'

function LoginPage() {
    const navigate = useNavigate()
    const [userId, setUserId] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        try {
            await login({ userId, password })
            navigate('/')
        } catch (err) {
            setError(err.message)
        }
    }

    return (
        <div className="login-page">
            <h2>로그인</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="아이디"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="비밀번호"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {error && <p className="error">{error}</p>}
                <button type="submit">로그인</button>
            </form>
            <button type="button" onClick={() => navigate('/signup')}>
                회원가입
            </button>


        </div>
    )
}

export default LoginPage
