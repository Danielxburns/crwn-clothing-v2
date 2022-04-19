import { useContext, useState, useEffect, Fragment } from 'react';
import { useParams } from 'react-router-dom';

import ProductCard from '../../components/product-card/product-card.component';

import { CategoriesContext } from '../../contexts/categories.context';

import { CategoryContainer, CategoryTitle } from './category.styles.jsx';

const Category = () => {
  const { category } = useParams();
  const { categoriesMap } = useContext(CategoriesContext);
  const [products, setProducts] = useState(categoriesMap[category]); // intitialized as {} from CategoriesContext so value of {category:_____} is undefined

  useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap]); // only run whenever one of these change

  //console.log( 'before return :>> ',categoriesMap,category,categoriesMap[category]);

  return (
    <Fragment>
      <CategoryTitle>{category.toUpperCase()}</CategoryTitle>
      <CategoryContainer>
        {products && // don't render this until CategoriesContext gets and sets data from FireStore
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </CategoryContainer>
    </Fragment>
  );
};

export default Category;
