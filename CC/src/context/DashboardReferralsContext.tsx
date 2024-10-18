'use client';

import {
  useGetReferrals,
  useGetClientReferrals,
} from '@/lib/queriesAndMutations';
import { ClientReferral, Referral } from '@/lib/types';
import React, { createContext, useEffect, useState } from 'react';

interface DashboardReferralsContextType {
  filteredReferrals: Referral[];
  searchReferrals: (query: string) => void;
  isReferralsLoading: boolean;
  referralsRefetch: any;
  filteredClientReferrals: ClientReferral[];
  searchClientReferrals: (query: string) => void;
  isClientReferralsLoading: boolean;
  clientReferralsRefetch: any;
}

export const DashboardReferralsContext = createContext<
  DashboardReferralsContextType | undefined
>(undefined);

export const DashboardReferralsProvider = ({
  children,
  userId,
}: {
  children: React.ReactNode;
  userId: string;
}) => {
  const {
    data: referrals = [],
    isLoading: isReferralsLoading,
    refetch: referralsRefetch,
  } = useGetReferrals(userId);
  const {
    data: clientReferrals = [],
    isLoading: isClientReferralsLoading,
    refetch: clientReferralsRefetch,
  } = useGetClientReferrals(userId);
  const [filteredReferrals, setFilteredReferrals] =
    useState<Referral[]>(referrals);
  const [filteredClientReferrals, setFilteredClientReferrals] =
    useState<ClientReferral[]>(clientReferrals);

  useEffect(() => {
    setFilteredReferrals(referrals);
    setFilteredClientReferrals(clientReferrals);
  }, [referrals, clientReferrals]);

  const searchReferrals = (query: string) => {
    if (!query) {
      setFilteredReferrals(referrals);
      return;
    }
    const lowerCaseQuery = query.toLowerCase();
    const filtered = referrals.filter(
      (referral: Referral) =>
        referral.firstName.toLowerCase().includes(lowerCaseQuery) ||
        referral.lastName.toLowerCase().includes(lowerCaseQuery)
    );
    setFilteredReferrals(filtered);
  };
  const searchClientReferrals = (query: string) => {
    if (!query) {
      setFilteredClientReferrals(referrals);
      return;
    }
    const lowerCaseQuery = query.toLowerCase();
    const filtered = clientReferrals.filter(
      (clientReferral: ClientReferral) =>
        clientReferral.firstName.toLowerCase().includes(lowerCaseQuery) ||
        clientReferral.lastName.toLowerCase().includes(lowerCaseQuery)
    );
    setFilteredClientReferrals(filtered);
  };

  return (
    <DashboardReferralsContext.Provider
      value={{
        filteredReferrals,
        searchReferrals,
        isReferralsLoading,
        referralsRefetch,
        filteredClientReferrals,
        searchClientReferrals,
        isClientReferralsLoading,
        clientReferralsRefetch,
      }}
    >
      {children}
    </DashboardReferralsContext.Provider>
  );
};
