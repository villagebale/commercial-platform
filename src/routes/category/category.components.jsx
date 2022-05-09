import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectCategoriesMap } from '../../store/categories/catergories.selector'
import ProductCard from '../../components/product-card/product-card.component'
import { useEffect, useState,Fragment } from 'react'
import './category.styles.scss'

const Category = () => {
    const {category} = useParams();
    const categoriesMap = useSelector(selectCategoriesMap)
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