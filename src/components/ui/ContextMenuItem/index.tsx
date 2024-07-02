import { ReactElement, ReactNode, useContext } from 'react';
import { HStack, Text, useStyleConfig } from '@chakra-ui/react';
import { ContextMenuActions } from '../ContextMenu';

interface ContextMenuItemProps {
  color?: 'red.500' | 'blue.500';
  icon?: ReactElement;
  onClick?: () => void;
  children: ReactNode;
}

export default function ContextMenuItem({ icon, onClick, children, color }: ContextMenuItemProps) {
  const styles = useStyleConfig('ContextMenuItem');
  const contextMenuActions = useContext(ContextMenuActions);

  function handleClick() {
    if (onClick) onClick();
    if (contextMenuActions) contextMenuActions.onClose();
  }

  return (
    <HStack __css={styles} color={color} onClick={handleClick} spacing={5}>
      {icon}
      <Text>{children}</Text>
    </HStack>
  );
}
