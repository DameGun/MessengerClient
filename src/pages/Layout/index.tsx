import { Box, useColorMode } from "@chakra-ui/react";
import SideBar from "@components/SideBar";
import { useState, MouseEvent } from "react";
import { Outlet } from "react-router-dom";
import chatBgDark from "@assets/chat-bg-dark.jpg";
import chatBgLight from "@assets/chat-bg-light.jpg";
import { useSignalRConnection } from "@hooks/singalr";

const MIN_SIDEBAR_WIDTH = 300;
const MAX_SIDEBAR_WIDTH = 700;

export default function Layout() {
  const [sidebarWidth, setSidebarWidth] = useState(MIN_SIDEBAR_WIDTH);
  const [dragActive, setDragActive] = useState(false);

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

      setSidebarWidth(newWidth);
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
      height="100vh"
      display="flex"
      flexDirection="row"
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
    >
      <Box id="LeftColumn" w={sidebarWidth}>
        {!isLoading && <SideBar />}
      </Box>
      <Box
        id="ColumnDivider"
        onMouseDown={handleMouseDown}
        cursor="ew-resize"
        width={2}
        borderRightWidth={1}
      />
      <Box
        id="RightColumn"
        flexGrow={1}
        bgImage={colorMode == "light" ? chatBgLight : chatBgDark}
        bgSize="cover"
        width={window.innerWidth - sidebarWidth}
      >
        {!isLoading && <Outlet />}
      </Box>
    </Box>
  );
}
