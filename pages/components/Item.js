import Link from 'next/link';
import React from 'react';

const Item = ({ sortedProducts, slug }) => {
  return (
    <div className="container px-5 py-6 mx-auto">
      <h1 className="text-2xl flex justify-center font-semibold mb-10">{slug}</h1>
      <div className="flex flex-wrap justify-center items-center gap-4 p-4 md:p-0 -m-4">
        {sortedProducts?.length > 0 ? (
          sortedProducts.map((product) => (
            <Link href={`/product/${product?._id}?category=kids`} key={product?._id}>
              <div className="w-[300px] h-auto p-4 shadow-2xl rounded-sm">
                <div className="block relative rounded overflow-hidden w-full h-[60%]">
                  <img
                    alt="ecommerce"
                    className="m-auto h-[30vh] md:h-[50vh] block"
                    src={product?.img}
                  />
                </div>
                <div className="mt-4">
                  <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                    {product?.category}
                  </h3>
                  <h2 className="text-gray-900 title-font text-lg font-medium truncate">
                    {product?.title}
                  </h2>
                  <p className="mt-1">₹{product?.price}</p>
                  <p className="mt-1">Available Sizes: {product?.size.join(', ')}</p>
                  <div className="mt-2">
                    <h4 className="text-gray-700 text-sm font-medium">Available Colors:</h4>
                    <div className="flex gap-2">
                      {product?.color
                        .filter((color) => color?.color !== '#FFFFFF') // Filter out white colors
                        .map((color, index) => (
                          <div key={index} className="flex items-center mt-1">
                            <span
                              className="w-4 h-4 rounded-full"
                              style={{ backgroundColor: color?.color }}
                            ></span>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p>No products available</p> // Fallback if no products
        )}
      </div>
    </div>
  );
};

export default Item;
