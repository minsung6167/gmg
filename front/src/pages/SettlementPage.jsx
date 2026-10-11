import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, ArrowRight, ArrowLeft } from 'lucide-react'
import FooterNavBar from '../components/FooterNavBar'
import ExpenseItem from '../components/ExpenseItem'
import { calculateSettlements } from '../utils/settlement'
import './SettlementPage.css'

function SettlementPage() {
    const navigate = useNavigate()
    const [members, setMembers] = useState([])
    const [memberName, setMemberName] = useState('')
    const [expenses, setExpenses] = useState([])
    const [payer, setPayer] = useState('')
    const [amount, setAmount] = useState('')
    const [memo, setMemo] = useState('')

    const addMember = () => {
        const name = memberName.trim()
        if (!name || members.includes(name)) return
        setMembers([...members, name])
        setMemberName('')
    }

    const removeMember = (name) => {
        setMembers(members.filter((m) => m !== name))
        setExpenses(expenses.filter((e) => e.payer !== name))
    }

    const addExpense = () => {
        const value = Number(amount)
        if (!payer || !value || value <= 0) return
        setExpenses([...expenses, { id: Date.now(), payer, amount: value, memo: memo.trim() }])
        setAmount('')
        setMemo('')
    }

    const removeExpense = (id) => {
        setExpenses(expenses.filter((e) => e.id !== id))
    }

    const total = expenses.reduce((sum, e) => sum + e.amount, 0)
    const share = members.length > 0 ? total / members.length : 0
    const balances = members.map((name) => {
        const paid = expenses.filter((e) => e.payer === name).reduce((sum, e) => sum + e.amount, 0)
        return { name, paid, balance: paid - share }
    })
    const transactions = calculateSettlements(balances)

    return (
        <div className="page">
            <div className="settlement-page">
                <div className="top-bar">
                    <button className="back-btn" onClick={() => navigate('/tool')}>
                        <ArrowLeft size={20} />
                    </button>
                    <h2>정산시스템</h2>
                </div>

                <section className="section">
                    <h3>참여 인원</h3>
                    <div className="input-row">
                        <input
                            type="text"
                            placeholder="이름 입력"
                            value={memberName}
                            onChange={(e) => setMemberName(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && addMember()}
                        />
                        <button className="add-btn" onClick={addMember}>
                            <Plus size={18} />
                        </button>
                    </div>
                    <div className="chip-list">
                        {members.map((name) => (
                            <span key={name} className="chip">
                                {name}
                                <button onClick={() => removeMember(name)}>×</button>
                            </span>
                        ))}
                        {members.length === 0 && <p className="empty-text">참여할 사람을 먼저 추가해주세요</p>}
                    </div>
                </section>

                <section className="section">
                    <h3>지출 내역</h3>
                    <div className="expense-form">
                        <select value={payer} onChange={(e) => setPayer(e.target.value)}>
                            <option value="">낸 사람</option>
                            {members.map((name) => (
                                <option key={name} value={name}>{name}</option>
                            ))}
                        </select>
                        <input type="number" placeholder="금액" value={amount} onChange={(e) => setAmount(e.target.value)} />
                        <input type="text" placeholder="메모 (예: 숙소비, 고기값)" value={memo} onChange={(e) => setMemo(e.target.value)} />
                        <button className="add-btn full" onClick={addExpense}>
                            <Plus size={18} /> 추가
                        </button>
                    </div>

                    <div className="expense-list">
                        {expenses.map((e) => (
                            <ExpenseItem key={e.id} expense={e} members={members} onRemove={removeExpense} />
                        ))}
                        {expenses.length === 0 && <p className="empty-text">아직 등록된 지출이 없어요</p>}
                    </div>
                </section>

                {members.length > 0 && expenses.length > 0 && (
                    <section className="section">
                        <h3>정산 결과</h3>
                        <div className="summary-box">
                            <div className="summary-row"><span>총 지출</span><span>{total.toLocaleString()}원</span></div>
                            <div className="summary-row"><span>1인당</span><span>{Math.round(share).toLocaleString()}원</span></div>
                        </div>

                        <div className="balance-list">
                            {balances.map((b) => (
                                <div key={b.name} className="balance-item">
                                    <span>{b.name}</span>
                                    <span className={b.balance > 0 ? 'plus' : b.balance < 0 ? 'minus' : ''}>
                                        {b.balance > 0 ? '+' : ''}{Math.round(b.balance).toLocaleString()}원
                                    </span>
                                </div>
                            ))}
                        </div>

                        <h3 className="sub-title">보내야 할 돈</h3>
                        {transactions.length === 0 ? (
                            <p className="empty-text">이미 정산이 맞아요!</p>
                        ) : (
                            <div className="transaction-list">
                                {transactions.map((t, idx) => (
                                    <div key={idx} className="transaction-item">
                                        <span className="t-name">{t.from}</span>
                                        <ArrowRight size={16} className="t-arrow" />
                                        <span className="t-name">{t.to}</span>
                                        <span className="t-amount">{t.amount.toLocaleString()}원</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </section>
                )}
            </div>
            <FooterNavBar />
        </div>
    )
}

export default SettlementPage