import { defineStyleConfig } from '@chakra-ui/react';

export const contextMenuItemStyle = defineStyleConfig({
  baseStyle: {
    py: 1,
    px: 2,
    borderRadius: '6px',

    cursor: 'pointer',

    minWidth: '10em',
    fontWeight: 'medium',

    _hover: {
      backgroundColor: 'gray.200',
    },
    _dark: {
      _hover: {
        backgroundColor: 'gray.600',
      },
    },
  },
});
