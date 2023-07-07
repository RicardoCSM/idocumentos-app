'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";

const Logo = () => {
    const router = useRouter();

    return(
        <div 
            className="
                flex
                text-white
                items-center
                justify-center
                cursor-pointer
            ">
            <h1 className="text-2xl font-bold border-r-[2px] px-2 border-indigo-50">iDocumentos</h1>
            <h2 className="text-sm p-2">Notifique sobre um documento incorreto!!!</h2>				
        </div>
    )
}

export default Logo;