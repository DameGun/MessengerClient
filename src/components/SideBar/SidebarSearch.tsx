import { useRef } from 'react';
import { HiOutlineSearch } from 'react-icons/hi';
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
import CustomDrawer from '@components/ui/CustomDrawer';

export default function SidebarSearch() {
  const inputRef = useRef<HTMLDivElement>(null);

  return (
    <>
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
    </>
  );
}
