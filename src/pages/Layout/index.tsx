import { Box, Container, Flex } from "@chakra-ui/react";
import React from "react";

export default function Layout() {
    return (
        <React.Fragment>
            <Flex minHeight='100vh'>
                <Box 
                    id="sideBar" 
                    minWidth='20%' 
                    bg="gray.50" 
                    borderRight='solid' 
                    borderRightWidth={0.5} 
                    borderRightColor='gray.300'
                >
                    <Container>
                    </Container>
                </Box>
                
                <Box id="content" minWidth='80%'>
                    <Container>
                    </Container>
                </Box>
            </Flex>
        </React.Fragment>
    )
}