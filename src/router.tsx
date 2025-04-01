import {createHashRouter, Navigate} from 'react-router-dom';
import Profile from './pages/Profile';
import VideoList from './pages/VideoList';
import ScriptGenerator from './pages/ScriptGenerator';
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
                path: 'script-generator',
                element: <ScriptGenerator/>
            },
            {
                path: '',
                element: <Navigate to="script-generator"/>
            }
        ]
    }
]);

export default router;