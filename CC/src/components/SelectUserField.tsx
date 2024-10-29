'use client';

import { useState, useEffect } from 'react';
import { useGetUsers } from '@/lib/queriesAndMutations';
import { useUser } from '@clerk/nextjs';
import Image from 'next/image';
import { Controller } from 'react-hook-form';
import { ChevronDownIcon, XIcon } from 'lucide-react';

interface User {
  label: string;
  userId: string;
  avatar: string;
  email: string;
}

interface SelectUserFieldProps {
  control: any;
  isLoading: boolean;
}

const SelectUserField = ({ control, isLoading }: SelectUserFieldProps) => {
  const { data: users, isLoading: usersLoading } = useGetUsers();
  const { user: currentUser } = useUser();
  const [introducedByFriend, setIntroducedByFriend] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);

  const usersList: User[] = users
    ?.map((user: any) => ({
      label: `${user.firstName} ${user.lastName}`,
      userId: user._id,
      avatar: user.profilePhoto,
      email: user.email,
    }))
    ?.filter(
      (user: User) =>
        user.email !== currentUser?.emailAddresses[0].emailAddress &&
        user.userId !== process.env.NEXT_PUBLIC_DEFAULT_USER
    ) || [];

  useEffect(() => {
    if (searchTerm.length > 0) {
      setFilteredUsers(
        usersList.filter((user) =>
          user.label.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
      setIsOpen(true);
    } else {
      setFilteredUsers([]);
      setIsOpen(false);
    }
  }, [searchTerm, usersList]);

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Were you referred to Coder Collective by a friend or colleague?
        </label>
        <div className="relative">
          <select
            value={introducedByFriend}
            onChange={(e) => setIntroducedByFriend(e.target.value)}
            className="w-full px-3 py-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green focus:border-green"
            disabled={isLoading}
          >
            <option value="">--</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <ChevronDownIcon className="h-4 w-4" />
          </div>
        </div>
      </div>

      {introducedByFriend === 'yes' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Great, please select their name from the list below.
          </label>
          <Controller
            name="selectedUser"
            control={control}
            render={({ field }) => (
              <div className="relative mt-1">
                <div className="relative w-full bg-white border border-gray-300 rounded-md focus-within:ring-2 focus-within:ring-green focus-within:border-green">
                  {field.value ? (
                    <div className="flex items-center p-2">
                      <Image
                        src={usersList.find((user) => user.userId === field.value)?.avatar || ''}
                        alt=""
                        className="h-6 w-6 rounded-full mr-3"
                        width={24}
                        height={24}
                      />
                      <span className="block truncate text-gray-700">
                        {usersList.find((user) => user.userId === field.value)?.label}
                      </span>
                      <button
                        type="button"
                        className="ml-auto text-gray-400 hover:text-green"
                        onClick={() => {
                          field.onChange('');
                          setSearchTerm('');
                        }}
                        disabled={isLoading}
                      >
                        <XIcon className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <input
                      type="text"
                      className="w-full px-3 py-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green focus:border-green sm:text-sm placeholder-gray-400"
                      placeholder="Search for a user..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      disabled={isLoading}
                    />
                  )}
                </div>

                {isOpen && filteredUsers.length > 0 && (
                  <ul className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                    {filteredUsers.map((user) => (
                      <li
                        key={user.userId}
                        className="cursor-pointer select-none relative py-2 pl-3 pr-9 text-gray-700 hover:bg-green"
                        onClick={() => {
                          field.onChange(user.userId);
                          setSearchTerm('');
                          setIsOpen(false);
                        }}
                      >
                        <div className="flex items-center">
                          <Image
                            src={user.avatar}
                            alt=""
                            className="h-6 w-6 rounded-full mr-3"
                            width={24}
                            height={24}
                          />
                          <span className="truncate">{user.label}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          />
        </div>
      )}
    </div>
  );
};

export default SelectUserField;