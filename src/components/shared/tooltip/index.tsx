import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import React, { PropsWithChildren } from 'react';

type Props = {
  title: string;
} & PropsWithChildren;

const ToolTip: React.FC<Props> = ({ title, children }) => {
  console.log('title :>> ', title);
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent>
          <p className='text-xs'>{title}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ToolTip;
