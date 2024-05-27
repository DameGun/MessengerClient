import { Container, HStack, IconButton, Input } from "@chakra-ui/react";
import { ChatMessageCreate } from "@customTypes/chatMessage";
import { scrollToEndInChat } from "@helpers/domHelpers";
import { useAppSelector } from "@hooks/redux";
import { selectCurrentUserId } from "@services/redux/auth/authSlice";
import { useCreateChatMessageMutation } from "@services/redux/messages/messagesApiSlice";
import { useFormik } from "formik";
import { IoSend } from "react-icons/io5";

export default function MessageInputBar() {
  const userId = useAppSelector(selectCurrentUserId)!;
  const [createMessage] = useCreateChatMessageMutation();

  const formik = useFormik({
    initialValues: {
      message: "",
    },
    onSubmit: async ({ message }, { resetForm }) => {
      const request: ChatMessageCreate = {
        text: message.trim(),
        accountId: userId,
      };
      if (message.trim().length > 0) {
        try {
          await createMessage(request).unwrap();
          scrollToEndInChat();
        } catch (err) {
          console.error(err);
        } finally {
          resetForm();
        }
      }
    },
  });

  return (
    <Container
      maxW="container.sm"
      h="100vh"
      display="flex"
      flex={1}
      flexDirection="column"
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
          <Input
            variant="simple"
            id="message"
            name="message"
            type="text"
            placeholder="Message"
            value={formik.values.message}
            onChange={formik.handleChange}
            my={2}
          />
          <IconButton
            type="submit"
            aria-label="send_message"
            size="lg"
            pl={1}
            isRound
            icon={<IoSend size={20} />}
          />
        </HStack>
      </form>
    </Container>
  );
}
