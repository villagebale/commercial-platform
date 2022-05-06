import ProductCard from '../product-card/product-card.component';
import { Link } from 'react-router-dom';
import './category-preview.styles.scss'

const CategoryPreview = ({ title, products }) => {

    return (
        <div key={title} className='category-preview-container'>
            <Link to={`${title}`}> 
                <span className='title' >{title.toUpperCase()}</span>
            </Link>
            <div className='preview'>
                {
                    products
                        .filter((_, idx) => idx < 4)
                        .map((product) => {
                            return (
                                <ProductCard product={product} id={product.id} />
                            )
                        })
                }
            </div>
        </div>
    )
}

export default CategoryPreview;