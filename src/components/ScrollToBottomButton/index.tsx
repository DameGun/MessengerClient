import { IconButton, useStyleConfig } from "@chakra-ui/react";
import { scrollToEndInChat } from "@helpers/domHelpers";
import { RefObject, useCallback, useEffect, useState } from "react";
import { HiArrowDown } from "react-icons/hi";

interface ScrollToBottomButtonProps {
  scrollableRef: RefObject<HTMLDivElement>;
}

export default function ScrollToBottomButton(props: ScrollToBottomButtonProps) {
  const styles = useStyleConfig("ScrollToBottomButton");
  const [isShowScrollToBottom, setShowScrollToBottom] =
    useState<boolean>(false);

  const onScroll: EventListener = useCallback(({ currentTarget }) => {
    const { scrollTop } = currentTarget as HTMLDivElement;

    if (scrollTop < -20) {
      setShowScrollToBottom(true);
    } else {
      setShowScrollToBottom(false);
    }
  }, []);

  useEffect(() => {
    const ref = props.scrollableRef.current;
    if (ref) {
      ref.addEventListener("scroll", onScroll);
    }

    return () => {
      if (ref) {
        ref.removeEventListener("scroll", onScroll);
      }
    };
  }, [props.scrollableRef.current]);

  return (
    isShowScrollToBottom && (
      <IconButton
        aria-label="scrollToBottom"
        isRound
        __css={styles}
        icon={<HiArrowDown size={30} />}
        onClick={() => scrollToEndInChat(props.scrollableRef, true)}
        transition='0.2s'
      />
    )
  );
}
