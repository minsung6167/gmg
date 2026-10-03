import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { signup } from '../api/Login'
import './SignupPage.css'

function SignupPage() {
    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [userId, setUserId] = useState('')
    const [password, setPassword] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [error, setError] = useState('')
    const [invalidFields, setInvalidFields] = useState({})

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')

        const fields = { name, userId, password, phone, email }
        const empty = Object.keys(fields).filter((key) => !fields[key].trim())

        if (empty.length > 0) {
            setInvalidFields(Object.fromEntries(empty.map((key) => [key, true])))
            setError('빈 칸을 모두 채워주세요.')
            return
        }

        setInvalidFields({})

        try {
            await signup({ name, userId, password, phone, email })
            navigate('/login')
        } catch (err) {
            if (err.message.includes('중복')) {
                setInvalidFields({ userId: true })
            }
            setError(err.message)
        }
    }

    return (
        <div className="page">
            <div className="signup-page">
                <h2>회원가입</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="이름"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className={invalidFields.name ? 'invalid' : ''}
                    />
                    <input
                        type="text"
                        placeholder="아이디"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        className={invalidFields.userId ? 'invalid' : ''}
                    />
                    <input
                        type="password"
                        placeholder="비밀번호"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={invalidFields.password ? 'invalid' : ''}
                    />
                    <input
                        type="text"
                        placeholder="전화번호"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className={invalidFields.phone ? 'invalid' : ''}
                    />
                    <input
                        type="email"
                        placeholder="이메일"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={invalidFields.email ? 'invalid' : ''}
                    />
                    {error && <p className="error">{error}</p>}
                    <button type="submit">회원가입</button>
                </form>
            </div>
        </div>
    )
}

export default SignupPage