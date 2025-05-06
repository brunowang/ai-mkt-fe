import {createHashRouter, Navigate} from 'react-router-dom';
import PlanList from './pages/PlanList';
import App from './App';

const router = createHashRouter([
    {
        path: '/',
        element: <App/>,
        children: [
            {
                path: 'plans',
                element: <PlanList/>
            },
            {
                path: '',
                element: <Navigate to="plans"/>
            }
        ]
    }
]);

export default router;