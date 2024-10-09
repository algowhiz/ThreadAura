import Link from 'next/link';
import React from 'react';

const SortDropdown = ({ sortOption, setSortOption ,slug,category}) => {
  return (
    <div className="mb-2 w-full sm:w-auto  flex justify-between p-3 md:p-10">

      <p className='text-gray-500'>
        <Link href={`${category}`}> Home  </Link> / {slug}
      </p>

      <select
        value={sortOption}
        onChange={(e) => setSortOption(e.target.value)}
        className="bg-gray-100 border border-gray-300 text-gray-900 text-sm w-auto rounded-md p-2"
      >
        <option  value="">Select Sorting Options</option>
        <option value="a-z">A to Z</option>
        <option value="price-low-high">Price - Low to High</option>
        <option value="price-high-low">Price - High to Low</option>
        <option value="newest">Newest</option>
        <option value="popularity">Popularity</option>
      </select>
    </div>
  );
};

export default SortDropdown;
