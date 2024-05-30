import { MenuItem } from "@chakra-ui/react";
import { ChatMessage } from "@customTypes/chatMessage";
import { useAppDispatch } from "@hooks/redux";
import { useDeleteChatMessageMutation } from "@services/redux/messages/messagesApiSlice";
import { setMessageEditMode } from "@services/redux/messages/messagesSlice";
import { Fragment } from "react";
import { FiEdit } from "react-icons/fi";
import { HiOutlineTrash } from "react-icons/hi";

interface MessageContextMenuActionsProps {
  messageItem: ChatMessage;
}

export default function MessageContextMenuActions(
  props: MessageContextMenuActionsProps
) {
  const [deleteMessage] = useDeleteChatMessageMutation();
  const dispatch = useAppDispatch();

  return (
    <Fragment>
      <MenuItem
        icon={<FiEdit size={20} />}
        onClick={() => dispatch(setMessageEditMode(props.messageItem))}
      >
        Edit
      </MenuItem>
      <MenuItem
        color="red.600"
        icon={<HiOutlineTrash size={20} />}
        onClick={() => deleteMessage(props.messageItem.id)}
      >
        Delete
      </MenuItem>
    </Fragment>
  );
}
