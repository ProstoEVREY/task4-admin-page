import AuthPage from './Components/authPage'
import UserPage from './Components/userPage'

export const routes = [
    {
        path: '/',
        Element: <AuthPage />
    },
    {
        path: '/login',
        Element: <AuthPage />
    },
    {
        path: '/register',
        Element: <AuthPage />
    },
    {
        path: '/users',
        Element: <UserPage />
    },
]