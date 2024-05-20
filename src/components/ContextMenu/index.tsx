import { Menu, MenuButton, MenuButtonProps, MenuList, forwardRef } from "@chakra-ui/react";
import { MouseEvent, useState } from "react";

interface ContextMenuProps {
    TriggerComponent: React.ReactNode,
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
        <Menu isOpen={openMenu} onClose={() => setOpenMenu(!openMenu)} autoSelect={false}>
            <Trigger w='100%'>
                {props.TriggerComponent}
            </Trigger>
            <MenuList>
                {props.children}
            </MenuList>
        </Menu>
    )
}