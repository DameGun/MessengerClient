import { MenuItem } from '@chakra-ui/react';
import { ContactsList } from '@components/Contacts/ContactsList';
import CustomDrawer from '@components/CustomDrawer';
import { useRef } from 'react';
import { HiOutlineUser } from 'react-icons/hi';
import { Fragment } from 'react/jsx-runtime';

export default function ContactsMenuButton() {
  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <Fragment>
      <MenuItem icon={<HiOutlineUser size={20} />} ref={buttonRef}>
        Contacts
      </MenuItem>
      <CustomDrawer placement='left' header='Contacts' triggerRef={buttonRef}>
        <ContactsList />
      </CustomDrawer>
    </Fragment>
  );
}
