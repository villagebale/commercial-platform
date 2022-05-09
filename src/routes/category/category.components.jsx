import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectCategoriesMap } from '../../store/categories/catergories.selector'
import { selectLoading } from '../../store/categories/catergories.selector'
import ProductCard from '../../components/product-card/product-card.component'
import { useEffect, useState,Fragment } from 'react'
import Spinner from '../../components/spinner/spinner.component'
import './category.styles.scss'

const Category = () => {
    const {category} = useParams();
    const categoriesMap = useSelector(selectCategoriesMap);
    const isLoading = useSelector(selectLoading);
    const [products, setProducts] = useState(categoriesMap[category]);
    useEffect(() => {
        setProducts(categoriesMap[category]);
    },[category, categoriesMap])
    return (
        <Fragment>
            <h2 className='category-title'>{category.toUpperCase()}</h2>
            {
                isLoading ? (<Spinner />) :
                    (
                        <div key={category} className='category-container'>

                            {products &&
                                products
                                    .map((product) => {
                                        return (
                                            <ProductCard product={product} key={product.id} id={product.id} />
                                        )
                                    })
                            }
                        </div>
                    )
            }
        </Fragment>
    )
}

export default Category;