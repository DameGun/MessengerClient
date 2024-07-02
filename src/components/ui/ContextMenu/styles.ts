import { defineStyleConfig } from '@chakra-ui/react';

export const contextMenuStyle = defineStyleConfig({
  baseStyle: {
    position: 'fixed',

    borderRadius: '8px',
    boxShadow: 'dark-lg',

    zIndex: 900,

    p: 2,
    backgroundColor: 'white',

    _dark: {
      backgroundColor: 'gray.700',
    },
  },
});
