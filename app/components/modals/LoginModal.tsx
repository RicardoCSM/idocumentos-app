'use client';

import { signIn } from 'next-auth/react';
import { useState } from "react";
import {
    FieldValues,
    SubmitHandler,
    useForm
} from 'react-hook-form';

import useLoginModal from "@/app/hooks/useLoginModal";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import { useRouter } from "next/navigation";
import { toast } from 'react-hot-toast';

const LoginModal = () => {
    const loginModal = useLoginModal();
    const router = useRouter(); 
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: {
            errors, 
        }
    } = useForm<FieldValues>({
        defaultValues: {
            username: '',
            password: ''
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {

        setIsLoading(true);
        signIn('credentials', {
            ...data,
            redirect: false
        })
        .then((callback) => {
            setIsLoading(false);

            if(callback?.ok) {
                toast.success('Login realizado com sucesso!');
                router.refresh();
                loginModal.onClose();
            }

            if(callback?.error) {
                toast.error('Usuário ou senha incorreto!');
            }
        })
    }

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading 
                title="Seja bem-vindo de volta"
                subtitle="Entre na sua conta!"
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
            isOpen={loginModal.isOpen}
            title="Entrar"
            actionLabel="Entre"
            onClose={loginModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
        />
    )
}

export default LoginModal;