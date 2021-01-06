import React, { useContext } from 'react'
import { ProductContext } from './ProductContext'



// get all unique values
export const getUnique = (items, value) => {
   return [...new Set(items.map(item => item[value]))];
};



const ProductFilter = ({ allProducts }) => {

   const context = useContext(ProductContext)
   const { handleDataChange, category, categories, company, price, minPrice, maxPrice, search, shipping } = context;

   // get unique companies
   let companies = getUnique(allProducts, "company");
   // add all
   companies = ["All", ...companies];
   // map to jsx
   companies = companies.map((item, index) => (
      <option key={index} value={item}>
         {item}
      </option>
   ));

   // get unique products by name
   let productName = getUnique(allProducts, "product_name");
   // add all
   productName = ["All", ...productName];
   // map to jsx
   productName = productName.map((item, index) => (
      <option key={index} value={item} />
   ));

   let allCategory = ["All", ...categories];
   // map to jsx
   allCategory = allCategory.map((item, index) => (
      <option key={item._id ? item._id : index} value={item._id ? item._id : index}>
         {item.name ? item.name : item}
      </option>
   ));


   return (
      <div>
         <form className="row mb-3">
            <div className="form-floating col">
               <select
                  className="form-select text-black text-capitalize"
                  id="category"
                  name="category"
                  value={category}
                  onChange={handleDataChange}
               >
                  {allCategory}
               </select>
               <label htmlFor="category">Category:</label>
            </div>
            <div className="form-floating col">
               <select
                  className="form-select text-black text-capitalize"
                  id="company"
                  name="company"
                  value={company}
                  onChange={handleDataChange}
               >
                  {companies}
               </select>
               <label htmlFor="company">Company:</label>
            </div>
            <div className="col form-floating">
               <input
                  type="range"
                  className="form-range form-control text-capitalize"
                  id="priceRange"
                  name="price"
                  min={minPrice}
                  max={maxPrice}
                  value={price}
                  onChange={handleDataChange}
               />
               <label htmlFor="priceRange" className="form-label">Price ${price}</label>
            </div>
            <div className="form-check col">
               <input
                  className="form-check-input"
                  type="checkbox"
                  name="shipping"
                  id="shippingChecked"
                  checked={shipping}
                  onChange={handleDataChange}
               />
               <label className="form-check-label" htmlFor="shippingChecked">
                  Shipping
               </label>
            </div>
         </form>
         <div className="form-floating mb-5">
            <input
               type="text"
               className="form-control"
               placeholder="Search Products"
               id="basic-searchBtn"
               value={search}
               onChange={handleDataChange}
               list="productNameSearchList"
               name="search"
            />
            <label htmlFor="basic-searchBtn">Search</label>
            <datalist id="productNameSearchList">
               {productName}
            </datalist>
         </div>
      </div>
   )
}


export default ProductFilter
