import { useState, useRef, useEffect, useCallback } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import FooterNavBar from '../components/FooterNavBar'
import { generateRungs, LADDER_CONFIG } from '../utils/ladder'
import { useLadderAnimation } from '../hooks/useLadderAnimation'
import arrowLeft from '../assets/arrow-left.svg'
import plus from '../assets/plus.svg'
import refreshCw from '../assets/refresh-cw.svg'
import './LadderPage.css'

const { ROWS, COL_WIDTH, TOP_PAD, ROW_HEIGHT } = LADDER_CONFIG

function LadderPage() {
    const navigate = useNavigate()
    const { planId } = useParams()
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
    }, [n, regenerate])

    const width = n > 0 ? TOP_PAD * 2 + (n - 1) * COL_WIDTH : 0
    const height = TOP_PAD + ROWS * ROW_HEIGHT + 30

    const { animating, finishedIndices, resultText, allResults, start, startAll } =
        useLadderAnimation(canvasRef, n, rungs, width, results)

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
                    <button
                        className="back-btn"
                        onClick={() => navigate(planId ? `/plans/${planId}/tool` : '/tool')}
                    >
                        <img src={arrowLeft} alt="" width={20} height={20} />
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
                            <img src={plus} alt="" width={18} height={18} />
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
                            <div className="ladder-actions">
                                <button
                                    className="all-result-btn"
                                    onClick={() => startAll(participants)}
                                    disabled={animating}
                                >
                                    전체 결과 보기
                                </button>
                                <button className="regen-btn" onClick={regenerate} disabled={animating}>
                                    <img src={refreshCw} alt="" width={14} height={14} /> 다시 만들기
                                </button>
                            </div>
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
                                            className={'result-input' + (finishedIndices.includes(i) ? ' hit' : '')}
                                            style={{ left: TOP_PAD + i * COL_WIDTH }}
                                            value={r}
                                            onChange={(e) => updateResult(i, e.target.value)}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>

                        {resultText && !allResults && (
                            <div className="result-box">
                                <span>결과</span>
                                <strong>{resultText}</strong>
                            </div>
                        )}

                        {allResults && (
                            <div className="all-result-box">
                                <span className="all-result-title">전체 결과</span>
                                {allResults.map((item) => (
                                    <div key={item.from} className="all-result-row">
                                        <strong>{item.from}</strong>
                                        <span className="all-result-arrow">→</span>
                                        <span>{item.to}</span>
                                    </div>
                                ))}
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
