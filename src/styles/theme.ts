import { StyleFunctionProps, extendTheme, type ThemeConfig } from "@chakra-ui/react";
import { menuStyle } from "@styles/components/menu";
import { chatButtonStyle } from '@styles/components/chatButton';
import { chatHeaderStyle } from "@styles/components/chatHeader";
import { inputStyle } from "./components/input";
import { infoCaptionStyle } from "./components/infoCaption";
import { messageStyle } from "./components/message";
import { scrollToBottomButtonStyle } from "./components/scrollToBottomButton";

const config: ThemeConfig = {
    initialColorMode: 'system',
    useSystemColorMode: true
}

const theme = extendTheme({
    config,
    components: {
        Menu: menuStyle,
        ChatButton: chatButtonStyle,
        ChatHeader: chatHeaderStyle,
        Input: inputStyle,
        InfoCaption: infoCaptionStyle,
        Message: messageStyle,
        ScrollToBottomButton: scrollToBottomButtonStyle
    },
    styles: {
        global: (props: StyleFunctionProps) => ({
            body: {
                minH: '100vh',
                overflow: 'hidden'
            },
            '&::-webkit-scrollbar': {
                width: '5px',
            },
            '&::-webkit-scrollbar-thumb': {
                bg: props.colorMode === 'light' ? 'gray.200' : 'gray.700',
                borderRadius: '5px'
            }
        })
    }
});

export default theme;