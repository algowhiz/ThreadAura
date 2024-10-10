import React from 'react';

const Shimmer = ({ type }) => {
  if (type === "carousel") {
    return (
      <div className="w-full h-[70vh] bg-gray-300 shimmer rounded-lg"></div>
    );
  }

  if (type === "category") {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Array(4).fill('').map((_, idx) => (
          <div key={idx} className="w-full h-48 bg-gray-300 shimmer rounded-lg"></div>
        ))}
      </div>
    );
  }

  if (type === "best-selling") {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {Array(5).fill('').map((_, idx) => (
          <div key={idx} className="w-full h-48 bg-gray-300 shimmer rounded-lg"></div>
        ))}
      </div>
    );
  }

  return null;
};

export default Shimmer;
