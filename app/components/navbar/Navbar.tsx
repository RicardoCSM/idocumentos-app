'use client'

import Container from "../Container";
import Logo from "./Logo";
import UserMenu from "./UserMenu";

const Navbar = () => {
    return (
        <div className="fixed w-full border-t-[3px] border-blue-800 bg-blue-600 z-10 shadow-sm">
            <div className="py-4 border-b-[1px]">
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
                        <UserMenu />
                    </div>
                </Container>
            </div>
        </div>
    )
}

export default Navbar;