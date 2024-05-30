import {
  Container,
  HStack,
  Icon,
  IconButton,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import { ChatMessageCreate, ChatMessageUpdate } from "@customTypes/chatMessage";
import { scrollToEndInChat } from "@helpers/domHelpers";
import { useAppDispatch, useAppSelector } from "@hooks/redux";
import { selectCurrentUserId } from "@services/redux/auth/authSlice";
import { useCreateChatMessageMutation, useUpdateChatMessageMutation } from "@services/redux/messages/messagesApiSlice";
import {
  resetMessageEditMode,
  selectCurrentEditableMessage,
  selectCurrentInputBarMode,
} from "@services/redux/messages/messagesSlice";
import { useFormik } from "formik";
import { HiCheck } from "react-icons/hi";
import { IoSend } from "react-icons/io5";
import { MdEdit } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";

export default function MessageInputBar() {
  const userId = useAppSelector(selectCurrentUserId)!;
  const inputBarMode = useAppSelector(selectCurrentInputBarMode);
  const editableMessage = useAppSelector(selectCurrentEditableMessage)!;
  const dispatch = useAppDispatch();
  const [createMessage] = useCreateChatMessageMutation();
  const [updateMessage] = useUpdateChatMessageMutation();

  const formik = useFormik({
    initialValues: {
      message: "",
    },
    onSubmit: async ({ message }) => {
      if (message.trim().length > 0) {
        try {
          if (inputBarMode == 'EDIT') {
            const request: Partial<ChatMessageUpdate> = {
              id: editableMessage.id,
              text: message.trim()
            };
            await updateMessage(request).unwrap();
          }
          else {
            const request: ChatMessageCreate = {
              text: message.trim(),
              accountId: userId,
            };

            await createMessage(request).unwrap();
            scrollToEndInChat("scrollableChat", true);
          }          
        } catch (err) {
          console.error(err);
        } finally {
          cancelAction();
        }
      }
    },
  });

  function cancelAction() {
    if (inputBarMode == 'EDIT') dispatch(resetMessageEditMode());
    formik.resetForm();
  }

  return (
    <Container
      maxW="container.sm"
      display="flex"
      flex={1}
      flexDirection="column"
      my={-2}
    >
      <form
        onSubmit={formik.handleSubmit}
        onKeyDown={(e) => {
          if (e.key == "Enter") {
            formik.handleSubmit(e);
          }
        }}
      >
        <HStack>
          <VStack spacing={0} w="100%">
            {inputBarMode == "EDIT" && editableMessage && (
              <HStack
                bgColor="white"
                _dark={{
                  bgColor: "#121212",
                }}
                w="100%"
                position="relative"
                top={5}
                borderTopRadius="10"
                px={4}
                py={3}
              >
                <Icon as={MdEdit} boxSize={6} />
                <VStack
                  flex={1}
                  alignItems="start"
                  borderLeftWidth={4}
                  borderRadius={4}
                  borderLeftColor="blue.500"
                  px={2}
                  py={1}
                  spacing={0}
                  bgColor="RGBA(49, 130, 206, 0.3)"
                >
                  <Text fontSize="sm" as="b">
                    Edit Message
                  </Text>
                  <Text fontSize="sm">{editableMessage.text}</Text>
                </VStack>
                <IconButton
                  aria-label="cancel-message-editing"
                  icon={<RxCross2 size={26} />}
                  bgColor="transparent"
                  _hover={{
                    bgColor: "transparent",
                    color: "blue.500",
                  }}
                  onClick={cancelAction}
                />
              </HStack>
            )}
            <Input
              variant="simple"
              id="message"
              name="message"
              type="text"
              placeholder="Message"
              value={formik.values.message}
              onChange={formik.handleChange}
              autoComplete="off"
              borderTopRadius={
                inputBarMode == "EDIT" && editableMessage ? 0 : undefined
              }
            />
          </VStack>
          <IconButton
            type="submit"
            aria-label="send_message"
            size="lg"
            isRound
            alignSelf="flex-end"
            mb={6}
            icon={
              inputBarMode == "COMMON" ? (
                <IoSend size={20} />
              ) : (
                <HiCheck size={25} />
              )
            }
          />
        </HStack>
      </form>
    </Container>
  );
}
