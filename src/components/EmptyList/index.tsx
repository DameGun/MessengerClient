import { Box, IconButton, Text } from "@chakra-ui/react";
import { IoReload } from "react-icons/io5";

export default function EmptyList({ caption, reloadFunc } : { caption: string, reloadFunc: any }) {
    return (
        <Box h='100vh' display='flex' flexDirection='row' justifyContent='center' alignItems='center' gap={2}>
            <Text bg='gray.300' paddingX={3} paddingY={0.5} borderRadius={10}>{caption}</Text>
            {reloadFunc && (
                <IconButton 
                    aria-label="reload" 
                    icon={<IoReload />} 
                    size='sm' 
                    isRound={true} 
                    _hover={{ backgroundColor: 'gray.300'}}
                    onClick={() => reloadFunc}
                />
            )}
        </Box>
    )
}