import { FC, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { fetchAllProducts } from '../../../store/reducers/product/allProductsSlice';
import { deleteProduct, deleteProductReset } from '../../../store/reducers/product/productSlice';
import Swal from 'sweetalert2';
import DataTable from '../../../components/DataTable';
import MetaData from '../../../components/MetaData';
import { colors } from '../../../components/theme';
import { successMsg } from '../../../components/toast';
import TableLoader from '../../../components/loaders/TableLoader';
import { categories } from '../../../components/inputs';
import EditIcon from '../../../assets/icons/edit.svg';
import DeleteIcon from '../../../assets/icons/trashcan.svg';

interface Product {
    _id: number | string;
    name: string;
    description: string;
    costPrice: number;
    sellPrice: number;
    stock: number;
    category: string;
    active: boolean | string;
    actions: React.ReactNode;
}

interface ProductsData {
    columns: { label: string; field: keyof Product }[];
    rows: { [key: string]: string | number | React.ReactNode }[];
}

const ProductPage: FC = () => {
    const dispatch = useAppDispatch();
    const { products, loading } = useAppSelector((state) => state.allProducts);
    const { isDeleted } = useAppSelector((state) => state.product);
    useEffect(() => {
        dispatch(fetchAllProducts());
       

        if (isDeleted) {
            dispatch(fetchAllProducts());
            dispatch(deleteProductReset());
            successMsg('Product deleted successfully');
        }
    }, [dispatch, isDeleted]);

    const deleteProductHandler = (id: number | string) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteProduct(id));
                Swal.fire('Deleted!', 'Product has been deleted.', 'success');
            }
        });
    };

    const getCategoryLabel = (categoryValue : string) => {
        const category = categories.find((c) => c.value === categoryValue);
        return category ? category.label : 'Unknown';
    };

    const productsData: ProductsData = {
        columns: [
            { label: 'Product ID', field: '_id' },
            { label: 'Name', field: 'name' },
            { label: 'Description', field: 'description' },
            { label: 'Cost', field: 'costPrice' },
            { label: 'Sell Price', field: 'sellPrice' },
            { label: 'Stock', field: 'stock' },
            { label: 'Category', field: 'category' },
            { label: 'Active', field: 'active' },
            { label: 'Actions', field: 'actions' },
        ],
        rows: products.map((product) => ({
            _id: product._id,
            name: product.name,
            description: product.description,
            costPrice: product.costPrice,
            sellPrice: product.sellPrice,
            stock: product.stock,
            category: getCategoryLabel(product.category),
            active: product.active ? (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-md bg-green-600 text-white">
                  Available
                </span>
              ) : (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-md bg-red-600 text-white">
                 Unavailable
                </span>
              ),
            actions: (
                <div className="flex items-center ml-6">
                    <Link to={`/admin/product/${product._id}`} className="mr-2 w-8 h-8 md:h-14 md:w-12 lg:h-8 lg:w-8">
                        <img
                            src={EditIcon}
                            alt="Edit Icon"
                            className="transition duration-300 ease-in-out transform hover:scale-110"
                        />
                    </Link>
                    <button className="w-8 h-8 md:h-14 md:w-12 lg:h-8 lg:w-8" onClick={() => deleteProductHandler(product._id)}>
                        <img
                            src={DeleteIcon}
                            alt="Delete Icon"
                            className="transition duration-300 ease-in-out transform hover:scale-110"
                        />
                    </button>
                </div>
            ),
        })),
    };

    return (
        <>
            <MetaData title={'All Products'} />
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    background: 'linear-gradient(135deg, #b0cca9, #ffffff)',
                    padding: '20px',
                    borderRadius: '8px',
                    height: '60px',
                }}
            >
                <div className="p-4">
                    <h1 className="text-2xl font-semibold">Products</h1>
                </div>
                <div className="p-4">
                    <Link to="/admin/product-add">
                        <button className={`${colors.primary} font-bold py-2 px-4 rounded-lg`}>Add +</button>
                    </Link>
                </div>
            </div>

            <div className="ph-4">
                {loading ? (
                    <TableLoader />
                ) : (
                    <DataTable columns={productsData.columns} rows={productsData.rows} />
                )}

            </div>
        </>
    );
};

export default ProductPage;
