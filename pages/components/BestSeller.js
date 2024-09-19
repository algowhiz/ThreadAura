import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BestSeller = () => {
    const [bestSellers, setBestSellers] = useState([]);

    useEffect(() => {
        const fetchBestSellers = async () => {
            try {
                const response = await axios.get('/api/best-seller');
                console.log(response);
                setBestSellers(response.data);
            } catch (error) {
                console.error('Error fetching best sellers:', error);
            }
        };
        fetchBestSellers();
    }, []);

    return (
        <div className="p-4 mt-8">
            <h2 className="text-xl font-bold mb-4">Best Sellers</h2>
            <div className="flex space-x-4 overflow-x-auto">
                {bestSellers.length > 0 ? (
                    bestSellers.map((product) => (
                        <div key={product._id} className="bg-white shadow-md rounded-lg p-4 w-64">
                            <img src={product.img} alt={product.title} className="w-full h-40 object-cover mb-2" />
                            <h4 className="font-bold text-lg">{product.title}</h4>
                            <p className="text-gray-600">Sold: {product.soldQty}</p>
                        </div>
                    ))
                ) : (
                    <div className="text-center text-gray-500 font-semibold">
                        No best-selling products available right now. Check back later!
                    </div>
                )}
            </div>
        </div>
    );
};

export default BestSeller;
