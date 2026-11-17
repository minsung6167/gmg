import { useState, useRef, useEffect, useCallback } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import FooterNavBar from '../components/FooterNavBar'
import arrowLeft from '../assets/arrow-left.svg'
import plus from '../assets/plus.svg'
import rotateCw from '../assets/rotate-cw.svg'
import './RoulettePage.css'

const COLORS = ['#494cfc', '#FF6B4A', '#FFD572', '#6EE7B7', '#A78BFA', '#F472B6']

function RoulettePage() {
    const navigate = useNavigate()
    const { planId } = useParams()
    const [members, setMembers] = useState([])
    const [name, setName] = useState('')
    const [rotation, setRotation] = useState(0)
    const [spinning, setSpinning] = useState(false)
    const [result, setResult] = useState(null)
    const canvasRef = useRef(null)

    const addMember = () => {
        const value = name.trim()
        if (!value || members.includes(value)) return
        setMembers([...members, value])
        setName('')
    }

    const removeMember = (value) => {
        setMembers(members.filter((m) => m !== value))
    }

    const drawWheel = useCallback(() => {
        const canvas = canvasRef.current
        if (!canvas || members.length === 0) return
        const ctx = canvas.getContext('2d')
        const displaySize = 280
        const dpr = window.devicePixelRatio || 1

        canvas.width = displaySize * dpr
        canvas.height = displaySize * dpr
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

        const center = displaySize / 2
        const radius = displaySize / 2 - 4
        const sliceAngle = (2 * Math.PI) / members.length

        ctx.clearRect(0, 0, displaySize, displaySize)

        members.forEach((member, i) => {
            const startAngle = i * sliceAngle
            const endAngle = startAngle + sliceAngle

            ctx.beginPath()
            ctx.moveTo(center, center)
            ctx.arc(center, center, radius, startAngle, endAngle)
            ctx.closePath()
            ctx.fillStyle = COLORS[i % COLORS.length]
            ctx.fill()

            ctx.save()
            ctx.translate(center, center)
            ctx.rotate(startAngle + sliceAngle / 2)
            ctx.textAlign = 'right'
            ctx.textBaseline = 'middle'
            ctx.font = '800 16px sans-serif'
            ctx.lineWidth = 3
            ctx.strokeStyle = 'rgba(0, 0, 0, 0.25)'
            ctx.strokeText(member, radius - 16, 0)
            ctx.fillStyle = '#ffffff'
            ctx.fillText(member, radius - 16, 0)
            ctx.restore()
        })
    }, [members])

    useEffect(() => {
        drawWheel()
    }, [drawWheel])

    const spin = () => {
        if (spinning || members.length === 0) return
        setResult(null)
        setSpinning(true)

        const sliceAngleDeg = 360 / members.length
        const randomIndex = Math.floor(Math.random() * members.length)
        const sliceCenterDeg = randomIndex * sliceAngleDeg + sliceAngleDeg / 2
        const pointerAngleDeg = 270
        const desiredMod = ((pointerAngleDeg - sliceCenterDeg) % 360 + 360) % 360
        const extraSpins = 5 * 360
        const currentMod = ((rotation % 360) + 360) % 360
        const delta = ((desiredMod - currentMod) % 360 + 360) % 360
        const finalRotation = rotation + extraSpins + delta

        setRotation(finalRotation)

        setTimeout(() => {
            setSpinning(false)
            setResult(members[randomIndex])
        }, 4000)
    }

    return (
        <div className="page">
            <div className="roulette-page">
                <div className="top-bar">
                    <button
                        className="back-btn"
                        onClick={() => navigate(planId ? `/plans/${planId}/tool` : '/tool')}
                    >
                        <img src={arrowLeft} alt="" width={20} height={20} />
                    </button>
                    <h2>랜덤 룰렛</h2>
                </div>

                <section className="section">
                    <div className="input-row">
                        <input
                            type="text"
                            placeholder="이름 입력 (예: 민수, 지수)"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && addMember()}
                        />
                        <button className="add-btn" onClick={addMember}>
                            <img src={plus} alt="" width={18} height={18} />
                        </button>
                    </div>
                    <div className="chip-list">
                        {members.map((m) => (
                            <span key={m} className="chip">
                                {m}
                                <button onClick={() => removeMember(m)}>×</button>
                            </span>
                        ))}
                        {members.length === 0 && (
                            <p className="empty-text">룰렛에 넣을 이름을 추가해주세요</p>
                        )}
                    </div>
                </section>

                <section className="section wheel-section">
                    <div className="wheel-wrap">
                        <div className="wheel-pointer" />
                        <canvas
                            ref={canvasRef}
                            className="wheel-canvas"
                            style={{
                                transform: `rotate(${rotation}deg)`,
                                transition: spinning
                                    ? 'transform 4s cubic-bezier(0.17, 0.67, 0.21, 1)'
                                    : 'none',
                            }}
                        />
                    </div>

                    <button
                        className="spin-btn"
                        onClick={spin}
                        disabled={members.length < 2 || spinning}
                    >
                        <img src={rotateCw} alt="" width={18} height={18} />
                        {spinning ? '돌아가는 중...' : '돌리기'}
                    </button>

                    {members.length > 0 && members.length < 2 && (
                        <p className="empty-text">2명 이상 추가해야 돌릴 수 있어요</p>
                    )}

                    {result && (
                        <div className="result-box">
                            <span>당첨!</span>
                            <strong>{result}</strong>
                        </div>
                    )}
                </section>
            </div>
            <FooterNavBar />
        </div>
    )
}

export default RoulettePage
