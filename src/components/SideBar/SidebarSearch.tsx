import {
  Input,
  InputGroup,
  InputLeftElement,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';
import CustomDrawer from '@components/CustomDrawer';
import { Fragment, useRef } from 'react';
import { HiOutlineSearch } from 'react-icons/hi';

export default function SidebarSearch() {
  const inputRef = useRef<HTMLDivElement>(null);

  return (
    <Fragment>
      <InputGroup ref={inputRef}>
        <InputLeftElement>
          <HiOutlineSearch size={20} />
        </InputLeftElement>
        <Input placeholder='Search' />
      </InputGroup>
      <CustomDrawer placement='left' triggerRef={inputRef} makeTriggerVisible={true}>
        <Tabs isFitted mt={2}>
          <TabList mb='1em'>
            <Tab>Chats</Tab>
            <Tab>Channels</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <p>one!</p>
            </TabPanel>
            <TabPanel>
              <p>two!</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </CustomDrawer>
    </Fragment>
  );
}
