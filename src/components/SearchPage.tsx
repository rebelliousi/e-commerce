// src/SearchPage.tsx
import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { api } from '../api';
import { Product } from "../Types/Product";
import { useTranslation } from "react-i18next";

const SearchPage: React.FC = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q') || '';
    
    const { t } = useTranslation();

    const { data } = useQuery({
        queryKey: ['search', query],
        queryFn: async () => {
            if (!query) return [];
            const response = await api.get(`products/?search=${query}`);
            return response.data || [];
        },
        enabled: !!query,
    });

    if (!query) {
        return <div  className="min-h-screen flex justify-center items-center"> <p>Please enter a search query.</p>;</div>
    }


    if (!data || data.length === 0) {
        return<div className="min-h-screen flex justify-center items-center"> <p>{t("titles.no_results")}"{query}".</p>;</div>
    }



    return (
        <div className="container mx-auto px-4 py-8 min-h-screen">
            <h2 className="text-2xl font-bold mb-4">{t("titles.search_results")}"{query}"</h2>
             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {data.map((product: Product) => (
                    <div key={product.id} className="bg-white rounded shadow-md p-4 hover:shadow-lg transition-shadow duration-200">
                        <Link to={`/product/${product.id}`} className="block">
                             {product.image && (
                            <img src={product.image} alt={product.name} className="w-full h-40 object-cover mb-2 rounded" />
                             )}
                            <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
                            
                            <p className="text-gray-600 mb-2">{product.description && product.description.substring(0,100)+"..."}</p>
                             <p className="text-red-600 font-bold">${product.price}</p>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SearchPage;