import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { DropdownMenuProps } from '@/lib/types';
import { Ellipsis } from 'lucide-react';

const StatusDropdownMenu = ({
  rowId,
  statuses,
  currentStatus,
  handleClick,
}: DropdownMenuProps) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button size='icon' variant='ghost'>
        <Ellipsis className='h-5 w-5' />
        <span className='sr-only'>More actions</span>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align='end'>
      {Object.values(statuses).map((status) => (
        <DropdownMenuItem
          key={status}
          onClick={() => handleClick(rowId, status, currentStatus)}
          disabled={currentStatus === status}
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </DropdownMenuItem>
      ))}
    </DropdownMenuContent>
  </DropdownMenu>
);

export default StatusDropdownMenu;
