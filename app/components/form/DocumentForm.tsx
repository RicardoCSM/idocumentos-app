'use client'

import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import categories from '@/data/categories.json';
import { useEffect, useState } from 'react';
import Heading from '../Heading';
import Input from '../inputs/Input';
import Button from '../Button';
import Select from '../inputs/Select';
import TextArea from '../inputs/Textarea';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useRouter } from "next/navigation";

interface Subcategory {
  id: number;
  nome: string;
}

const DocumentForm = () => {
  const router = useRouter(); 

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      document: null,
      category: '',
      subcategory: '',
      description: '',
    },
  });

  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  
  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const categoryId = parseInt(event.target.value, 10);
    const selectedCategory = categories.categorias.find(
      (categoria) => categoria.id === categoryId
    );

    if (selectedCategory) {
      setSubcategories(selectedCategory.subcategorias);
    } else {
      setSubcategories([]);
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const file = data.document[0];
  
    const formData = new FormData();
    formData.append('file', file);
  
    await axios.post('/api/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((response) => {
      const filePath = response.data.filePath;
      
      axios.post('/api/documents', {
        name: data.name,
        email: data.email,
        document: filePath,
        category: data.category,
        subcategory: data.subcategory,
        description: data.description
      })
        .then(() => {
          toast.success('Documento enviado com sucesso');
          router.refresh();
        })
        .catch((error) => {
          toast.error(error.response.data.error);
        });

    })
    .catch((error) => {
        toast.error(error.response.data.error);
    });
  };

  return (
    <div className="pb-2">
      <Heading center title="Enviar documento incorreto" />
      <form onSubmit={handleSubmit(onSubmit)} className="w-full mt-4" encType="multipart/form-data">
        <div className="flex flex-wrap -mx-3 mb-2">
          <div className="w-full px-3">
            <Input
              id="name"
              label="Nome"
              register={register}
              errors={errors}
              required
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-2">
          <div className="w-full px-3">
            <Input
              id="email"
              label="E-mail"
              register={register}
              errors={errors}
              required
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-2">
          <div className="w-full px-3">
            <Input
              id="document"
              label="Arquivo do documento incorreto:"
              type="file"
              accept='.pdf, .rtf'
              register={register}
              errors={errors}
              required
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-2">
          <div className="w-1/2 px-3 mb-3 md:mb-0">
            <Select
              id="category"
              label="Categoria"
              options={categories.categorias.map((categoria) => ({
                value: categoria.id,
                label: categoria.nome,
              }))}
              register={register}
              errors={errors}
              required
              onChange={handleCategoryChange}
            />
          </div>
          <div className="w-1/2 px-3">
            <Select
              id="subcategory"
              label="Subcategoria"
              options={subcategories.map((subcategoria) => ({
                value: subcategoria.id,
                label: subcategoria.nome,
              }))}
              register={register}
              errors={errors}
              required
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-2">
          <div className="w-full px-3">
            <TextArea
              id="description"
              label="Descrição"
              register={register}
              errors={errors}
              required
            />
          </div>
        </div>
        <Button label="Enviar" type="submit" />
      </form>
    </div>
  );
};

export default DocumentForm;