import { Button } from '@mui/material';
import Loader from './Loader';

const ReferralButton = ({ isLoading }: { isLoading: boolean }) => {
  return (
    <Button
      type="submit"
      variant="contained"
      disabled={isLoading}
      className="referral-selector-btn"
    >
      {isLoading && <Loader isSmall />}
      <span>{isLoading ? 'Submitting...' : 'Submit'}</span>
    </Button>
  );
};

export default ReferralButton;
