import { Box, useColorMode } from '@chakra-ui/react';
import SideBar from '@components/SideBar/SidebarContainer';
import { useState, MouseEvent } from 'react';
import { Outlet } from 'react-router-dom';
import chatBgDark from '@assets/chat-bg-dark.jpg';
import chatBgLight from '@assets/chat-bg-light.jpg';
import { useSignalRConnection } from '@hooks/singalr';
import { useAppDispatch, useAppSelector } from '@hooks/redux';
import { MAX_SIDEBAR_WIDTH, MIN_SIDEBAR_WIDTH } from '@constants/index';
import { selectSidebarWidth, setSidebarWidth } from '@state/domValues/domValuesSlice';

export default function Layout() {
  const [dragActive, setDragActive] = useState(false);
  const dispatch = useAppDispatch();
  const sidebarWidth = useAppSelector(selectSidebarWidth);

  const { colorMode } = useColorMode();

  const { isLoading } = useSignalRConnection();

  function handleMouseMove(event: MouseEvent) {
    if (dragActive) {
      event.preventDefault();
      const delta = event.clientX - sidebarWidth;
      const newWidth = Math.max(
        MIN_SIDEBAR_WIDTH,
        Math.min(MAX_SIDEBAR_WIDTH, sidebarWidth + delta)
      );

      dispatch(setSidebarWidth(newWidth));
    }
  }

  function handleMouseUp() {
    setDragActive(false);
  }

  function handleMouseDown(event: MouseEvent) {
    event.preventDefault();
    setDragActive(true);
  }

  return (
    <Box
      height='100vh'
      display='flex'
      flexDirection='row'
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      bgImage={colorMode == 'light' ? chatBgLight : chatBgDark}
      bgSize='cover'
    >
      <Box
        id='LeftColumn'
        w={sidebarWidth}
        bgColor='white'
        _dark={{
          bgColor: 'gray.800',
        }}
        borderRightWidth={1}
      >
        {!isLoading && <SideBar />}
      </Box>

      <Box id='RightColumn' flexGrow={1}>
        <Box
          id='ColumnDivider'
          position='absolute'
          onMouseDown={handleMouseDown}
          cursor='ew-resize'
          width={2}
          bgColor='transparent'
          h='100vh'
          zIndex={2}
        />
        {!isLoading && <Outlet />}
      </Box>
    </Box>
  );
}
