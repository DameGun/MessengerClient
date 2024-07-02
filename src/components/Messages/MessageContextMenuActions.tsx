import { FiEdit } from 'react-icons/fi';
import { HiOutlineTrash } from 'react-icons/hi';
import ContextMenuItem from '@components/ui/ContextMenuItem';
import { ChatMessage } from '@customTypes/chatMessage';
import { useAppDispatch } from '@hooks/redux';
import { useDeleteChatMessageMutation } from '@services/redux/messages/messagesApiSlice';
import { setMessageEditMode } from '@services/redux/messages/messagesSlice';

interface MessageContextMenuActionsProps {
  messageItem: ChatMessage;
}

export default function MessageContextMenuActions({ messageItem }: MessageContextMenuActionsProps) {
  const [deleteMessage] = useDeleteChatMessageMutation();
  const dispatch = useAppDispatch();

  function onEdit() {
    dispatch(setMessageEditMode(messageItem));
  }

  function onDelete() {
    deleteMessage(messageItem.id);
  }

  return (
    <>
      <ContextMenuItem icon={<FiEdit size={20} />} onClick={onEdit}>
        Edit
      </ContextMenuItem>
      <ContextMenuItem color='red.500' icon={<HiOutlineTrash size={20} />} onClick={onDelete}>
        Delete
      </ContextMenuItem>
    </>
  );
}
