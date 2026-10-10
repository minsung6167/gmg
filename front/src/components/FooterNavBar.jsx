import { NavLink, useLocation, useParams } from 'react-router-dom'
import './FooterNavBar.css'

function FooterNavBar() {
    const location = useLocation()
    const { planId } = useParams()
    let tabIndex = 0
    if (location.pathname.includes('/plan-')) tabIndex = 1
    if (location.pathname.endsWith('/tool')) tabIndex = 2

    return (
        <nav className="footer-nav">
            <NavLink to={`/plans/${planId}/result`} className={() => 'nav-item' + (tabIndex === 0 ? ' active' : '')}>
                홈
            </NavLink>
            <NavLink to={`/plans/${planId}/plan-before`} className={() => 'nav-item' + (tabIndex === 1 ? ' active' : '')}>
                계획
            </NavLink>
            <NavLink to={`/plans/${planId}/tool`} className={() => 'nav-item' + (tabIndex === 2 ? ' active' : '')}>
                도구
            </NavLink>
            <span className="nav-indicator" style={{ transform: `translateX(${tabIndex * 100}%)` }} />
        </nav>
    )
}

export default FooterNavBar
