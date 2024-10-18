import { DashboardContext } from '@/context/DashboardContext';
import { useContext } from 'react';

const useDashboard = () => {
  const context = useContext(DashboardContext);

  if (!context) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }

  return context;
};

export default useDashboard;
