
import React, { useState } from 'react';
import { Product } from '../types';

interface ProductManagerProps {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  onClose: () => void;
}

const ProductManager: React.FC<ProductManagerProps> = ({ products, setProducts, onClose }) => {
  const [newProductName, setNewProductName] = useState('');
  const [newProductPrice, setNewProductPrice] = useState('');

  const handleAddProduct = () => {
    const price = parseFloat(newProductPrice);
    if (newProductName && !isNaN(price) && price > 0) {
      const newProduct: Product = {
        id: `P${Date.now()}`,
        name: newProductName,
        price,
      };
      setProducts([...products, newProduct]);
      setNewProductName('');
      setNewProductPrice('');
    }
  };

  const handleDeleteProduct = (productId: string) => {
    setProducts(products.filter(p => p.id !== productId));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
      <div className="bg-brand-surface rounded-lg shadow-xl w-full max-w-md max-h-[90vh] flex flex-col">
        <div className="p-6 border-b">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-brand-primary">Manage Products</h2>
                <button onClick={onClose} className="text-gray-400 hover:text-gray-600">&times;</button>
            </div>
        </div>
        
        <div className="p-6 space-y-4 overflow-y-auto">
            {/* Add Product Form */}
            <div className="flex items-end gap-2 p-4 border rounded-lg">
              <div className="flex-grow">
                <label className="block text-sm font-medium text-gray-700">Product Name</label>
                <input
                  type="text"
                  value={newProductName}
                  onChange={(e) => setNewProductName(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-accent focus:border-brand-accent sm:text-sm"
                  placeholder="e.g., Cappuccino"
                />
              </div>
              <div className="w-28">
                <label className="block text-sm font-medium text-gray-700">Price</label>
                <input
                  type="number"
                  value={newProductPrice}
                  onChange={(e) => setNewProductPrice(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-accent focus:border-brand-accent sm:text-sm"
                  placeholder="4.50"
                />
              </div>
              <button
                onClick={handleAddProduct}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-primary hover:bg-brand-accent"
              >
                Add
              </button>
            </div>

            {/* Product List */}
            <div className="space-y-2">
                {products.length > 0 ? products.map(product => (
                    <div key={product.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                        <div>
                            <p className="font-semibold">{product.name}</p>
                            <p className="text-sm text-gray-600">${product.price.toFixed(2)}</p>
                        </div>
                        <button
                            onClick={() => handleDeleteProduct(product.id)}
                            className="text-red-500 hover:text-red-700 font-semibold"
                        >
                            Delete
                        </button>
                    </div>
                )) : (
                    <p className="text-center text-gray-500 py-4">No products added yet.</p>
                )}
            </div>
        </div>

         <div className="p-4 bg-gray-50 border-t text-right">
            <button
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100"
            >
                Close
            </button>
         </div>

      </div>
    </div>
  );
};

export default ProductManager;
