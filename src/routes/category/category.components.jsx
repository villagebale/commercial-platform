import { useParams } from 'react-router-dom'
import ProductCard from '../../components/product-card/product-card.component'
import { useContext, useEffect, useState,Fragment } from 'react'
import { CategoriesContext } from '../../contexts/categories.context'
import './category.styles.scss'

const Category = () => {
    const {category} = useParams();
    const {categoriesMap} = useContext(CategoriesContext);
    const [products, setProducts] = useState(categoriesMap[category]);
    useEffect(() => {
        setProducts(categoriesMap[category]);
    },[category, categoriesMap])
    return (
        <Fragment>
        <h2 className='category-title'>{category}</h2>
        <div key={category} className='category-container'>
            
                {products &&
                    products
                        .map((product) => {
                            return (
                                <ProductCard product={product} id={product.id} />
                            )
                        })
                }
        </div>
        </Fragment>
    )
}

export default Category;