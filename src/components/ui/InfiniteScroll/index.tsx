import { ReactNode, RefObject, useCallback, useEffect, useRef } from 'react';
import { Box } from '@chakra-ui/react';

interface InfiniteScrollProps {
  id: string;
  children: ReactNode;
  hasMore: boolean | undefined;
  page: number;
  next: () => void;
  isDataFetching: boolean;
  inverse?: boolean;
  scrollableRef: RefObject<HTMLDivElement>;
  loader?: ReactNode;
  spacing?: number;
}

export default function InfiniteScroll({
  id,
  children,
  hasMore,
  page,
  next,
  isDataFetching,
  inverse,
  scrollableRef,
  loader,
  spacing,
}: InfiniteScrollProps) {
  const topElementRef = useRef<HTMLDivElement>(null);

  const fetchMoreData = useCallback(() => {
    if (!isDataFetching && hasMore) {
      next();
    }
  }, [isDataFetching, hasMore, next]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchMoreData();
        }
      },
      {
        threshold: 0.1,
      }
    );

    const elementRef = topElementRef.current;

    if (elementRef) {
      observer.observe(elementRef);
    }

    return () => {
      if (elementRef) {
        observer.unobserve(elementRef);
      }
    };
  }, [fetchMoreData]);

  return (
    <Box
      id={id}
      display='flex'
      ref={scrollableRef}
      flexDirection={inverse ? 'column-reverse' : 'column'}
      overflow='hidden'
      _hover={{
        overflowY: 'scroll',
      }}
      flex='1 1 0%'
      position='sticky'
      gap={spacing}
      sx={{
        scrollbarGutter: 'stable',
      }}
    >
      {children}
      <div ref={topElementRef} className='scrollableTrigger' />
      {isDataFetching && page !== 1 && loader}
    </Box>
  );
}
