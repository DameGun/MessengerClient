import { Box, Menu, MenuList } from '@chakra-ui/react';
import { ReactElement, ReactNode, cloneElement, useRef } from 'react';
import { Fragment, MouseEvent, useState } from 'react';

interface ContextMenuProps {
  TriggerComponent: ReactElement;
  children: ReactNode;
}

export interface ContextMenuTriggerProps {
  onContextMenu?: (event: MouseEvent) => void;
  isContextFocus?: boolean;
}

export default function ContextMenu({ TriggerComponent, children }: ContextMenuProps) {
  const [openMenu, setOpenMenu] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const menuRef = useRef<HTMLDivElement>(null);

  const handleContextMenu = (event: MouseEvent | undefined) => {
    if (event) {
      event.preventDefault();

      let x = event.clientX;
      let y = event.clientY;

      if (menuRef.current) {
        if (window.innerWidth - x + menuRef.current.offsetWidth / 2 < menuRef.current.offsetWidth) {
          x -= menuRef.current.offsetWidth;
        }

        if (window.innerHeight - +menuRef.current.offsetHeight / 2 < menuRef.current.offsetHeight) {
          y -= menuRef.current.offsetHeight;
        }
      }

      setMenuPosition({ x, y });
    }

    setOpenMenu(!openMenu);
  };

  const Trigger = cloneElement(TriggerComponent, {
    onContextMenu: handleContextMenu,
    isContextFocus: openMenu,
  });

  return (
    <Fragment>
      {Trigger}
      {openMenu && (
        <Box
          position='fixed'
          top='0'
          left='0'
          width='100vw'
          height='100vh'
          onClick={handleContextMenu}
          onContextMenu={handleContextMenu}
          zIndex='900'
        />
      )}
      <Menu
        isLazy
        isOpen={openMenu}
        onClose={() => handleContextMenu(undefined)}
        autoSelect={false}
      >
        <MenuList
          position='fixed'
          top={menuPosition.y}
          left={menuPosition.x}
          zIndex={1000}
          ref={menuRef}
        >
          {children}
        </MenuList>
      </Menu>
    </Fragment>
  );
}
