import { useNavigate } from 'react-router-dom'
import { DollarSign, CheckSquare, Disc3, Workflow } from 'lucide-react'
import FooterNavBar from '../components/FooterNavBar'
import './toolpage.css'

const tools = [
    {
        key: 'settlement',
        title: '정산시스템',
        desc: '여행 경비를 나눠서 계산해요',
        path: '/tool/settlement',
        icon: <DollarSign size={26} />,
    },
    {
        key: 'checklist',
        title: '준비물 체크리스트',
        desc: '빠뜨린 건 없는지 확인해요',
        path: '/tool/checklist',
        icon: <CheckSquare size={26} />,
    },
    {
        key: 'roulette',
        title: '랜덤 룰렛',
        desc: '벌칙, 역할 정하기 등 랜덤으로!',
        path: '/tool/roulette',
        icon: <Disc3 size={26} />,
    },
    {
        key: 'ladder',
        title: '사다리타기',
        desc: '여러 명 중 랜덤으로 결과를 배정해요',
        path: '/tool/ladder',
        icon: <Workflow size={26} />,
    },
]

function ToolPage() {
    const navigate = useNavigate()

    return (
        <div className="page">
            <div className="tool-page">
                <h2>도구</h2>
                <div className="tool-list">
                    {tools.map((tool) => (
                        <button
                            key={tool.key}
                            className="tool-card"
                            onClick={() => navigate(tool.path)}
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