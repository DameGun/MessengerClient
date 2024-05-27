import { inputAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(inputAnatomy.keys);

const simple = definePartsStyle({
    field: {
        py: 7,
        borderRadius: 10,
        boxShadow: 'md',
        my: 5
    }
})

export const inputStyle = defineMultiStyleConfig({
    variants: { simple }
})