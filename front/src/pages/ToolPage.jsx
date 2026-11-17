import { useNavigate, useParams } from 'react-router-dom'
import FooterNavBar from '../components/FooterNavBar'
import circleDollarSign from '../assets/circle-dollar-sign.svg'
import squareCheckBig from '../assets/square-check-big.svg'
import roulette from '../assets/roulette.png'
import ladder from '../assets/ladder.png'
import './ToolPage.css'

const tools = [
    {
        key: 'settlement',
        title: '정산시스템',
        desc: '여행 경비를 나눠서 계산해요',
        icon: <img src={circleDollarSign} alt="" width={26} height={26} />,
    },
    {
        key: 'checklist',
        title: '준비물 체크리스트',
        desc: '빠뜨린 건 없는지 확인해요',
        icon: <img src={squareCheckBig} alt="" width={26} height={26} />,
    },
    {
        key: 'roulette',
        title: '랜덤 룰렛',
        desc: '벌칙, 역할 정하기 등 랜덤으로!',
        icon: <img src={roulette} alt="" width={26} height={26} />,
    },
    {
        key: 'ladder',
        title: '사다리타기',
        desc: '여러 명 중 랜덤으로 결과를 배정해요',
        icon: <img src={ladder} alt="" width={26} height={26} />,
    },
]

function ToolPage() {
    const navigate = useNavigate()
    const { planId } = useParams()

    return (
        <div className="page">
            <div className="tool-page">
                <h2>도구</h2>
                <div className="tool-list">
                    {tools.map((tool) => (
                        <button
                            key={tool.key}
                            className="tool-card"
                            onClick={() => navigate(`/plans/${planId}/tool/${tool.key}`)}
                        >
                            <div className="tool-icon">{tool.icon}</div>
                            <div className="tool-text">
                                <span className="tool-title">{tool.title}</span>
                                <span className="tool-desc">{tool.desc}</span>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
            <FooterNavBar />
        </div>
    )
}

export default ToolPage
