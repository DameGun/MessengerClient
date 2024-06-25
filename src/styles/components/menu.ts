import { menuAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(
  menuAnatomy.keys
);

const baseStyle = definePartsStyle({
  list: {
    px: 1,
    boxShadow: 'lg',
    zIndex: 1000,
  },
  item: {
    borderRadius: 'md',
    fontWeight: '500',
  },
});

export const menuStyle = defineMultiStyleConfig({ baseStyle });
