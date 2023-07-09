'use client'

import React from "react";
import Container from "../Container";
import Logo from "./Logo";
import UserMenu from "./UserMenu";
import IUser from "@/app/interfaces/IUser";
import AdminMenu from "./AdminMenu";

interface NavbarProps {
    currentUser?: IUser | null
}

const Navbar: React.FC<NavbarProps> = ({
    currentUser
}) => {
    return (
        <div className="fixed w-full border-t-[3px] border-blue-800 bg-blue-600 z-10 shadow-sm">
            <div className="py-3 border-b-[1px]">
                <Container>
                    <div
                        className="
                            flex
                            flex-row
                            items-center
                            justify-between
                            gap-3
                            md:gap-0
                        "
                    >
                        <Logo />
                        {currentUser ? (
                            <AdminMenu />
                        ) : ''}
                        <UserMenu currentUser={currentUser}/>
                    </div>
                </Container>
            </div>
        </div>
    )
}

export default Navbar;