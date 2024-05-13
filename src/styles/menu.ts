import { menuAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(menuAnatomy.keys);

const baseStyle = definePartsStyle({
    list: {
        px: 1,
        boxShadow: 'lg'
    },
    item: {
        borderRadius: 'md',
        fontWeight: '500'
    }
})

export const menuTheme = defineMultiStyleConfig({ baseStyle });