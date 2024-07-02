import { defineStyleConfig } from '@chakra-ui/react';

export const scrollToBottomButtonStyle = defineStyleConfig({
  baseStyle: {
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '60px',
    height: '60px',
    right: '5%',
    bottom: '10%',
    backgroundColor: 'gray.300',
    _hover: {
      backgroundColor: 'blue.200',
    },

    _dark: {
      backgroundColor: 'gray.800',
      _hover: {
        backgroundColor: 'blue.600',
      },
    },
  },
});
