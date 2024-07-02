import { Text } from '@chakra-ui/react';
import { ButtonContainerMappingItem } from '../StyledButton';

interface InfoRowProps {
  item: ButtonContainerMappingItem['info'];
}

export default function InfoRow({ item }: InfoRowProps) {
  return (
    <>
      {item!.lastMessage.isCurrentUserSender && (
        <Text fontSize={14} color='blue.600' isTruncated>
          You:
        </Text>
      )}
      <Text fontSize={14} color='gray' isTruncated>
        {item!.lastMessage.text}
      </Text>
    </>
  );
}
