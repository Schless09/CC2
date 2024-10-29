import { parseDate } from '@/lib/utils';
import { motion } from 'framer-motion';

const ReferredClientCard = ({ referral }: { referral: any }) => {
  const referralUpdate = parseDate(referral.updatedAt);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'contacted': return 'bg-green';
      case 'engaged': return 'bg-orange-500';
      case 'inverviewing coa candidates': return 'bg-blue-500';
      case 'hired coa candidate': return 'bg-green2';
      case 'referral paid out': return 'bg-green-600';
      case 'search closed - unsuccessful': return 'bg-gray-500';
      default: return 'bg-blue-500';
    }
  };

  return (
    <motion.div
      className="bg-gray-700 rounded-lg p-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-semibold text-green2">
            {referral.firstName} {referral.lastName}
          </h3>
          <p className="text-gray-400">{referral.email}</p>
          <p className="text-gray-400">{referral.company}</p>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(referral.status)} text-white`}>
          {referral.status}
        </span>
      </div>
      <p className="text-sm text-gray-400 mt-2">Updated: {referralUpdate}</p>
    </motion.div>
  );
};

export default ReferredClientCard;
