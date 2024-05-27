import {
  Box,
  HStack,
  Text,
  useStyleConfig,
} from "@chakra-ui/react";

interface EmptyListProps {
  caption: string;
}

export default function InfoCaption(props: EmptyListProps) {
  const styles = useStyleConfig("InfoCaption");

  return (
    <Box
      flex={1}
      display="flex"
      flexDirection="row"
      justifyContent="center"
      alignItems="center"
    >
      <HStack __css={styles}>
        <Text>{props.caption}</Text>
      </HStack>
    </Box>
  );
}
