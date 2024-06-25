import { Avatar, Box, HStack, Text, VStack, useStyleConfig } from '@chakra-ui/react';
import { ContextMenuTriggerProps } from '@components/ContextMenu';
import InfoRow from './InfoRow';

interface ButtonContainerProps extends ContextMenuTriggerProps {
  variant?: string;
  mapItem: ButtonContainerMappingItem;
  onClick: () => void;
  isCursorLink?: boolean;
}

export interface ButtonContainerMappingItem {
  image: string;
  name: string;
  info?: {
    lastMessageTime?: string;
    lastMessage: {
      isSuccess: boolean;
      text: string;
      isCurrentUserSender: boolean;
    };
  };
}

export default function ButtonContainer({
  variant,
  mapItem,
  onClick,
  isCursorLink,
  onContextMenu,
}: ButtonContainerProps) {
  const styles = useStyleConfig('ButtonContainer', { variant: variant });
  return (
    <Box __css={styles} onClick={() => onClick()}>
      <HStack p={2} cursor={isCursorLink ? 'pointer' : undefined} onContextMenu={onContextMenu}>
        <Avatar name={mapItem.name} src={mapItem.image} />
        <VStack flexGrow={1} spacing={1} alignItems='flex-start' overflow='hidden'>
          <HStack justify='space-between' w='100%'>
            <Text fontWeight='bold' fontSize={16} isTruncated flex={1}>
              {mapItem.name}
            </Text>
            {mapItem.info && (
              <Text fontSize='12' color='gray.500'>
                {mapItem.info.lastMessageTime}
              </Text>
            )}
          </HStack>
          {mapItem.info && (
            <HStack spacing={1}>
              <InfoRow item={mapItem.info} />
            </HStack>
          )}
        </VStack>
      </HStack>
    </Box>
  );
}
