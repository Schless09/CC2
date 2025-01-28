
'use client';

import { useState, useEffect, KeyboardEvent } from 'react';
import { useGetUsers } from '@/lib/queriesAndMutations';
import { useUser } from '@clerk/nextjs';
import Image from 'next/image';
import { Controller } from 'react-hook-form';
import { ChevronDown, X, Search, User2 } from 'lucide-react';

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
  const [focusedIndex, setFocusedIndex] = useState(-1);

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

  const filteredUsers = searchTerm
    ? usersList.filter(
        user =>
          user.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : usersList;

  useEffect(() => {
    setFocusedIndex(-1);
  }, [searchTerm]);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, field: any) => {
    const users = filteredUsers.length > 0 ? filteredUsers : usersList;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
          setFocusedIndex(0);
        } else {
          setFocusedIndex(prev => 
            prev < users.length - 1 ? prev + 1 : prev
          );
        }
        break;

      case 'ArrowUp':
        e.preventDefault();
        if (isOpen) {
          setFocusedIndex(prev => (prev > 0 ? prev - 1 : 0));
        }
        break;

      case 'Enter':
        e.preventDefault();
        if (isOpen && focusedIndex >= 0 && focusedIndex < users.length) {
          field.onChange(users[focusedIndex].userId);
          setSearchTerm('');
          setIsOpen(false);
          setFocusedIndex(-1);
        }
        break;

      case 'Escape':
        e.preventDefault();
        setIsOpen(false);
        setFocusedIndex(-1);
        break;

      default:
        if (!isOpen) {
          setIsOpen(true);
        }
        break;
    }
  };

  return (
    <div className="space-y-6">
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
            <ChevronDown className="h-4 w-4" />
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
              <div className="relative">
                {!field.value ? (
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      className="w-full pl-10 pr-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green focus:border-green sm:text-sm placeholder-gray-400"
                      placeholder="Search by name or email..."
                      value={searchTerm}
                      onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setIsOpen(true);
                      }}
                      onKeyDown={(e) => handleKeyDown(e, field)}
                      onFocus={() => setIsOpen(true)}
                      disabled={isLoading}
                    />
                  </div>
                ) : (
                  <div className="flex items-center p-3 border border-gray-300 rounded-md bg-white">
                    {usersList.find((user) => user.userId === field.value)?.avatar ? (
                      <Image
                        src={usersList.find((user) => user.userId === field.value)?.avatar || ''}
                        alt=""
                        className="h-8 w-8 rounded-full mr-3"
                        width={32}
                        height={32}
                      />
                    ) : (
                      <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                        <User2 className="h-4 w-4 text-gray-500" />
                      </div>
                    )}
                    <div className="flex flex-col flex-1">
                      <span className="text-sm font-medium text-gray-900">
                        {usersList.find((user) => user.userId === field.value)?.label}
                      </span>
                      <span className="text-xs text-gray-500">
                        {usersList.find((user) => user.userId === field.value)?.email}
                      </span>
                    </div>
                    <button
                      type="button"
                      className="ml-2 p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-full"
                      onClick={() => {
                        field.onChange('');
                        setSearchTerm('');
                      }}
                      disabled={isLoading}
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                )}

                {isOpen && filteredUsers.length > 0 && !field.value && (
                  <ul className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 overflow-auto border border-gray-200">
                    {filteredUsers.map((user, index) => (
                      <li
                        key={user.userId}
                        onClick={() => {
                          field.onChange(user.userId);
                          setSearchTerm('');
                          setIsOpen(false);
                          setFocusedIndex(-1);
                        }}
                        onMouseEnter={() => setFocusedIndex(index)}
                        className={`
                          cursor-pointer select-none py-2 px-3
                          ${focusedIndex === index ? 'bg-green2' : 'hover:bg-green2'}
                          transition-colors duration-150
                        `}
                      >
                        <div className="flex items-center">
                          {user.avatar ? (
                            <Image
                              src={user.avatar}
                              alt=""
                              className="h-8 w-8 rounded-full mr-3"
                              width={32}
                              height={32}
                            />
                          ) : (
                            <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                              <User2 className="h-4 w-4 text-gray-500" />
                            </div>
                          )}
                          <div className="flex flex-col">
                            <span className="text-sm font-medium text-gray-900">{user.label}</span>
                            <span className="text-xs text-gray-500">{user.email}</span>
                          </div>
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