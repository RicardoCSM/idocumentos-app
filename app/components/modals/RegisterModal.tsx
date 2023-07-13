'use client';

import { useState } from "react";
import {
    FieldValues,
    SubmitHandler,
    useForm
} from 'react-hook-form';

import useRegisterModal from "@/app/hooks/useRegisterModal";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import axios from "axios";
import { toast } from "react-hot-toast";

const RegisterModal = () => {
    const registerModal = useRegisterModal();
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: {
            errors, 
        }
    } = useForm<FieldValues>({
        defaultValues: {
            email: '',
            admin_id: null,
            username: '',
            password: ''
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        axios.post('/api/register', data)
            .then(() => {
                registerModal.onClose();
                toast.success('Usuário cadastrado com sucesso');
            })
            .catch((error) => {
                toast.error(error.response.data.error);
            })
            .finally(() => {
                setIsLoading(false);
            })
    }


    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading 
                title="Seja bem-vindo ao iDocumentos"
                subtitle="Caso seja um administrador registre-se!"
            />
            <Input 
                id="email"
                type="email"
                label="E-mail"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Input 
                id="admin_id"
                label="ID de administrador"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Input 
                id="username"
                label="Usuário"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Input 
                id="password"
                type="password"
                label="Senha"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
        </div>
    )

    return(
        <Modal
            disabled={isLoading}
            isOpen={registerModal.isOpen}
            title="Cadastre-se"
            actionLabel="Cadastrar"
            onClose={registerModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
        />
    )
}

export default RegisterModal;