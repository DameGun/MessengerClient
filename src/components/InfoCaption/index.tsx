import { Box, HStack, Text, useStyleConfig } from '@chakra-ui/react';

interface EmptyListProps {
  caption: string;
}

export default function InfoCaption({ caption }: EmptyListProps) {
  const styles = useStyleConfig('InfoCaption');

  return (
    <Box flex={1} display='flex' flexDirection='row' justifyContent='center' alignItems='center'>
      <HStack __css={styles}>
        <Text>{caption}</Text>
      </HStack>
    </Box>
  );
}
