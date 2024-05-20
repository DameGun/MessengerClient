import {
  Flex,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Switch,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { HiOutlineMoon, HiBars3 } from "react-icons/hi2";
import { HiOutlineSearch } from "react-icons/hi";

export default function SidebarHeader() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Flex mt="5" gap="2">
      <Menu>
        <MenuButton as={IconButton} icon={<HiBars3 size={20} />} />
        <MenuList>
          <MenuItem
            icon={<HiOutlineMoon size={20} />}
            onClick={toggleColorMode}
            closeOnSelect={false}
          >
            <HStack justify="space-between">
              <Text>Dark mode</Text>
              <Switch id="color-mode" isChecked={colorMode == "dark"} />
            </HStack>
          </MenuItem>
        </MenuList>
      </Menu>
      <InputGroup>
        <InputLeftElement>
          <HiOutlineSearch size={20} />
        </InputLeftElement>
        <Input placeholder="Search" />
      </InputGroup>
    </Flex>
  );
}
