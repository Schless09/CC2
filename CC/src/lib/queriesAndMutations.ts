import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getActivityLogs } from './actions/activityLog';
import {
  createClientReferral,
  getClientReferrals,
  updateClientReferral,
} from './actions/clientreferral';
import { getJobPostings, updateJobPosting } from './actions/jobPosting';
import {
  createReferral,
  getReferrals,
  updateReferral,
} from './actions/referral';
import { getUsers } from './actions/user';
import { QUERY_KEYS } from './queryKeys';
import { UpdateReferralProps } from './types';

export const useGetJobPostings = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_JOB_POSTINGS],
    queryFn: () => getJobPostings(),
  });
};

export const useUpdateJobPosting = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      jobPostingId,
      newStatus,
    }: {
      jobPostingId: string;
      newStatus: string;
    }) => updateJobPosting(jobPostingId, newStatus),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_JOB_POSTINGS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_ACTIVITY_LOGS],
      });
    },
  });
};

export const useGetUsers = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_USERS],
    queryFn: () => getUsers(),
  });
};

export const useGetActivityLogs = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_ACTIVITY_LOGS],
    queryFn: () => getActivityLogs(),
  });
};

export const useGetReferrals = (userId: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_REFERRALS, userId],
    queryFn: () => getReferrals(userId),
  });
};

export const useCreateReferral = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: any) => createReferral(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_ACTIVITY_LOGS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_REFERRALS],
      });
    },
  });
};

export const useUpdateReferral = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (props: UpdateReferralProps) => updateReferral(props),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_ACTIVITY_LOGS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_REFERRALS],
      });
    },
  });
};

export const useGetClientReferrals = (userId: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_CLIENT_REFERRALS, userId],
    queryFn: () => getClientReferrals(userId),
  });
};

export const useCreateClientReferral = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: any) => createClientReferral(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_ACTIVITY_LOGS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CLIENT_REFERRALS],
      });
    },
  });
};

export const useUpdateClientReferral = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (props: UpdateReferralProps) => updateClientReferral(props),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_ACTIVITY_LOGS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CLIENT_REFERRALS],
      });
    },
  });
};
