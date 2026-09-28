const BASE_URL = 'http://localhost:8080'

export async function signup({ name, userId, password, phone, email }) {
    const res = await fetch(`${BASE_URL}/api/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ name, userId, password, phone, email }),
    })
    if (!res.ok) {
        const message = await res.text()
        throw new Error(message || '회원가입에 실패했습니다.')
    }
}

export async function login({ userId, password }) {
    const res = await fetch(`${BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ userId, password }),
    })
    if (!res.ok) {
        throw new Error('아이디 또는 비밀번호가 올바르지 않습니다.')
    }
}

export async function fetchMe() {
    const res = await fetch(`${BASE_URL}/api/auth/me`, {
        credentials: 'include',
    })
    if (!res.ok) {
        return null
    }
    return res.json()
}


export async function logout() {
    await fetch(`${BASE_URL}/api/auth/logout`, {
        method: 'POST',
        credentials: 'include',
    })
}
