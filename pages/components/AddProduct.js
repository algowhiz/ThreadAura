import React, { useState } from 'react';
import axios from 'axios';

const AddProduct = () => {
    const [product, setProduct] = useState({
        title: '',
        slug: '',
        desc: '',
        img: '',
        category: 't-shirts',
        size: [],
        color: [],
        price: '',
        availableQty: ''
    });

    const [error, setError] = useState('');

    const handleChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };

    const handleSizeChange = (e) => {
        const value = e.target.value;
        if (product?.size.includes(value)) {
            setProduct({ ...product, size: product?.size.filter((size) => size !== value) });
        } else {
            setProduct({ ...product, size: [...product?.size, value] });
        }
    };

    const handleColorChange = (index, field, value) => {
        const newColors = [...product?.color];
        newColors[index] = { ...newColors[index], [field]: value };
        setProduct({ ...product, color: newColors });
    };

    const addColorField = () => {
        setProduct({ ...product, color: [...product?.color, { color: '', availableQty: '' }] });
    };

    const validateForm = () => {
        if (!product?.title || !product?.slug || !product?.desc || !product?.price || !product?.availableQty) {
            setError('Please fill out all required fields.');
            return false;
        }
        setError('');
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            const response = await axios.post('/api/addproduct', product);
            console.log(response.data);
            alert('Product added successfully!');
            setProduct({
                title: '',
                slug: '',
                desc: '',
                img: '',
                category: 'T-Shirts',
                size: [],
                color: [],
                price: '',
                availableQty: ''
            });
        } catch (error) {
            console.error('Error adding product:', error);
            setError('Failed to add product?. Please try again.');
        }
    };

    return (
        <div className="p-4 mt-8">
            <h2 className="text-xl font-bold mb-4">Add New Product</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    name="title"
                    type="text"
                    placeholder="Product Title"
                    value={product?.title}
                    onChange={handleChange}
                    className="w-full p-2 border"
                />

                <input
                    name="slug"
                    type="text"
                    placeholder="Product Slug"
                    value={product?.slug}
                    onChange={handleChange}
                    className="w-full p-2 border"
                />

                <input
                    name="desc"
                    type="text"
                    placeholder="Description"
                    value={product?.desc}
                    onChange={handleChange}
                    className="w-full p-2 border"
                />

                <input
                    name="img"
                    type="text"
                    placeholder="Image URL"
                    value={product?.img}
                    onChange={handleChange}
                    className="w-full p-2 border"
                />

                <div className="relative w-full overflow-hidden">
                    <label className="block text-sm font-medium mb-2">Category</label>
                    <select
                        name="category"
                        value={product?.category}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                    >
                        <option value="T-Shirts">T-Shirts</option>
                        <option value="Hoodies">Hoodies</option>
                        <option value="Mugs">Mugs</option>
                        <option value="Stickers">Stickers</option>
                    </select>
                </div>

                <label>Size</label>
                <div className="flex space-x-4">
                    {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                        <label key={size}>
                            <input
                                type="checkbox"
                                value={size}
                                onChange={handleSizeChange}
                                checked={product?.size.includes(size)}
                            /> {size}
                        </label>
                    ))}
                </div>

                <label>Color</label>
                {product?.color.map((color, index) => (
                    <div key={index} className="flex space-x-4 mb-2">
                        <input
                            type="text"
                            placeholder="Enter color name or #code"
                            value={color.color}
                            onChange={(e) => handleColorChange(index, 'color', e.target.value)}
                            className="w-full p-2 border"
                        />
                        <input
                            type="number"
                            placeholder="Available Quantity"
                            value={color.availableQty}
                            onChange={(e) => handleColorChange(index, 'availableQty', e.target.value)}
                            className="w-full p-2 border"
                        />
                    </div>
                ))}
                <button
                    type="button"
                    onClick={addColorField}
                    className="bg-gray-500 ml-3 text-white p-2 rounded"
                >
                    Add Color
                </button>

                <input
                    name="price"
                    type="number"
                    placeholder="Price"
                    value={product?.price}
                    onChange={handleChange}
                    className="w-full p-2 border"
                />

                <input
                    name="availableQty"
                    type="number"
                    placeholder="Available Quantity"
                    value={product?.availableQty}
                    onChange={handleChange}
                    className="w-full p-2 border"
                />

                <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                    Add Product
                </button>
            </form>
        </div>
    );
};

export default AddProduct;
