import {createHashRouter, Navigate} from 'react-router-dom';
import Profile from './pages/Profile';
import VideoList from './pages/VideoList';
import App from './App';

const router = createHashRouter([
    {
        path: '/',
        element: <App/>,
        children: [
            {
                path: 'profile',
                element: <Profile/>
            },
            {
                path: 'videos',
                element: <VideoList/>
            },
            {
                path: '',
                element: <Navigate to="profile"/>
            }
        ]
    }
]);

export default router;