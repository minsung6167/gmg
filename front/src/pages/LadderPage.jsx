import { useState, useRef, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, ArrowLeft, RefreshCw } from 'lucide-react'
import FooterNavBar from '../components/FooterNavBar'
import { generateRungs, LADDER_CONFIG } from '../utils/ladder'
import { useLadderAnimation } from '../hooks/useLadderAnimation'
import './LadderPage.css'

const { ROWS, COL_WIDTH, TOP_PAD, ROW_HEIGHT } = LADDER_CONFIG

function LadderPage() {
    const navigate = useNavigate()
    const [participants, setParticipants] = useState([])
    const [name, setName] = useState('')
    const [results, setResults] = useState([])
    const [rungs, setRungs] = useState([])
    const canvasRef = useRef(null)
    const n = participants.length

    const regenerate = useCallback(() => {
        if (n >= 2) setRungs(generateRungs(n))
    }, [n])

    useEffect(() => {
        setResults((prev) => {
            const next = [...prev]
            while (next.length < n) next.push(`결과${next.length + 1}`)
            while (next.length > n) next.pop()
            return next
        })
        regenerate()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [n])

    const width = n > 0 ? TOP_PAD * 2 + (n - 1) * COL_WIDTH : 0
    const height = TOP_PAD + ROWS * ROW_HEIGHT + 30

    const { animating, finishedIndex, resultText, start } = useLadderAnimation(
        canvasRef,
        n,
        rungs,
        width,
        results
    )

    const addParticipant = () => {
        const value = name.trim()
        if (!value || participants.includes(value)) return
        setParticipants([...participants, value])
        setName('')
    }

    const removeParticipant = (value) => {
        setParticipants(participants.filter((p) => p !== value))
    }

    const updateResult = (idx, value) => {
        setResults((prev) => prev.map((r, i) => (i === idx ? value : r)))
    }

    return (
        <div className="page">
            <div className="ladder-page">
                <div className="top-bar">
                    <button className="back-btn" onClick={() => navigate('/tool')}>
                        <ArrowLeft size={20} />
                    </button>
                    <h2>사다리타기</h2>
                </div>

                <section className="section">
                    <div className="input-row">
                        <input
                            type="text"
                            placeholder="이름 입력 (예: 철수, 민주)"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && addParticipant()}
                        />
                        <button className="add-btn" onClick={addParticipant}>
                            <Plus size={18} />
                        </button>
                    </div>
                    <div className="chip-list">
                        {participants.map((p) => (
                            <span key={p} className="chip">
                                {p}
                                <button onClick={() => removeParticipant(p)}>×</button>
                            </span>
                        ))}
                        {participants.length === 0 && (
                            <p className="empty-text">참가자를 추가해주세요</p>
                        )}
                    </div>
                </section>

                {n >= 2 && (
                    <section className="section ladder-section">
                        <div className="ladder-header">
                            <h3>이름을 눌러서 시작하세요</h3>
                            <button className="regen-btn" onClick={regenerate} disabled={animating}>
                                <RefreshCw size={14} /> 다시 만들기
                            </button>
                        </div>

                        <div className="ladder-scroll">
                            <div className="ladder-board" style={{ width }}>
                                <div className="name-row" style={{ width }}>
                                    {participants.map((p, i) => (
                                        <button
                                            key={p}
                                            className="name-btn"
                                            style={{ left: TOP_PAD + i * COL_WIDTH }}
                                            onClick={() => start(i)}
                                            disabled={animating}
                                        >
                                            {p}
                                        </button>
                                    ))}
                                </div>

                                <canvas ref={canvasRef} width={width} height={height} className="ladder-canvas" />

                                <div className="result-row" style={{ width }}>
                                    {results.map((r, i) => (
                                        <input
                                            key={i}
                                            className={'result-input' + (finishedIndex === i ? ' hit' : '')}
                                            style={{ left: TOP_PAD + i * COL_WIDTH }}
                                            value={r}
                                            onChange={(e) => updateResult(i, e.target.value)}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>

                        {resultText && (
                            <div className="result-box">
                                <span>결과</span>
                                <strong>{resultText}</strong>
                            </div>
                        )}
                    </section>
                )}

                {n > 0 && n < 2 && (
                    <p className="empty-text">2명 이상 추가해야 사다리를 탈 수 있어요</p>
                )}
            </div>
            <FooterNavBar />
        </div>
    )
}

export default LadderPage