'use client'

import { useSearchParams } from 'next/navigation'

export const MeetingConfirmation = () => { 
  const searchParams = useSearchParams();

  const assigned_to = searchParams.get('assigned_to') || 'N/A';
  const event_type_name = searchParams.get('event_type_name') || 'N/A';
  const event_start_time = searchParams.get('event_start_time');
  const event_end_time = searchParams.get('event_end_time');
  const invitee_first_name = searchParams.get('invitee_first_name') || 'N/A';
  const invitee_last_name = searchParams.get('invitee_last_name') || 'N/A';
  const invitee_email = searchParams.get('invitee_email') || 'N/A';

  const formatDateTime = (dateTimeString: string | number | Date | null) => {
    if (!dateTimeString) {
      return 'N/A';
    }
    return new Date(dateTimeString).toLocaleString();
  };

  return (
    <div className="flex justify-center pt-8 pb-4"> 
      <div className="bg-gray-800 shadow-lg rounded-lg p-6 w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-4 text-gray-400 text-center">Appointment Details</h1>
        {assigned_to !== 'N/A' && <p className="text-lg text-center text-gray-400 mb-4">{assigned_to} is looking forward to the upcoming meeting.</p>}

        <div className="flex justify-center mb-4">
          <img src="/images/Andrew_Schuessler_LinkedIn Pic.jpeg" alt="LinkedIn Profile" className="w-24 h-24 rounded-full" />
        </div>
        
        <p className="text-lg text-gray-300 mb-2"><strong className='text-magenta'>Event:</strong> {event_type_name}</p>
        <p className="text-lg text-gray-300 mb-2"><strong className='text-magenta'>Start Time:</strong> {formatDateTime(event_start_time)}</p>
        <p className="text-lg text-gray-300 mb-2"><strong className='text-magenta'>End Time:</strong> {formatDateTime(event_end_time)}</p>
        <p className="text-lg text-gray-300 mb-2"><strong className='text-magenta'>Invitee:</strong> {invitee_first_name} {invitee_last_name}</p>
        <p className="text-lg text-gray-300 mb-2"><strong className='text-magenta'>Email:</strong> {invitee_email}</p>
      </div>
    </div>
  );
};

