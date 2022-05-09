import { useDispatch } from 'react-redux'
import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { setCategories } from '../../store/categories/categories.action'
import { addCollectionAndDocuments, getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";
import CategoriesPreview from '../categories-preview/categories-preview.components';
import Category from '../category/category.components';

import './shop.styles.scss';

const Shop = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const getCategoriesMap = async () => {
        const categoriesArray = await getCategoriesAndDocuments();
        dispatch(setCategories(categoriesArray));
        // console.log(categoriesArray);
    }
    getCategoriesMap();
},[])

  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=':category' element={<Category />} />
    </Routes>
  );
};

export default Shop;