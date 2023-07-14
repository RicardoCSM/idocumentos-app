'use client';

import React from "react";
import Button from "../Button";
import categories from '@/data/categories.json';
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { saveAs } from 'file-saver';

interface DocumentProps {
    id: number;
    key: number;
    created_at: string;
    updated_at: string;
    name: string;
    email: string;
    document: string;
    admin: string;
    category: number;
    subcategory: number;
    description: string;
    onSubmitSuccess: () => void;
}

const getCategoryName = (categoryId: number) => {
    const category = categories.categorias.find(
        (categoria) => categoria.id === categoryId
    );
    return category ? category.nome : '';
};

const getSubcategoryName = (categoryId: number, subcategoryId: number) => {
    const category = categories.categorias.find(
        (categoria) => categoria.id === categoryId
    );
    if (category) {
        const subcategory = category.subcategorias.find(
            (subcat) => subcat.id === subcategoryId
        );
        return subcategory ? subcategory.nome : '';
    }
    return '';
};

const DocumentListForm: React.FC<DocumentProps> = ({
    id,
    created_at,
    updated_at,
    name,
    email,
    document,
    admin,
    category,
    subcategory,
    description,
    onSubmitSuccess
}) => {
    const router = useRouter();
    const categoryName = getCategoryName(category);
    const subcategoryName = getSubcategoryName(category, subcategory);

    const openFile = async (fileName: string) => {
        try {
            const response = await axios.get(`/api/file/${fileName}`, {
                responseType: 'blob',
            });
            saveAs(response.data, fileName);
        } catch (error) {
            console.error('Error getting file:', error);
        }
    };

    const onSubmit = () => {
        axios.patch(`http://localhost:3001/documents/${id}`, {
            status: 1,
            updated_at: new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })
        })
            .then(() => {
                toast.success('Documento salvo com sucesso');
                onSubmitSuccess();
            })
            .catch((error) => {
                toast.error(error.response.data.error);
            })
    }

    return (
        <div className="p-5 mt-4 border-2 rounded-md">
            <div className="mt-2">
                <div className="flex flex-col sm:flex-row border-b border-gray-200 pb-4 mb-4">
                    <div className="sm:w-64 w-full text-lg font-bold mx-2 mt-3 sm:pb-0 pb-2 border-b sm:border-none border-gray-200 text-gray-800">Criado em:
                        <div className="text-sm font-normal leading-none text-gray-500">{created_at}</div>
                    </div>
                    <div className="flex-1 pt-2 flex flex-col md:flex-row">
                        <div className="w-full flex-1 mx-2">
                            <label className="p-1 text-md text-zinc-400">Nome</label>
                            <div className="my-2 p-1 bg-white flex border border-gray-200 rounded">
                                <input disabled value={name} className="p-1 px-2 appearance-none outline-none w-full text-gray-800" />
                            </div>
                        </div>
                        <div className="w-full flex-1 mx-2">
                            <label className="text-md p-1 text-zinc-400">Email</label>
                            <div className="my-2 p-1 bg-white flex border border-gray-200 rounded">
                                <input disabled value={email} className="p-1 px-2 appearance-none outline-none w-full text-gray-800" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row pb-4 mb-4">
                    <div className="sm:w-64 w-full text-lg font-bold mx-2 mt-3 sm:pb-0 pb-2 border-b sm:border-none border-gray-200 text-gray-800">Atualizado em:
                        <div className="text-sm font-normal leading-none text-gray-500">{updated_at}</div>
                    </div>
                    <div className="flex-1 p-1 pt-2">
                        <div className="flex items-center flex-col md:flex-row">
                            <select disabled className="mx-2 p-1 flex-1 mt-2 form-select w-full">
                                <option>{categoryName}</option>
                            </select>
                            <select disabled className="mx-2 p-1 flex-1 mt-2 form-select w-full">
                                <option>{subcategoryName}</option>
                            </select>
                            <div className="w-full p-1 flex-1 mx-2">
                                <label className="p-2 sm:p-1 text-md text-zinc-400">Documento:</label>
                                <div className="my-2 p-1 flex rounded">
                                    <Button small label="Download" onClick={() => openFile(document)} />
                                </div>
                            </div>
                        </div>
                        <div className="m-2">
                            <div className="w-full flex-1">
                                <label className="p-1 text-md text-zinc-400">Descrição: </label>
                                <div className="my-2 p-1 bg-white flex border border-gray-200 rounded">
                                    <textarea disabled value={description} className="px-2 appearance-none outline-none w-full text-gray-800 " />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row">
                    <div className="w-64 p-1 text-lg font-bold mx-2 text-gray-800">Administrador responsável:
                        <div className="text-sm font-normal leading-none text-gray-500">{admin}</div>
                    </div>
                    <div className="flex-1 p-1 flex flex-col md:flex-row">
                        <Button label="Salvar" onClick={onSubmit} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DocumentListForm;