import { Box } from "@chakra-ui/react";
import { ReactNode, RefObject, useCallback, useEffect, useRef } from "react";

interface InfiniteScrollProps {
  children: ReactNode;
  hasMore: boolean;
  page: number;
  next: () => void;
  isDataFetching: boolean;
  inverse?: boolean;
  scrollableRef: RefObject<HTMLDivElement>;
  loader?: ReactNode;
}

export default function InfiniteScroll(props: InfiniteScrollProps) {
  const topElementRef = useRef<HTMLDivElement>(null);

  const fetchMoreMessages = useCallback(() => {
    if (!props.isDataFetching && props.hasMore) {
      props.next();
    }
  }, [props.isDataFetching]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchMoreMessages();
        }
      },
      {
        threshold: 1.0,
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
  }, [fetchMoreMessages]);

  return (
    <Box
      className="scrollableInner"
      display="flex"
      ref={props.scrollableRef}
      flexDirection={props.inverse ? "column-reverse" : "column"}
      overflow="auto"
      sx={{
        overflowAnchor: "none",
      }}
      flex="1 1 0%"
      position="sticky"
    >
      {!props.inverse && (
        <div ref={topElementRef} className="scrollableTrigger"></div>
      )}
      {props.children}
      {props.inverse && (
        <div ref={topElementRef} className="scrollableTrigger"></div>
      )}
      {(props.isDataFetching && props.page !== 1) && props.loader}
    </Box>
  );
}
