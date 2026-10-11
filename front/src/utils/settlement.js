export function calculateSettlements(balances) {
    const creditors = balances
        .filter((b) => b.balance > 0)
        .map((b) => ({ ...b }))
        .sort((a, b) => b.balance - a.balance)
    const debtors = balances
        .filter((b) => b.balance < 0)
        .map((b) => ({ ...b, balance: -b.balance }))
        .sort((a, b) => b.balance - a.balance)

    const transactions = []
    let i = 0
    let j = 0

    while (i < debtors.length && j < creditors.length) {
        const pay = Math.min(debtors[i].balance, creditors[j].balance)
        if (pay > 0.5) {
            transactions.push({
                from: debtors[i].name,
                to: creditors[j].name,
                amount: Math.round(pay),
            })
        }
        debtors[i].balance -= pay
        creditors[j].balance -= pay
        if (debtors[i].balance <= 0.5) i++
        if (creditors[j].balance <= 0.5) j++
    }

    return transactions
}