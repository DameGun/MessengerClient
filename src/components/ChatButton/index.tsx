import { Avatar, Flex, Text, Skeleton } from "@chakra-ui/react";

export default function ChatButton() {
    return (
        <Skeleton isLoaded={true}>
            <Flex bg='gray.200' borderRadius='10' p={2}>
                <Avatar name='User'/>
                <Flex flexDirection='column' pl={2}>
                    <Text fontWeight='bold' fontSize={16}>User</Text>
                    <Text fontSize={14}>Last message...</Text>
                </Flex>
            </Flex>
        </Skeleton>
    )
}