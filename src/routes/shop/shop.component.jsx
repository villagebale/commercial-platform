import { useContext } from 'react'
import { ProductsContext } from '../../contexts/products.context'
import ProductCard from '../../components/product-card/product-card.component'
import './shop.styles.scss'

const Shop = () => {
    const {products} = useContext(ProductsContext);
    return (
        <div className='product-container'>
            {products.map((product) => {
                return (
                    <ProductCard product={product} id={product.id} />
                )
            })}
        </div>
        // <div className='products'>
        //     {
        //         products.map((item) => {
        //             return (
        //                 <div className='products-item' key={item.id} style={{backgroundImage:`url(${item.imageUrl})`}} >
        //                     <h1>{item.name}</h1>
        //                 </div>
        //             )
        //         })
        //     }
        // </div>
    )
}

export default Shop;