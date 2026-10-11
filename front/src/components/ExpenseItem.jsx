import { useState } from 'react'
import { Trash2, ChevronDown } from 'lucide-react'

function ExpenseItem({ expense, members, onRemove }) {
    const [isOpen, setIsOpen] = useState(false)
    const perPerson = members.length > 0 ? expense.amount / members.length : 0

    return (
        <div className="expense-card">
            <button className="expense-item" onClick={() => setIsOpen(!isOpen)}>
                <div className="expense-info">
                    <span className="expense-payer">{expense.payer}</span>
                    <span className="expense-memo">{expense.memo || '지출'}</span>
                </div>
                <div className="expense-right">
                    <span className="expense-amount">
                        {expense.amount.toLocaleString()}원
                    </span>
                    <ChevronDown size={16} className={'chevron' + (isOpen ? ' open' : '')} />
                    <span
                        className="icon-only"
                        onClick={(e) => {
                            e.stopPropagation()
                            onRemove(expense.id)
                        }}
                    >
                        <Trash2 size={16} />
                    </span>
                </div>
            </button>

            {isOpen && (
                <div className="expense-breakdown">
                    {members.length === 0 ? (
                        <p className="empty-text">참여 인원을 먼저 추가해주세요</p>
                    ) : (
                        members.map((name) => (
                            <div key={name} className="breakdown-row">
                                <span>
                                    {name}
                                    {name === expense.payer && (
                                        <span className="payer-tag">낸 사람</span>
                                    )}
                                </span>
                                <span>{Math.round(perPerson).toLocaleString()}원</span>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    )
}

export default ExpenseItem