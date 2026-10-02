import { Outlet } from 'react-router-dom'
import FooterNavBar from './FooterNavBar'
import './MainLayout.css'

function MainLayout() {
    return (
        <div className="main-layout">
            <main className="main-content">
                <Outlet />
            </main>
            <FooterNavBar />
        </div>
    )
}

export default MainLayout