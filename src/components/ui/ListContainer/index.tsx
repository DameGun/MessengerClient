import { ReactNode } from 'react';
import { Box } from '@chakra-ui/react';
import InfoCaption from '@components/ui/InfoCaption';

interface ListContainerProps {
  isUninitialized: boolean;
  isLoading: boolean;
  isError: boolean;
  data: any[] | undefined;
  children: ReactNode;
  emptyListCaption: string;
}

export default function ListContainer({
  isUninitialized,
  isLoading,
  isError,
  data,
  children,
  emptyListCaption,
}: ListContainerProps) {
  return (
    <Box mt={5} display='flex' flexDirection='column' alignItems='stretch' overflow='auto' flex={1}>
      {!isUninitialized &&
        !isLoading &&
        (isError ? (
          <InfoCaption caption='Error occured' />
        ) : data!.length > 0 ? (
          children
        ) : (
          <InfoCaption caption={emptyListCaption} />
        ))}
    </Box>
  );
}
