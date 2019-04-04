// App Imports
import Login from '../../modules/doctor/Login'
import Signup from '../../modules/doctor/Signup'
import Profile from '../../modules/doctor/Profile'
import Subscriptions from '../../modules/doctor/Subscriptions'

// User routes
export default {
    login: {
        path: '/doctor/login',
        component: Login
    },

    signup: {
        path: '/doctor/signup',
        component: Signup
    },

    profile: {
        path: '/doctor/profile',
        component: Profile,
        auth: true
    },

    subscriptions: {
        path: '/doctor/subscriptions',
        component: Subscriptions,
        auth: true
    }
}
