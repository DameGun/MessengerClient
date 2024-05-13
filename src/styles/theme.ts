import { extendTheme, type ThemeConfig } from "@chakra-ui/react";
import { menuTheme } from "./menu";

const config: ThemeConfig = {
    initialColorMode: 'system',
    useSystemColorMode: true
}

const theme = extendTheme({ 
    config,
    components: {
        Menu: menuTheme
    } 
});

export default theme;