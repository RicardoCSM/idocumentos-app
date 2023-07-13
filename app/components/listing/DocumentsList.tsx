'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DocumentListForm from '../form/DocumentListForm';
import Pagination from '../Pagination';
import { toast } from 'react-hot-toast';

interface Document {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
  email: string;
  document: string;
  category: number;
  subcategory: number;
  description: string;
  admin: string;
}

const DocumentList = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const documentsPerPage = 6;
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    fetchDocuments();
  }, [currentPage]);

  const fetchDocuments = async () => {
    try {
      const response = await axios.get('http://localhost:3001/documents', {
        params: {
          status: 0,
          _page: currentPage + 1,
          _limit: documentsPerPage,
        },
      });
      setDocuments(response.data);
      setTotalItems(Number(response.headers['x-total-count'])); 
    } catch (error) {
      toast.error('Erro ao buscar pelos documentos');
    }
  };

  const handlePageChange = (selected: number) => {
    setCurrentPage(selected);
  };

  const totalPages = Math.ceil(totalItems / documentsPerPage);

  return (
    <div>
      {documents.map((document) => (
        <DocumentListForm
          id={document.id}
          key={document.id}
          created_at={document.created_at}
          updated_at={document.updated_at}
          name={document.name}
          email={document.email}
          category={document.category}
          subcategory={document.subcategory}
          description={document.description}
          document={document.document}
          admin={document.admin}
          onSubmitSuccess={fetchDocuments}
        />
      ))}

      <Pagination
        setCurrentPage={handlePageChange}
        currentPage={currentPage}
        totalPages={totalPages}
      />
    </div>
  );
};

export default DocumentList;