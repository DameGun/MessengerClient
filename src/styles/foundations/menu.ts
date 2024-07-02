import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system';

const helpers = createMultiStyleConfigHelpers(['list', 'item']);

const baseStyle = helpers.definePartsStyle({
  list: {
    px: 1,
    boxShadow: 'lg',
    zIndex: 900,
  },
  item: {
    borderRadius: 'md',
    fontWeight: '500',
  },
});

export const menuStyle = helpers.defineMultiStyleConfig({ baseStyle });
