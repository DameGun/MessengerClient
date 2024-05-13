import { Menu, MenuButton, MenuButtonProps, MenuList, forwardRef } from "@chakra-ui/react";
import { MouseEvent, useState } from "react";

interface ContextMenuProps {
    TriggerComponent: React.ReactNode,
    onLayoutClick: React.MouseEventHandler,
    children: React.ReactNode
}

export default function ContextMenu(props: ContextMenuProps) {
    const [openMenu, setOpenMenu] = useState(false);

    const Trigger = forwardRef<MenuButtonProps, 'div'>((props, ref) => (
        <MenuButton
            onContextMenu={(event: MouseEvent) => {
                event.preventDefault();
                setOpenMenu(!openMenu);
            }}
            ref={ref}
            {...props}
        />
    ))

    return (
        <Menu isOpen={openMenu} onClose={() => setOpenMenu(!openMenu)}>
            <Trigger w='100%' onClick={props.onLayoutClick}>
                {props.TriggerComponent}
            </Trigger>
            <MenuList>
                {props.children}
            </MenuList>
        </Menu>
    )
}