import React from 'react'

const productsData = [
    {
        category: 'T-shirts',
        items: [
            { name: 'Classic T-shirt', price: '$20', qty: 100, image: 'https://via.placeholder.com/150' },
            { name: 'Graphic T-shirt', price: '$25', qty: 50, image: 'https://via.placeholder.com/150' },
            { name: 'Graphic T-shirt', price: '$25', qty: 50, image: 'https://via.placeholder.com/150' },
            { name: 'Graphic T-shirt', price: '$25', qty: 50, image: 'https://via.placeholder.com/150' },
            { name: 'Graphic T-shirt', price: '$25', qty: 50, image: 'https://via.placeholder.com/150' },
            { name: 'Graphic T-shirt', price: '$25', qty: 50, image: 'https://via.placeholder.com/150' },
        ],
    },
    {
        category: 'Mugs',
        items: [
            { name: 'Ceramic Mug', price: '$10', qty: 200, image: 'https://via.placeholder.com/150' },
            { name: 'Travel Mug', price: '$15', qty: 80, image: 'https://via.placeholder.com/150' },
        ],
    },
    {
        category: 'Hoodies',
        items: [
            { name: 'Zip Hoodie', price: '$45', qty: 30, image: 'https://via.placeholder.com/150' },
            { name: 'Pullover Hoodie', price: '$40', qty: 20, image: 'https://via.placeholder.com/150' },
        ],
    },
    {
        category: 'Stickers',
        items: [
            { name: 'Logo Sticker', price: '$3', qty: 500, image: 'https://via.placeholder.com/150' },
            { name: 'Funny Sticker', price: '$4', qty: 300, image: 'https://via.placeholder.com/150' },
        ],
    },
];

const Products = () => {
    return (
        <div className="p-4 mt-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-700">Products</h2>

            {productsData.map((productCategory) => (
                <div key={productCategory?.category} className="mb-8">
                    <h3 className="text-xl font-semibold mb-4">{productCategory?.category}</h3>
                    <div className="overflow-x-auto">
                        <div className="flex space-x-4">
                            {productCategory?.items.map((product) => (
                                <div key={product.name} className="bg-white shadow-md rounded-lg overflow-hidden flex-shrink-0 w-[80%] sm:w-[60%] md:w-[45%] lg:w-[30%] xl:w-[22%]">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-40 object-cover"
                                    />
                                    <div className="p-4">
                                        <h4 className="font-bold text-lg mb-2">{product.name}</h4>
                                        <p className="text-gray-600 mb-2">{product.price}</p>
                                        <p className="text-sm text-gray-500">Qty: {product.qty}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Products