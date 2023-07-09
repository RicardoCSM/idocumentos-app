'use client';

import { HiOutlineDocumentRemove} from "react-icons/hi"
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
            <HiOutlineDocumentRemove size={32}/>
            <h1 className="text-2xl font-bold px-2">iDocumentos</h1>
        </div>
    )
}

export default Logo;