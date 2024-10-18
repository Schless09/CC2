'use client';
import Loader from '@/components/Loader';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import useDashboard from '@/hooks/useDashboard';
import { parseDate } from '@/lib/utils';
import Link from 'next/link';

const UsersTable = () => {
  const { filteredUsers, isUsersLoading } = useDashboard();
  if (isUsersLoading) return <Loader customHeight='h-[500px]' />;

  return (
    <Card className='w-full max-h-[500px] overflow-y-auto'>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Photo</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone Number</TableHead>
              <TableHead>Joined On</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className='text-center text-lg font-semibold'
                >
                  No Users Found
                </TableCell>
              </TableRow>
            ) : (
              filteredUsers.map((user: any) => (
                <TableRow key={user._id}>
                  <TableCell>
                    <Link href={`/admin/dashboard/${user._id}`}>
                      <Avatar>
                        <AvatarImage src={user.profilePhoto} />
                        <AvatarFallback>{user.firstName[0]}</AvatarFallback>
                      </Avatar>
                    </Link>
                  </TableCell>
                  <TableCell>
                    {user.firstName} {user.lastName}
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.phoneNumber ?? '-'}</TableCell>
                  <TableCell>{parseDate(user.createdAt)}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default UsersTable;
