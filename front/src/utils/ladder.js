const ROWS = 10
const COL_WIDTH = 64
const TOP_PAD = 30
const ROW_HEIGHT = 24

export const LADDER_CONFIG = { ROWS, COL_WIDTH, TOP_PAD, ROW_HEIGHT }

export function generateRungs(n) {
    const rungs = []
    for (let r = 0; r < ROWS; r++) {
        const row = new Array(n - 1).fill(false)
        const used = new Array(n).fill(false)
        for (let i = 0; i < n - 1; i++) {
            if (used[i] || used[i + 1]) continue
            if (Math.random() < 0.35) {
                row[i] = true
                used[i] = true
                used[i + 1] = true
            }
        }
        rungs.push(row)
    }
    return rungs
}

export function tracePath(start, rungs, n) {
    const xAt = (i) => TOP_PAD + i * COL_WIDTH
    const points = []
    let pos = start
    points.push({ x: xAt(pos), y: TOP_PAD })

    for (let r = 0; r < ROWS; r++) {
        const rowY = TOP_PAD + r * ROW_HEIGHT
        const nextY = rowY + ROW_HEIGHT
        const row = rungs[r]

        if (pos > 0 && row[pos - 1]) {
            points.push({ x: xAt(pos), y: rowY })
            pos -= 1
            points.push({ x: xAt(pos), y: rowY })
        } else if (pos < n - 1 && row[pos]) {
            points.push({ x: xAt(pos), y: rowY })
            pos += 1
            points.push({ x: xAt(pos), y: rowY })
        }
        points.push({ x: xAt(pos), y: nextY })
    }
    return { points, end: pos }
}

function dist(a, b) {
    return Math.hypot(b.x - a.x, b.y - a.y)
}

export function getPointAtT(points, t) {
    const segLens = []
    for (let i = 0; i < points.length - 1; i++) segLens.push(dist(points[i], points[i + 1]))
    const total = segLens.reduce((a, b) => a + b, 0)
    let target = t * total
    let i = 0
    while (i < segLens.length - 1 && target > segLens[i]) {
        target -= segLens[i]
        i++
    }
    const segT = segLens[i] ? target / segLens[i] : 0
    const p0 = points[i]
    const p1 = points[i + 1] || points[i]
    return {
        x: p0.x + (p1.x - p0.x) * segT,
        y: p0.y + (p1.y - p0.y) * segT,
        segIndex: i,
    }
}

export function drawLadder(ctx, n, rungs, width) {
    ctx.clearRect(0, 0, width, TOP_PAD + ROWS * ROW_HEIGHT + 30)
    ctx.strokeStyle = '#CBD5E1'
    ctx.lineWidth = 2

    for (let i = 0; i < n; i++) {
        const x = TOP_PAD + i * COL_WIDTH
        ctx.beginPath()
        ctx.moveTo(x, TOP_PAD)
        ctx.lineTo(x, TOP_PAD + ROWS * ROW_HEIGHT)
        ctx.stroke()
    }

    rungs.forEach((row, r) => {
        const y = TOP_PAD + r * ROW_HEIGHT
        row.forEach((has, i) => {
            if (!has) return
            ctx.beginPath()
            ctx.moveTo(TOP_PAD + i * COL_WIDTH, y)
            ctx.lineTo(TOP_PAD + (i + 1) * COL_WIDTH, y)
            ctx.stroke()
        })
    })
}