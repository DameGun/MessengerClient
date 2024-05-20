import { extendTheme, type ThemeConfig } from "@chakra-ui/react";
import { menuStyle } from "@styles/components/menu";
import { chatButtonStyle } from '@styles/components/chatButton';
import { chatHeaderStyle } from "@styles/components/chatHeader";

const config: ThemeConfig = {
    initialColorMode: 'system',
    useSystemColorMode: true
}

const theme = extendTheme({ 
    config,
    components: {
        Menu: menuStyle,
        ChatButton: chatButtonStyle,
        ChatHeader: chatHeaderStyle
    } 
});

export default theme;