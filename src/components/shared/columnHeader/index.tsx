import { Column } from '@tanstack/react-table';
import { ArrowDown, ArrowUp } from 'lucide-react';
import React from 'react';

type ColumnHeaderProps<TData, TValue> = React.HTMLAttributes<HTMLDivElement> & {
  column: Column<TData, TValue>;
  label: string;
};
const ColumnHeader = <TData, TValue>({
  column,
  label,
  ...rest
}: ColumnHeaderProps<TData, TValue>) => {
  return (
    <div className='flex gap-x-1' {...rest}>
      {column.getIsSorted() === 'desc' ? (
        <ArrowUp
          size={14}
          className='mt-1 cursor-pointer'
          onClick={() => column.toggleSorting(false)}
        />
      ) : (
        <ArrowDown
          size={14}
          className='mt-1 cursor-pointer'
          onClick={() => column.toggleSorting(true)}
        />
      )}
      <span className='text-nowrap'>{label}</span>
    </div>
  );
};

export default ColumnHeader;
