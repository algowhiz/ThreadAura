import React from 'react'
import Link from 'next/link';

const Category = ({ category ,gender}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {category.items.map((item, itemIdx) => (
        <div key={itemIdx} className="flex items-center justify-center  ">
          <Link href={`/category?slug=${item.link}&category=${gender}`}>
            <div className="group transition-transform transform hover:scale-105 cursor-pointer text-center">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full  object-cover rounded-lg mb-4"
              />
            </div>
          </Link>
        </div>
      ))}
    </div>
  )
}

export default Category