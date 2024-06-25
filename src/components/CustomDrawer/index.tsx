import { Box, Fade, HStack, IconButton, Portal, Text, VStack } from '@chakra-ui/react';
import { useAppSelector } from '@hooks/redux';
import { selectSidebarWidth } from '@services/redux/domValues/domValuesSlice';
import { ReactNode, RefObject, useEffect, useState } from 'react';
import { IoMdArrowBack } from 'react-icons/io';

interface CustomDrawerProps {
  children: ReactNode;
  header?: ReactNode | string;
  placement: 'right' | 'left';
  width?: number;
  triggerRef: RefObject<HTMLElement>;
  makeTriggerVisible?: boolean;
}

export default function CustomDrawer({
  children,
  header,
  placement,
  width,
  triggerRef,
  makeTriggerVisible,
}: CustomDrawerProps) {
  const [isOpen, setOpen] = useState<boolean>(false);
  const currentSidebarWidth = useAppSelector(selectSidebarWidth);

  function onOpen() {
    setOpen(true);

    if (makeTriggerVisible) {
      const trigger = triggerRef.current;

      if (trigger) {
        trigger.style.zIndex = '850';
      }
    }
  }

  function onClose() {
    setOpen(false);

    if (makeTriggerVisible) {
      const trigger = triggerRef.current;

      if (trigger) {
        trigger.style.zIndex = '';
      }
    }
  }

  useEffect(() => {
    const trigger = triggerRef.current;

    if (trigger) {
      trigger.addEventListener('click', onOpen);
    }

    return () => {
      if (trigger) {
        trigger.removeEventListener('click', onOpen);
      }
    };
  });

  return (
    isOpen && (
      <Portal>
        <Fade in={isOpen}>
          <Box
            position='absolute'
            top={0}
            left={placement == 'left' ? 0 : undefined}
            right={placement == 'right' ? 0 : undefined}
            w={width || currentSidebarWidth}
            h='100vh'
            display='flex'
            flexDirection='column'
            zIndex={800}
            bgColor='white'
            _dark={{
              bgColor: 'gray.800',
            }}
            flex={1}
            borderRightWidth={1}
          >
            <HStack mt={5} px={2} align='center' spacing={5}>
              <IconButton aria-label='back' icon={<IoMdArrowBack size={25} />} onClick={onClose} />
              <Text fontSize={22}>{header}</Text>
            </HStack>
            <VStack align='stetch' pl={2}>
              {children}
            </VStack>
          </Box>
        </Fade>
      </Portal>
    )
  );
}
