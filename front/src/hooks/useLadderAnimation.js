import { useRef, useState, useEffect } from 'react'
import { tracePath, getPointAtT, drawLadder } from '../utils/ladder'

const PATH_COLORS = ['#494cfc', '#FF6B4A', '#A78BFA', '#0EA5E9', '#10B981', '#F59E0B']

export function useLadderAnimation(canvasRef, n, rungs, width, results) {
    const [animating, setAnimating] = useState(false)
    const [finishedIndices, setFinishedIndices] = useState([])
    const [resultText, setResultText] = useState(null)
    const [allResults, setAllResults] = useState(null)
    const animRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas || n < 2) return
        drawLadder(canvas.getContext('2d'), n, rungs, width)
        setFinishedIndices([])
        setResultText(null)
        setAllResults(null)
    }, [canvasRef, n, rungs, width])

    useEffect(() => () => animRef.current && cancelAnimationFrame(animRef.current), [])

    const drawPaths = (ctx, paths, t) => {
        drawLadder(ctx, n, rungs, width)
        paths.forEach((path, idx) => {
            const current = getPointAtT(path.points, t)
            const color = PATH_COLORS[idx % PATH_COLORS.length]

            ctx.strokeStyle = color
            ctx.lineWidth = 4
            ctx.beginPath()
            ctx.moveTo(path.points[0].x, path.points[0].y)
            for (let i = 1; i <= current.segIndex; i++) {
                ctx.lineTo(path.points[i].x, path.points[i].y)
            }
            ctx.lineTo(current.x, current.y)
            ctx.stroke()

            ctx.beginPath()
            ctx.arc(current.x, current.y, 6, 0, Math.PI * 2)
            ctx.fillStyle = color
            ctx.fill()
        })
    }

    const runAnimation = (paths, onDone) => {
        if (animRef.current) cancelAnimationFrame(animRef.current)
        const ctx = canvasRef.current.getContext('2d')
        const duration = 1100
        const startTime = performance.now()

        setAnimating(true)
        setFinishedIndices([])
        setResultText(null)
        setAllResults(null)

        const frame = (now) => {
            const t = Math.min((now - startTime) / duration, 1)
            drawPaths(ctx, paths, t)

            if (t < 1) {
                animRef.current = requestAnimationFrame(frame)
            } else {
                setAnimating(false)
                onDone()
            }
        }
        animRef.current = requestAnimationFrame(frame)
    }

    const start = (startIdx) => {
        if (animating || n < 2) return
        const { points, end } = tracePath(startIdx, rungs, n)

        runAnimation([{ points, end }], () => {
            setFinishedIndices([end])
            setResultText(results[end])
        })
    }

    const startAll = (names) => {
        if (animating || n < 2) return
        const paths = names.map((_, i) => {
            const { points, end } = tracePath(i, rungs, n)
            return { points, end, name: names[i] }
        })

        runAnimation(paths, () => {
            setFinishedIndices(paths.map((p) => p.end))
            setAllResults(
                paths.map((p) => ({
                    from: p.name,
                    to: results[p.end],
                }))
            )
        })
    }

    return { animating, finishedIndices, resultText, allResults, start, startAll }
}
