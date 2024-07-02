import { defineStyleConfig } from '@chakra-ui/react';

export const chatHeaderStyle = defineStyleConfig({
  baseStyle: {
    position: 'relative',
    p: 2,
    px: 10,
    boxShadow: 'xl',
    width: '100%',
    backgroundColor: 'white',
    _dark: {
      backgroundColor: 'gray.800',
    },
  },
});
