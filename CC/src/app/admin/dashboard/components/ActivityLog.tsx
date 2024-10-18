'use client';
import Loader from '@/components/Loader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useGetActivityLogs } from '@/lib/queriesAndMutations';
import { ActivityType } from '@/lib/types';
import { getTimeAgo } from '@/lib/utils';
import {
  CheckCheck,
  ClipboardCheckIcon,
  FileCheckIcon,
  FilePlusIcon,
  RefreshCwIcon,
  TrashIcon,
  UserCheckIcon,
  UserPlusIcon,
} from 'lucide-react';

const getActivityIcon = (activityType: ActivityType) => {
  switch (activityType) {
    case ActivityType.NEW_USER_CREATED:
      return <UserPlusIcon className='text-muted-foreground' />;
    case ActivityType.USER_DELETED:
      return <TrashIcon className='text-muted-foreground' />;
    case ActivityType.REFERRAL_STATUS_CHANGED:
      return <CheckCheck className='text-muted-foreground' />;
    case ActivityType.CLIENT_REFERRAL_STATUS_CHANGED:
      return <ClipboardCheckIcon className='text-muted-foreground' />;
    case ActivityType.NEW_JOB_OPENING:
      return <FilePlusIcon className='text-muted-foreground' />;
    case ActivityType.NEW_REFERRAL:
      return <UserPlusIcon className='text-muted-foreground' />;
    case ActivityType.CLIENT_INTRODUCTION:
      return <UserCheckIcon className='text-muted-foreground' />;
    case ActivityType.JOB_POSTING_STATUS_CHANGED:
      return <FileCheckIcon className='text-muted-foreground' />;
    case ActivityType.REFERRAL_UPDATED:
      return <RefreshCwIcon className='text-muted-foreground' />;
    default:
      return null;
  }
};

const ActivityLog = () => {
  const { data: activityLogs, isLoading } = useGetActivityLogs();
  if (isLoading) return <Loader customHeight='h-[500px]' />;

  return (
    <Card className='max-h-[500px] overflow-y-auto'>
      <CardHeader>
        <CardTitle className='text-center'>Admin Feed</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='grid gap-4'>
          {activityLogs?.map((log: any) => (
            <div key={log._id} className='flex items-center gap-2'>
              {getActivityIcon(log.type)}
              <div className='flex-1'>
                <div className='font-medium'>{log.type}</div>
                <div className='text-sm text-muted-foreground'>
                  {log.details}
                </div>
              </div>
              <div className='text-xs text-muted-foreground'>
                {getTimeAgo(log.createdAt)}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ActivityLog;
