import { Fragment } from 'react';
import { ButtonContainerMappingItem } from '.';
import { Text } from '@chakra-ui/react';

interface InfoRowProps {
  item: ButtonContainerMappingItem['info'];
}

export default function InfoRow({ item }: InfoRowProps) {
  return (
    <Fragment>
      {item!.lastMessage.isCurrentUserSender && (
        <Text fontSize={14} color='blue.600' isTruncated>
          You:
        </Text>
      )}
      <Text fontSize={14} color='gray' isTruncated>
        {item!.lastMessage.text}
      </Text>
    </Fragment>
  );
}
