import { Box } from "@chakra-ui/react";
import SideBar from "@components/SideBar";
import { useState, MouseEvent } from "react";
import { Outlet } from "react-router-dom";

const MIN_SIDEBAR_WIDTH = 300;
const MAX_SIDEBAR_WIDTH = 700;

export default function Layout() {
  const [sidebarWidth, setSidebarWidth] = useState(MIN_SIDEBAR_WIDTH);
  const [dragActive, setDragActive] = useState(false);

  function handleMouseMove(event: MouseEvent) {
    if (dragActive) {
      event.preventDefault();
      const delta = event.clientX - sidebarWidth;
      const newWidth = Math.max(MIN_SIDEBAR_WIDTH, Math.min(MAX_SIDEBAR_WIDTH, sidebarWidth + delta));

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
      <Box w={sidebarWidth}>
        <SideBar />
      </Box>
      <Box
        onMouseDown={handleMouseDown}
        h="100%"
        position="relative"
        cursor="ew-resize"
        borderInline="solid"
        borderInlineStartWidth={1}
        borderInlineEndColor='white'
        borderInlineStartColor='white'
        borderInlineEndWidth={5}
        marginRight={2}
        bg="gray.300"
        width={2}
        _hover={{
          borderInlineColor: "gray.500",
          bg: "gray.500",
        }}
      />
      <Box flexGrow={1}>
        <Outlet />
      </Box>
    </Box>
  );
}
