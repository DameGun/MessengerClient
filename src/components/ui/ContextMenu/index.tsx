import {
  cloneElement,
  createContext,
  ReactElement,
  ReactNode,
  useCallback,
  useEffect,
} from 'react';
import { MouseEvent, useState } from 'react';
import { Box, Fade, Portal, useStyleConfig } from '@chakra-ui/react';

interface ContextMenuProps {
  TriggerComponent: ReactElement;
  children: ReactNode;
}

export interface ContextMenuTriggerProps {
  onContextMenu?: (event: MouseEvent) => void;
  isContextFocus?: boolean;
}

export interface ContextMenuActionType {
  onClose: () => void;
}

export const ContextMenuActions = createContext<ContextMenuActionType | null>(null);

export default function ContextMenu({ TriggerComponent, children }: ContextMenuProps) {
  const [openMenu, setOpenMenu] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const [menuRef, setMenuRef] = useState<HTMLDivElement | null>(null);
  const styles = useStyleConfig('ContextMenu');

  function handleContextMenu(event: MouseEvent) {
    event.preventDefault();

    const x = event.clientX;
    const y = event.clientY;

    setMenuPosition({ x, y });

    setOpenMenu(!openMenu);
  }

  function handleCloseContextMenu() {
    setOpenMenu(false);
  }

  const Trigger = cloneElement(TriggerComponent, {
    onContextMenu: handleContextMenu,
    isContextFocus: openMenu,
  });

  const refCallback = useCallback((node: HTMLDivElement) => {
    if (node !== null) {
      setMenuRef(node);
    }
  }, []);

  useEffect(() => {
    if (openMenu && menuRef) {
      const { x, y } = menuPosition;
      let newX = x;
      let newY = y;

      if (window.innerWidth - x < menuRef.offsetWidth) {
        newX -= menuRef.offsetWidth;
      }

      if (window.innerHeight - y - menuRef.offsetHeight < menuRef.offsetHeight) {
        newY -= menuRef.offsetHeight;
      }

      setMenuPosition({ x: newX, y: newY });
    }
  }, [openMenu, menuRef, menuPosition]);

  return (
    <>
      {Trigger}
      {openMenu && (
        <Portal>
          <Box
            id='context-overlay'
            position='fixed'
            top='0'
            left='0'
            width='100vw'
            height='100vh'
            onClick={handleCloseContextMenu}
            onContextMenu={handleContextMenu}
            zIndex={800}
          />
          <Fade in={true} unmountOnExit>
            <Box __css={styles} top={menuPosition.y} left={menuPosition.x} ref={refCallback}>
              <ContextMenuActions.Provider value={{ onClose: handleCloseContextMenu }}>
                {children}
              </ContextMenuActions.Provider>
            </Box>
          </Fade>
        </Portal>
      )}
    </>
  );
}
