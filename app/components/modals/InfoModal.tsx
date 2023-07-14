'use client';

import useInfoModal from "@/app/hooks/useInfoModal";
import Modal from "./Modal";
import Heading from "../Heading";

const InfoModal = () => {
    const infoModal = useInfoModal();

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading
                center
                title="iDocumentos"
                subtitle="Notifique sobre um documento incorreto!"
            />
            <div
                className="
                    text-center
                    font-light
                    text-neutral-500 
                    mt-2
                "
            >
                Nossa universidade valoriza a precisão e segurança dos documentos acadêmicos. Cuidamos para evitar erros e imprecisões, garantindo a elaboração cuidadosa dos documentos. Verificações minuciosas são realizadas antes da emissão para assegurar sua precisão. Caso haja suspeita de erros, incentivamos os alunos a entrar em contato imediatamente para correção. Privacidade e segurança dos dados são prioridades, seguindo regulamentações como a LGPD. Estamos comprometidos em fornecer um ambiente acadêmico confiável e de qualidade para todos os alunos.
            </div>
        </div>
    )

    return (
        <Modal
            isOpen={infoModal.isOpen}
            title="Documentos incorretos?"
            actionLabel="Sair"
            onClose={infoModal.onClose}
            onSubmit={infoModal.onClose}
            body={bodyContent}
        />
    )
}

export default InfoModal;