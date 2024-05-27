import {
  Box,
  BoxProps,
  Menu,
  MenuList,
  forwardRef,
} from "@chakra-ui/react";
import { Fragment, MouseEvent, useEffect, useState } from "react";

interface ContextMenuProps {
  TriggerComponent: React.ReactNode;
  children: React.ReactNode;
  isCursorLink?: boolean;
  setContextFocus?: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ContextMenu(props: ContextMenuProps) {
  const [openMenu, setOpenMenu] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (props.setContextFocus) {
      props.setContextFocus(openMenu);
    }
  }, [openMenu]);

  const handleContextMenu = (event: MouseEvent) => {
    event.preventDefault();

    setMenuPosition({ x: event.clientX, y: event.clientY });
    setOpenMenu(!openMenu);
  };

  const Trigger = forwardRef<BoxProps, "div">((boxProps, ref) => (
    <Box
      onContextMenu={handleContextMenu}
      cursor={props.isCursorLink ? "pointer" : "default"}
      ref={ref}
      {...boxProps}
    />
  ));

  return (
    <Fragment>
      <Trigger>{props.TriggerComponent}</Trigger>
      {openMenu && (
        <Box
          position="fixed"
          top="0"
          left="0"
          width="100vw"
          height="100vh"
          onClick={handleContextMenu}
          zIndex="900"
        />
      )}
      <Menu
        isLazy
        isOpen={openMenu}
        onClose={() => setOpenMenu(false)}
        autoSelect={false}
      >
        <MenuList
          transition="ease-in"
          position="fixed"
          top={menuPosition.y}
          left={menuPosition.x}
          zIndex={1000}
        >
          {props.children}
        </MenuList>
      </Menu>
    </Fragment>
  );
}
