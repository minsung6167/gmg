import { useState } from 'react'

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
                    <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={'chevron' + (isOpen ? ' open' : '')}
                    >
                        <path d="m6 9 6 6 6-6" />
                    </svg>
                    <span
                        className="icon-only"
                        onClick={(e) => {
                            e.stopPropagation()
                            onRemove(expense.id)
                        }}
                    >
                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M3 6h18" />
                            <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
                            <path d="M10 11v6" />
                            <path d="M14 11v6" />
                        </svg>
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
