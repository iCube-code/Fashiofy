import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FaPlus } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";
import { MdKeyboardArrowRight } from "react-icons/md";
import AddProducts from "../../Components/AddProductsPopup/AddProducts";


function ManageProducts() {

    const [products, setProducts] = useState([]);
    const itemsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);

    const [openAddProduct, setOpenAddProduct] = useState(false)

    const totalPages = Math.ceil(products.length / itemsPerPage);

    const currentProducts = products.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePageClick = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    useEffect(() => {
        const getProducts = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URI}/products/all`
                );
                if (response.status === 200) {
                    setProducts(response.data.data);
                } else {
                    toast.error("Unexpected response while loading products");
                }
            } catch (e) {
                toast.error(e.response?.data?.message ?? "Failed to load products");

            }
        };
        getProducts();
    }, []);
    function handleAddProduct() {
        //TO DO
        setOpenAddProduct(true)
    }
    function handleToEdit() {
        //TO DO
    }
    return (
        <div className="p-2 bg-gray-100">
            <div className="flex flex-col sm:flex-row justify-between m-4 gap-2 sm:items-center">
                <h4 className="text-xl text-black-600 font-bold">Products</h4>
                <div >
                    <button onClick={handleAddProduct}
                        className="flex items-center gap-1 px-3 py-2 bg-orange-500 text-white text-center font-semibold cursor-pointer rounded-3xl hover:bg-orange-600 transition duration-300 text-xs">
                        <FaPlus />
                        <span>Add Product</span>
                    </button>
                          {openAddProduct && (
        <AddProducts
          open={openAddProduct}
          onClose={() => setOpenAddProduct(false)}
        />
      )}

                </div>
            </div>
            {currentProducts.length === 0 ?
                (<div className="text-center py-10 text-lg">No Products been added</div>)
                : (<div className="bg-white m-4 rounded-2xl shadow-md h-fit">
                    {/* products table */}
                    <div className="overflow-x-auto">
                        <table className="table-auto w-full min-w-[600px]">
                            <thead >
                                <tr className=" border-b border-gray-300 bg-gray-200  ">
                                    <th className=" border-r border-gray-300 px-4 py-2 text-start text-gray-600 text-sm font-semibold">PRODUCT NAME</th>
                                    <th className=" border-r border-gray-300  px-4 py-2 text-start text-gray-600 text-sm font-semibold">STOCK</th>
                                    <th className="border-r border-gray-300 px-4 py-2 text-start text-gray-600 text-sm font-semibold">ORIGINAL PRICE</th>
                                    <th className="border-r border-gray-300 px-4 py-2 text-start text-gray-600 text-sm font-semibold">PRICE</th>
                                    <th className="border-r border-gray-300 px-4 py-2 text-start text-gray-600 text-sm font-semibold">OPTION</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentProducts.map((product) => (
                                    <tr key={product._id} className="border-b border-gray-300">
                                        <td className="px-4 py-2 text-xs text-gray-500 font-medium">{product.name}</td>
                                        <td className="px-4 py-2 text-xs text-gray-500 font-medium">{product.stock}</td>
                                        <td className="px-4 py-2 text-xs text-gray-500 font-medium">{product.price}</td>
                                        <td className="px-4 py-2 text-xs text-gray-500 font-medium">{product.originalPrice}</td>
                                        <td className="px-4 py-2 text-xs text-gray-500 text-center font-medium">
                                            <button className="text-gray-500 cursor-pointer hover:text-gray-700 transition duration-300" onClick={handleToEdit}><FaRegEdit /></button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className=" flex flex-wrap justify-between items-center gap-2 px-4 py-2 ">
                        <div    >
                            <span className="text-xs text-blue-900 font-semibold ">Showing {currentProducts.length} </span>
                            <span className="text-xs text-gray-500 font-medium ">of {products.length} Products</span>
                        </div>
                        {/* Pagination */}
                        <div className="flex items-center space-x-1">
                            {[...Array(Math.min(5, totalPages)).keys()].map((i) => {
                                const page = i + 1;
                                return (
                                    <button
                                        key={page}
                                        onClick={() => handlePageClick(page)}
                                        className={`px-2 items-center border border-gray-300 rounded cursor-pointer text-xs ${currentPage === page ? "bg-gray-200 font-semibold" : ""
                                            }`}
                                    >
                                        {page}
                                    </button>
                                );
                            })}
                            {totalPages > 1 && (
                                <>
                                    <span className="px-1 items-center border border-gray-300 rounded text-xs">...</span>
                                    <button
                                        onClick={() => handlePageClick(currentPage + 1)}
                                        className=" px-1 items-center border border-gray-300 rounded cursor-pointer"
                                    >
                                        <MdKeyboardArrowRight />
                                    </button>
                                </>
                            )}
                        </div>
                        {/* Go to Page */}
                        <div className="flex items-center space-x-1 ">
                            <span className="text-xs text-gray-500 font-medium">Go to page</span>
                            <input
                                type="number"
                                min={1}
                                max={totalPages}
                                onChange={(e) => handlePageClick(Number(e.target.value))}
                                className="w-10 border border-gray-300 px-2  rounded  text-xs cursor-pointer"
                                value={currentPage}
                            />
                        </div>
                    </div>
                </div>
                )}
        </div>
    );
}
export default ManageProducts;
