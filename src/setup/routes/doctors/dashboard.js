// App Imports
import params from '../../../setup/config/params'
import Dashboard from '../../../modules/doctors/Dashboard'

// Admin dashboard routes
export const doctorsDashboard = {
  path: '/doctors/dashboard',
  component: Dashboard,
  // auth: true,
  role: params.user.roles.admin
}