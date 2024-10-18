import { DashboardReferralsContext } from '@/context/DashboardReferralsContext';
import { useContext } from 'react';

const useDashboardReferrals = () => {
  const context = useContext(DashboardReferralsContext);

  if (!context) {
    throw new Error(
      'useDashboardReferrals must be used within a DashboardReferralsProvider'
    );
  }

  return context;
};

export default useDashboardReferrals;
