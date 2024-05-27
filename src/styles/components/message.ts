import { defineStyleConfig } from "@chakra-ui/react";

export const messageStyle = defineStyleConfig({
    baseStyle: {
        backgroundColor: 'blue.50',
        pt: 1,
        pl: 3,
        pr: 4,
        borderRadius: 20,
        display: 'flex',
        flexDirection: 'column',
        boxShadow: 'md',
        maxW: '70%',

        _dark: {
            backgroundColor: 'blue.800',
        }
    }
})