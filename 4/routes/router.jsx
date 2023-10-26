import { createBrowserRouter, redirect } from 'react-router-dom'
import RegisterPage from '../views/RegisterPage'
import App from '../src/App'

export default createBrowserRouter([
    {
        path: '/register',
        element: <RegisterPage />,
    },
    {
        path: '/',
        element: <App />,
    }
])