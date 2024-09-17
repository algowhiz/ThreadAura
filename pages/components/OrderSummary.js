const OrderSummary = ({ order, buyNow }) => {
    return (
      <div>
        <h2 className='text-xl mt-5 font-sans font-bold'>
          2 . {buyNow ? 'Review Your Item' : 'Review Cart Items'}
        </h2>
        <div className="flex flex-wrap -m-4">
          {order.length === 0 ? (
            <p className="text-center m text-gray-600 m-5 mt-6 font-sans">😅 Oops! Your cart is empty. Time to fill it with some amazing finds!</p>
          ) : (
            <div className="flex w-full flex-wrap justify-center items-center gap-4">
              {order.map((item, index) => (
                <div key={index} className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-4">
                  <div className="bg-gray-200 p-6 rounded-lg mt-10">
                    <img className="h-40 rounded w-full  object-cover object-center mb-6"
                      src={item.imgUrl || item.img}
                      alt={item.name}
                    />
                    <h3 className="tracking-widest text-indigo-500 text-xs font-medium title-font">
                      {item.varient}
                    </h3>
                    <h2 className="text-lg  whitespace-pre-line text-gray-900 font-medium title-font mb-4">
                      {item.name || item.title} ({item.size}/{item.varient || item.color})
                    </h2>
                    <p className="leading-relaxed text-base font-bold">
                      ₹{item.price} X {item.qty || item.quantity} = ₹{item.price * (item.qty || item.quantity)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };
  
  export default OrderSummary;
  