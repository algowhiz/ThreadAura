import React from 'react';
import Link from 'next/link';
import Product from '@/models/Product';
import connectDb from '@/middleware/mongooseDb';

const TShirts = ({ products }) => {
  return (
    <>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap justify-center items-center gap-4 p-4 md:p-0 -m-4">
            {products.map((product) => (
              <Link href={`/product/${product._id}`} key={product._id}>
                <div className="w-[300px] h-auto p-4 shadow-2xl rounded-sm">
                  <div className="block relative rounded overflow-hidden w-full h-[60%]">
                    <img
                      alt="ecommerce"
                      className="m-auto h-[30vh] md:h-[36vh] block"
                      src={product.img}
                    />
                  </div>
                  <div className="mt-4">
                    <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                      {product.category}
                    </h3>
                    <h2 className="text-gray-900 title-font text-lg font-medium">
                      {product.title}
                    </h2>
                    <p className="mt-1">${product.price}</p>
                    <p className="mt-1">Available Sizes: {product.size.join(', ')}</p>
                    <div className="mt-2">
                      <h4 className="text-gray-700 text-sm font-medium">Available Colors:</h4>
                      <div className='flex gap-2'>
                        {product.color
                          .filter(color => color.color !== '#FFFFFF')  // Filter out white colors
                          .map((color, index) => (
                            <div key={index} className="flex items-center mt-1">
                              <span
                                className="w-4 h-4 rounded-full"
                                style={{ backgroundColor: color.color }}>
                              </span>
                              {/* <span className="ml-2 text-sm">{color.color} ({color.availableQty} available)</span> */}
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export async function getServerSideProps(context) {
  await connectDb();
  const products = await Product.find({ category:  `${"tshirts" || "T-Shirts"}` }).lean(); // Use .lean() to return plain JavaScript objects

  return {
    props: {
      products: JSON.parse(JSON.stringify(products)), // Convert to JSON serializable format
    },
  };
}

export default TShirts;
