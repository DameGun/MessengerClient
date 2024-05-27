import { RefObject } from "react";

export function scrollToEndInChat(ref: RefObject<HTMLDivElement>, inverse: boolean) {
    const scrollable = ref.current;

    if (scrollable) {
        setTimeout(() => {
            scrollable.scrollTo({ top: inverse ? 0 : scrollable.scrollHeight, behavior: 'smooth' })
        }, 100)
    }
}