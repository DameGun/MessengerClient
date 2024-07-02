import { extendTheme, StyleFunctionProps, type ThemeConfig, ThemeOverride } from '@chakra-ui/react';
import { chatHeaderStyle } from '@components/Chats/ChatHeader/styles';
import { messageStyle } from '@components/Messages/MessageItem/styles';
import { scrollToBottomButtonStyle } from '@components/Messages/ScrollToBottomButton/styles';
import { contextMenuStyle } from '@components/ui/ContextMenu/styles';
import { contextMenuItemStyle } from '@components/ui/ContextMenuItem/styles';
import { infoCaptionStyle } from '@components/ui/InfoCaption/styles';
import { styledByttonStyles } from '@components/ui/StyledButton/styles';
import { menuStyle } from '@styles/foundations/menu';
import { inputStyle } from './foundations/input';

const config: ThemeConfig = {
  initialColorMode: 'system',
  useSystemColorMode: true,
};

const theme: ThemeOverride = extendTheme({
  config,
  components: {
    Menu: menuStyle,
    StyledButton: styledByttonStyles,
    ChatHeader: chatHeaderStyle,
    Input: inputStyle,
    InfoCaption: infoCaptionStyle,
    Message: messageStyle,
    ScrollToBottomButton: scrollToBottomButtonStyle,
    ContextMenuItem: contextMenuItemStyle,
    ContextMenu: contextMenuStyle,
  },
  styles: {
    global: (props: StyleFunctionProps) => ({
      body: {
        minH: '100vh',
        overflow: 'hidden',
      },
      '&::-webkit-scrollbar': {
        width: '5px',
      },
      '&::-webkit-scrollbar-thumb': {
        bg: props.colorMode === 'light' ? 'gray.200' : 'gray.700',
        borderRadius: '5px',
      },
    }),
  },
});

export default theme;
