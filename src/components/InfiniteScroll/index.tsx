import { Box } from "@chakra-ui/react";
import { ReactNode, RefObject, useCallback, useEffect, useRef } from "react";

interface InfiniteScrollProps {
  id: string;
  children: ReactNode;
  hasMore: boolean;
  page: number;
  next: () => void;
  isDataFetching: boolean;
  inverse?: boolean;
  scrollableRef: RefObject<HTMLDivElement>;
  loader?: ReactNode;
  spacing?: number;
}

export default function InfiniteScroll(props: InfiniteScrollProps) {
  const topElementRef = useRef<HTMLDivElement>(null);

  const fetchMoreData = useCallback(() => {
    if (!props.isDataFetching && props.hasMore) {
      props.next();
    }
  }, [props.isDataFetching]);

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

    if (topElementRef.current) {
      observer.observe(topElementRef.current);
    }

    return () => {
      if (topElementRef.current) {
        observer.unobserve(topElementRef.current);
      }
    };
  }, [fetchMoreData]);

  return (
    <Box
      id={props.id}
      display="flex"
      ref={props.scrollableRef}
      flexDirection={props.inverse ? "column-reverse" : "column"}
      overflow="hidden"
      _hover={{
        overflowY: "scroll",
      }}
      flex="1 1 0%"
      position="sticky"
      gap={props.spacing}
      sx={{
        scrollbarGutter: "stable",
      }}
    >
      {props.children}
      <div ref={topElementRef} className="scrollableTrigger"/>
      {props.isDataFetching && props.page !== 1 && props.loader}
    </Box>
  );
}
