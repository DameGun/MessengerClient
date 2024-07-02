import { HiOutlineTrash } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import { Skeleton } from '@chakra-ui/react';
import ContextMenu from '@components/ui/ContextMenu';
import ContextMenuItem from '@components/ui/ContextMenuItem';
import ButtonContainer from '@components/ui/StyledButton';
import { Chat } from '@customTypes/chat';
import { TimeOfLastMessage } from '@helpers/utils';
import { useAppDispatch, useAppSelector } from '@hooks/redux';
import { selectCurrentUserId } from '@services/redux/auth/authSlice';
import { setCurrentChat } from '@services/redux/chats/chatsSlice';
import { useGetChatMessagesQuery } from '@state/messages/messagesApiSlice';

interface ChatButtonProps {
  chatItem: Chat;
  variant: string;
}

export default function ChatButton({ chatItem, variant }: ChatButtonProps) {
  const userId = useAppSelector(selectCurrentUserId);
  const { data, isLoading, isSuccess } = useGetChatMessagesQuery({
    id: chatItem.id,
    page: 1,
    pageSize: 20,
  });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  function onClick() {
    dispatch(setCurrentChat(chatItem));
    navigate(`/c/${chatItem.id}`, { replace: true });
  }

  return (
    <Skeleton isLoaded={!isLoading}>
      <ContextMenu
        TriggerComponent={
          <ButtonContainer
            variant={variant}
            mapItem={{
              image: chatItem.image,
              name: chatItem.name,
              info:
                data && data.items.length > 0
                  ? {
                      lastMessageTime: TimeOfLastMessage(
                        data.items[0].publicationDate,
                        data.items[0].publicationTime
                      ),
                      lastMessage: {
                        isSuccess: isSuccess,
                        isCurrentUserSender: userId == data?.items[0].accountId,
                        text: data.items[0].text,
                      },
                    }
                  : undefined,
            }}
            onClick={onClick}
            isCursorLink={true}
          />
        }
      >
        <ContextMenuItem color='red.500' icon={<HiOutlineTrash size={20} />}>
          Delete chat
        </ContextMenuItem>
      </ContextMenu>
    </Skeleton>
  );
}
