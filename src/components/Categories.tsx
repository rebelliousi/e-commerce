import React, { useState } from 'react';
import { useProduct } from '../Hooks/useProducts';
import { Link } from 'react-router-dom';
import { useTranslation } from "react-i18next";

const Categories: React.FC = () => {
    const { t } = useTranslation();
    const { data: products } = useProduct();
    const [openCategories, setOpenCategories] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('');

    const uniqueCategories = [...new Set(products?.map(product => product.type))];

    const handleCategoryClick = (category: string) => setSelectedCategory(category);

    const filteredProducts = products?.filter(product =>
        selectedCategory === '' || product.type === selectedCategory
    );

    const toggleCategories = () => setOpenCategories(!openCategories);

    return (
        <div className="flex min-h-screen " id="Category">
            {/* Category Bar */}
            <div className="w-1/4 bg-gray-100 p-4 rounded mr-4 relative">
                <div className="mb-4">
                    <div className="flex justify-between items-center cursor-pointer py-2" onClick={toggleCategories}>
                        <h2 className="text-lg font-semibold flex items-center">
                            <span className="mr-2">☰</span> {/* Filter İkonu yerine */}
                            {t("titles.categories")}
                        </h2>
                        <span>{openCategories ? '▲' : '▼'}</span> {/* Ok ikonları yerine */}
                    </div>
                    {openCategories && (
                        <ul className="mt-2 space-y-1 overflow-y-auto max-h-48 transition-all duration-300">
                            {uniqueCategories.map(category => (
                                <li key={category}>
                                    <button
                                        className={`text-blue-500 hover:bg-gray-200 py-2 px-4 block w-full text-left rounded transition-colors duration-200 ${selectedCategory === category ? 'font-bold bg-gray-200' : ''}`}
                                        onClick={() => handleCategoryClick(category)}
                                    >
                                        {category}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}

                </div>
            </div>
            {/* Product List */}
            <div className="w-3/4 p-4">
                {filteredProducts?.length === 0 ? (
                    <p>No products found.</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {filteredProducts?.map(product => (
                            <div key={product.id} className="border rounded p-4 shadow-md">
                                <Link to={`/product/${product.id}`} className="block">
                                    <img src={product.image} alt={product.image} className="w-full h-48 object-cover mb-2 rounded" />
                                    <h3 className="font-semibold truncate">{product.type}</h3>
                                    <p className="text-gray-700">Price: {product.price} $</p>
                                    <p className="text-gray-600 text-sm truncate">{product.description}</p>
                                </Link>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Categories;