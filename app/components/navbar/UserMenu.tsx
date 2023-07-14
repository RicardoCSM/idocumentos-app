'use client';

import { AiOutlineMenu } from "react-icons/ai"
import Avatar from "../Avatar";
import React, { useCallback, useState } from "react";
import MenuItem from "./MenuItem";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import useInfoModal from "@/app/hooks/useInfoModal";
import { signOut } from "next-auth/react";
import IUser from "@/app/interfaces/IUser";

interface UserMenuProps {
    currentUser?: IUser | null
}

const UserMenu: React.FC<UserMenuProps> = ({
    currentUser
}) => {
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const infoModal = useInfoModal();
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = useCallback(() => {
        setIsOpen((value) => !value);
    }, [])
    return (
        <div className="relative">
            <div className="flex flex-row items-center gap-3">
                <div
                    onClick={infoModal.onOpen}
                    className="
                        hidden
                        md:block
                        text-white
                        text-sm
                        font-semibold
                        py-3
                        px-4
                        rounded-full
                        hover:bg-blue-800
                        transition
                        cursor-pointer
                    "
                >
                    Documentos incorretos?
                </div>
                <div
                    onClick={toggleOpen}
                    className="
                        p-4
                        md:py-1
                        md:px-2
                        border-[1px]
                        border-neutral-200
                        flex
                        flex-row
                        items-center
                        gap-3
                        rounded-full
                        cursor-pointer
                        hover:shadow-md
                        transition
                    "
                >
                    <AiOutlineMenu className="text-white" />
                    <div className="hidden md:block">
                        <Avatar />
                    </div>
                </div>
            </div>

            {isOpen && (
                <div className="
                    absolute
                    rounded-xl
                    shadow-md
                    w-[40vw]
                    md:w-3/4
                    bg-white
                    overflow-hidden
                    right-0
                    top-12
                    text-sm
                ">
                    <div className="flex flex-col cursor-pointer">
                        {currentUser ? (
                            <>
                                <MenuItem
                                    hidden
                                    onClick={infoModal.onOpen}
                                    label="Informações"
                                />
                                <MenuItem
                                    hidden
                                    onClick={() => { }}
                                    label="Cadastrar Documentos"
                                />
                                <MenuItem
                                    onClick={() => signOut()}
                                    label="Sair"
                                />
                            </>
                        ) : (
                            <>
                                <MenuItem
                                    onClick={loginModal.onOpen}
                                    label="Entrar"
                                />
                                <MenuItem
                                    onClick={registerModal.onOpen}
                                    label="Cadastrar"
                                />
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default UserMenu;