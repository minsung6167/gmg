import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { signup } from '../api/Login'

function SignupPage() {
    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [userId, setUserId] = useState('')
    const [password, setPassword] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        try {
            await signup({ name, userId, password, phone, email })
            navigate('/login')
        } catch (err) {
            setError(err.message)
        }
    }

    return (
        <div className="signup-page">
            <h2>회원가입</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="이름"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
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
                <input
                    type="text"
                    placeholder="전화번호"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />
                <input
                    type="email"
                    placeholder="이메일"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                {error && <p className="error">{error}</p>}
                <button type="submit">회원가입</button>
            </form>
        </div>
    )
}

export default SignupPage
