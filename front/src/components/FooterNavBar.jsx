import { NavLink, useLocation, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { fetchPlanItems } from '../api/Plan'
import './FooterNavBar.css'

function FooterNavBar() {
    const location = useLocation()
    const { planId } = useParams()
    let tabIndex = 0
    if (location.pathname.includes('/plan-')) tabIndex = 1

    const [hasSchedule, setHasSchedule] = useState(false)

    useEffect(() => {
        if (planId == null) {
            return
        }
        fetchPlanItems(planId).then((list) => {
            setHasSchedule(list.length > 0)
        })
    }, [planId, location.pathname])

    if (location.pathname.endsWith('/tool')) tabIndex = 2

    return (
        <nav className="footer-nav">
            <NavLink to={`/plans/${planId}/result`} className={() => 'nav-item' + (tabIndex === 0 ? ' active' : '')}>
                홈
            </NavLink>
            <NavLink to={hasSchedule ? `/plans/${planId}/plan-after` : `/plans/${planId}/plan-before`} className={() => 'nav-item' + (tabIndex === 1 ? ' active' : '')}>
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
