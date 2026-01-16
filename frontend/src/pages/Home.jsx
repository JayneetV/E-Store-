import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import api from '../api'
import ProductCard from '../components/ProductCard'

const Home = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const location = useLocation();

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const searchParams = new URLSearchParams(location.search);
                const searchQuery = searchParams.get('search');

                let url = 'products/';
                if (searchQuery) {
                    url += `?search=${searchQuery}`;
                }

                const response = await api.get(url)
                setProducts(response.data)
            } catch (error) {
                console.error("Error fetching products:", error)
            } finally {
                setLoading(false)
            }
        }

        fetchProducts()
    }, [location.search])

    return (
        <div className="container mx-auto px-4 py-8 flex-grow">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Latest Products</h2>

            {loading ? (
                <div className="text-center py-20 text-gray-500">Loading products...</div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {products.map((product) => (
                        <ProductCard key={product.slug} product={product} />
                    ))}
                </div>
            )}
        </div>
    )
}

export default Home
