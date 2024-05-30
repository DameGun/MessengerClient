import {
  Box,
  Menu,
  MenuList,
  Portal,
} from "@chakra-ui/react";
import { ReactElement, ReactNode, cloneElement } from "react";
import { Fragment, MouseEvent, useState } from "react";

interface ContextMenuProps {
  TriggerComponent: ReactElement;
  children: ReactNode;
}

export interface ContextMenuTriggerProps {
  onContextMenu?: (event: MouseEvent) => void;
  isContextFocus?: boolean;
  isLink?: boolean
}

export default function ContextMenu(props: ContextMenuProps) {
  const [openMenu, setOpenMenu] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });

  const handleContextMenu = (event: MouseEvent) => {
    event.preventDefault();

    setMenuPosition({ x: event.clientX, y: event.clientY });
    setOpenMenu(!openMenu);
  };

  const Trigger = cloneElement(props.TriggerComponent, {
    onContextMenu: handleContextMenu,
    isContextFocus: openMenu,
  });

  return (
    <Fragment>
      {Trigger}
      {openMenu && (
        <Portal>
          <Box
            position="fixed"
            top="0"
            left="0"
            width="100vw"
            height="100vh"
            onClick={handleContextMenu}
            onContextMenu={handleContextMenu}
            zIndex="900"
          />
          <Menu
            isLazy
            isOpen={openMenu}
            autoSelect={false}
          >
            <MenuList
              position="fixed"
              top={menuPosition.y}
              left={menuPosition.x}
              zIndex={1000}
            >
              {props.children}
            </MenuList>
          </Menu>
        </Portal>
      )}
    </Fragment>
  );
}
