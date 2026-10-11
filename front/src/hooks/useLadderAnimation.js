import { useRef, useState, useEffect } from 'react'
import { tracePath, getPointAtT, drawLadder } from '../utils/ladder'

export function useLadderAnimation(canvasRef, n, rungs, width, results) {
    const [animating, setAnimating] = useState(false)
    const [finishedIndex, setFinishedIndex] = useState(null)
    const [resultText, setResultText] = useState(null)
    const animRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas || n < 2) return
        drawLadder(canvas.getContext('2d'), n, rungs, width)
    }, [canvasRef, n, rungs, width])

    useEffect(() => () => animRef.current && cancelAnimationFrame(animRef.current), [])

    const start = (startIdx) => {
        if (animating || n < 2) return
        const ctx = canvasRef.current.getContext('2d')
        const { points, end } = tracePath(startIdx, rungs, n)

        setAnimating(true)
        setFinishedIndex(null)
        setResultText(null)

        const duration = 1100
        const startTime = performance.now()

        const frame = (now) => {
            const t = Math.min((now - startTime) / duration, 1)
            const current = getPointAtT(points, t)

            drawLadder(ctx, n, rungs, width)
            ctx.strokeStyle = '#38b3ff'
            ctx.lineWidth = 4
            ctx.beginPath()
            ctx.moveTo(points[0].x, points[0].y)
            for (let i = 1; i <= current.segIndex; i++) ctx.lineTo(points[i].x, points[i].y)
            ctx.lineTo(current.x, current.y)
            ctx.stroke()

            ctx.beginPath()
            ctx.arc(current.x, current.y, 6, 0, Math.PI * 2)
            ctx.fillStyle = '#FF9F43'
            ctx.fill()

            if (t < 1) {
                animRef.current = requestAnimationFrame(frame)
            } else {
                setAnimating(false)
                setFinishedIndex(end)
                setResultText(results[end])
            }
        }
        animRef.current = requestAnimationFrame(frame)
    }

    return { animating, finishedIndex, resultText, start }
}