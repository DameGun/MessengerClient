import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const helpers = createMultiStyleConfigHelpers(['field']);

const simple = helpers.definePartsStyle({
  field: {
    py: 7,
    borderRadius: 10,
    boxShadow: 'md',
    my: 5,
  },
});

export const inputStyle = helpers.defineMultiStyleConfig({
  variants: { simple },
});
