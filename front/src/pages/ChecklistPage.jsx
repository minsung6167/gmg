import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, Trash2, ArrowLeft } from 'lucide-react'
import FooterNavBar from '../components/FooterNavBar'
import './ChecklistPage.css'

function ChecklistPage() {
    const navigate = useNavigate()
    const [items, setItems] = useState([])
    const [text, setText] = useState('')

    const addItem = () => {
        const value = text.trim()
        if (!value) return
        setItems([...items, { id: Date.now(), text: value, done: false }])
        setText('')
    }

    const toggleItem = (id) => {
        setItems(
            items.map((item) =>
                item.id === id ? { ...item, done: !item.done } : item
            )
        )
    }

    const removeItem = (id) => {
        setItems(items.filter((item) => item.id !== id))
    }

    const doneCount = items.filter((item) => item.done).length
    const total = items.length
    const percent = total > 0 ? Math.round((doneCount / total) * 100) : 0

    return (
        <div className="page">
            <div className="checklist-page">
                <div className="top-bar">
                    <button className="back-btn" onClick={() => navigate('/tool')}>
                        <ArrowLeft size={20} />
                    </button>
                    <h2>준비물 체크리스트</h2>
                </div>

                <section className="section">
                    <div className="input-row">
                        <input
                            type="text"
                            placeholder="준비물 입력 (예: 여권, 충전기)"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && addItem()}
                        />
                        <button className="add-btn" onClick={addItem}>
                            <Plus size={18} />
                        </button>
                    </div>

                    {total > 0 && (
                        <div className="progress-box">
                            <div className="progress-text">
                                <span>{doneCount} / {total}개 완료</span>
                                <span>{percent}%</span>
                            </div>
                            <div className="progress-bar">
                                <div
                                    className="progress-fill"
                                    style={{ width: `${percent}%` }}
                                />
                            </div>
                        </div>
                    )}

                    <div className="checklist-list">
                        {items.map((item) => (
                            <div
                                key={item.id}
                                className={'checklist-item' + (item.done ? ' done' : '')}
                            >
                                <label className="checklist-label">
                                    <input
                                        type="checkbox"
                                        checked={item.done}
                                        onChange={() => toggleItem(item.id)}
                                    />
                                    <span className="checkmark" />
                                    <span className="item-text">{item.text}</span>
                                </label>
                                <button
                                    className="icon-only"
                                    onClick={() => removeItem(item.id)}
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        ))}
                        {items.length === 0 && (
                            <p className="empty-text">준비물을 추가해보세요</p>
                        )}
                    </div>
                </section>
            </div>
            <FooterNavBar />
        </div>
    )
}

export default ChecklistPage