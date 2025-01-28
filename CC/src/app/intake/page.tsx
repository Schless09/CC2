// page.tsx
import IntakeClient from './IntakeClient';
import MeetTheTeam from '@/components/MeetTheTeam';

const page = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-full pt-24 md:pt-32 p-4 md:p-8">
        <div className="max-w-xl mx-auto space-y-8">
          <IntakeClient />
          <MeetTheTeam />
        </div>
      </div>
    </div>
  );
};

export default page;