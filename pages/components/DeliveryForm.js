const DeliveryForm = ({ formValues, handleInputChange, handleInputBlur, formValid }) => {
    return (
        <div>
            <h2 className='text-xl font-sans font-bold'>1 . Delivery Details</h2>
            <div className="mx-auto md:flex gap-2 font-bold">
                <div className="px-2 w-full md:w-1/2">
                    <div className="mb-4">
                        <label htmlFor="name" className="leading-7 text-sm text-gray-600">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formValues.name}
                            onChange={handleInputChange}
                            onBlur={handleInputBlur}
                            className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                        />
                    </div>
                </div>
                <div className="px-2 w-full md:w-1/2">
                    <div className="mb-4">
                        <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formValues.email}
                            onChange={handleInputChange}
                            onBlur={handleInputBlur}
                            className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                        />
                    </div>
                </div>
            </div>
            <div className="px-2 w-full font-bold">
                <div className="mb-4">
                    <label htmlFor="address" className="leading-7 text-sm text-gray-600">Address</label>
                    <textarea
                        id="address"
                        name="address"
                        value={formValues.address}
                        onChange={handleInputChange}
                        onBlur={handleInputBlur}
                        className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                </div>
            </div>
            <div className="mx-auto font-bold">
                <div className='w-full md:flex gap-2'>
                    <div className="px-2 w-full md:w-1/2">
                        <div className="mb-4">
                            <label htmlFor="phone" className="leading-7 text-sm text-gray-600">Phone</label>
                            <input
                                type="text"
                                id="phone"
                                name="phone"
                                value={formValues.phone}
                                onChange={handleInputChange}
                                onBlur={handleInputBlur}
                                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                            />
                        </div>
                    </div>
                    <div className="px-2 w-full md:w-1/2">
                        <div className="mb-4">
                            <label htmlFor="city" className="leading-7 text-sm text-gray-600">City</label>
                            <input
                                type="text"
                                id="city"
                                name="city"
                                value={formValues.city}
                                onChange={handleInputChange}
                                onBlur={handleInputBlur}
                                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                            />
                        </div>
                    </div>
                </div>
                <div className='md:flex gap-2'>
                    <div className="px-2 w-full md:w-1/2">
                        <div className="mb-4">
                            <label htmlFor="state" className="leading-7 text-sm text-gray-600">State</label>
                            <input
                                type="text"
                                id="state"
                                name="state"
                                value={formValues.state}
                                onChange={handleInputChange}
                                onBlur={handleInputBlur}
                                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                            />
                        </div>
                    </div>
                    <div className="px-2 w-full md:w-1/2">
                        <div className="mb-4">
                            <label htmlFor="pincode" className="leading-7 text-sm text-gray-600">Pincode</label>
                            <input
                                type="text"
                                id="pincode"
                                name="pincode"
                                value={formValues.pincode}
                                onChange={handleInputChange}
                                onBlur={handleInputBlur}
                                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeliveryForm;
