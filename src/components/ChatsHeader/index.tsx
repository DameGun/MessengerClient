import { Flex, Icon, IconButton, Input, InputGroup, InputLeftElement, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { HiOutlineMoon, HiBars3 } from "react-icons/hi2";
import { HiOutlineSearch } from "react-icons/hi";

export default function ChatsHeader() {
    return (
        <Flex mt='5' gap='2'>
            <Menu>
                <MenuButton as={IconButton}>
                    <HiBars3 size={20}/>
                </MenuButton>
                <MenuList>
                    <MenuItem icon={<Icon as={HiOutlineMoon} boxSize={5}/>}>Dark mode</MenuItem>
                </MenuList>
            </Menu>
            <InputGroup>
                <InputLeftElement>
                    <HiOutlineSearch size={20}/>
                </InputLeftElement>
                <Input placeholder="Search"/>
            </InputGroup>
        </Flex>
    )
}