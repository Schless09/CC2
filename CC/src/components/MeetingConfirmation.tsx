// MeetingConfirmation.tsx
'use client'

import { useSearchParams } from 'next/navigation'
import Image from 'next/image'
import { CalendarDays, Clock, Mail, MapPin, User, Video, AlertCircle } from 'lucide-react'
import ReferralSelector from './forms/ReferralSelector';

interface DateTimeFormat {
  fullDate: string;
  time: string;
}

export const MeetingConfirmation = () => { 
  const searchParams = useSearchParams();

  const user = searchParams.get('user') || 'N/A';
  const title = searchParams.get('title') || 'N/A';
  const startTime = searchParams.get('startTime');
  const endTime = searchParams.get('endTime');
  const attendeeName = searchParams.get('attendeeName') || 'N/A';
  const email = decodeURIComponent(searchParams.get('email') || 'N/A');
  const hostName = searchParams.get('hostName') || 'N/A';
  const location = searchParams.get('location') || 'N/A';

  const formatDateTime = (dateTimeString: string | number | Date | null): DateTimeFormat => {
    if (!dateTimeString) {
      return {
        fullDate: 'N/A',
        time: 'N/A'
      };
    }
    const date = new Date(dateTimeString);
    return {
      fullDate: date.toLocaleString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      time: date.toLocaleString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
      })
    };
  };

  const dateTime = formatDateTime(startTime);

  return (
    <div className="w-full max-w-2xl mx-auto"> 
      <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
        {/* Header Section */}
        <div className="border-b border-gray-200 bg-gray-50 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Image
                src="/images/CC green on white.png"
                alt="Coder Collective"
                width={48}
                height={48}
                className="rounded-lg"
              />
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Meeting Confirmation</h1>
                <p className="text-sm text-gray-600">Coder Collective Candidate Intake</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">Status</p>
              <p className="text-sm text-green">Confirmed</p>
            </div>
          </div>
        </div>

        {/* Meeting Details */}
        <div className="p-6 space-y-6">
          {/* Time and Date Section */}
          <div className="space-y-4">
            <div className="flex items-start gap-3 bg-gray-50 p-4 rounded-lg">
              <CalendarDays className="w-5 h-5 text-green mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-gray-900">{dateTime.fullDate}</p>
                <p className="text-sm text-gray-600">Your local time</p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-lg">
              <Clock className="w-5 h-5 text-green flex-shrink-0" />
              <div>
                <p className="font-medium text-gray-900">20 Minute Discussion</p>
                <p className="text-sm text-gray-600">Quick chat to understand your career goals</p>
              </div>
            </div>
          </div>

          {/* Attendee Information */}
          <div className="space-y-4">
            <div className="flex items-start gap-3 bg-gray-50 p-4 rounded-lg">
              <User className="w-5 h-5 text-green mt-0.5 flex-shrink-0" />
              <div>
                <div className="flex items-baseline gap-2">
                  <p className="font-medium text-gray-900">{attendeeName}</p>
                  <p className="text-sm text-gray-500">(You)</p>
                </div>
                <p className="text-sm text-gray-600">{email}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-gray-50 p-4 rounded-lg">
              <Video className="w-5 h-5 text-green mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-gray-900">Google Meet</p>
                <p className="text-sm text-gray-600">Link provided in calendar invite</p>
              </div>
            </div>
          </div>

              {/* Call Preparation Notes */}
          <div className="bg-green/5 rounded-lg p-4 border border-green/10">
            <div className="flex gap-3">
              <div className="space-y-4">
                <p className="text-sm text-gray-900">To make the most of our discussion, it would be great if you could share an updated copy of your resume beforehand. If you don't have an updated version ready, no worries—we can still have a productive conversation, and you can always share it afterward if needed.</p>
                <p className="text-sm font-semibold text-gray-900">Here's what we'll cover during our call:</p>
                <ul className="text-sm text-gray-600 space-y-2 pl-4 list-disc">
                  <li>A high-level overview of your background and technical expertise</li>
                  <li>Your career goals and interests moving forward</li>
                  <li>Potential opportunities that align with your experience and aspirations</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};