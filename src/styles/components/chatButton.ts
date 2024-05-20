import { defineStyleConfig } from "@chakra-ui/react";

export const chatButtonStyle = defineStyleConfig({
    baseStyle: {
        borderRadius: 10,
        minW: 150,
        _hover: {
            backgroundColor: 'gray.200'
        },
        _dark: {
            backgroundColor: 'gray.800',
            _hover: {
                backgroundColor: 'gray.700'
            }
        }
    },
    variants: {
        selected: {
            backgroundColor: 'gray.200',
            _dark: {
                backgroundColor: 'gray.700'
            }
        }
    }
})