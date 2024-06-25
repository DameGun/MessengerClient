import {
  Flex,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Switch,
  Text,
  useColorMode,
} from '@chakra-ui/react';
import { HiOutlineMoon, HiBars3 } from 'react-icons/hi2';
import { TbLogout2 } from 'react-icons/tb';
import { useAppDispatch } from '@hooks/redux';
import { logout } from '@services/redux/auth/authSlice';
import ContactsMenuButton from '@components/Contacts/ContactsMenuButton';
import SidebarSearch from './SidebarSearch';

export default function SidebarHeader() {
  const { colorMode, toggleColorMode } = useColorMode();
  const dispatch = useAppDispatch();

  return (
    <Flex mt='5' gap='2' pr={2}>
      <Menu>
        <MenuButton as={IconButton} icon={<HiBars3 size={20} />} />
        <MenuList>
          <ContactsMenuButton />
          <MenuItem
            icon={<HiOutlineMoon size={20} />}
            onClick={toggleColorMode}
            closeOnSelect={false}
          >
            <HStack justify='space-between'>
              <Text>Dark mode</Text>
              <Switch id='color-mode' isChecked={colorMode == 'dark'} />
            </HStack>
          </MenuItem>
          <MenuItem icon={<TbLogout2 size={20} />} onClick={() => dispatch(logout())}>
            Logout
          </MenuItem>
        </MenuList>
      </Menu>
      <SidebarSearch />
    </Flex>
  );
}
