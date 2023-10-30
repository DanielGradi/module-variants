import './graditify_product-variants-styles.scss'
import { $Q } from 'graditify-utils';
import './graditify_component-product-variants';

 /**
  * Validate media query: type max-width
  * @param {boolean} valid - boolean about if there is intersection or no
  * @returns {boolean}
  */
function validationMediaQuery(valid) {
  const {
    mediaQuery
  } = $Q("product-variants").props

  const mediaQueryNumber = window.Number.parseInt(mediaQuery, 10)

  return mediaQueryNumber
    ? window.innerWidth <= mediaQueryNumber && valid
    : valid
}

const observeActionSticky = (...args) => {
  const [entries] = args;
  const mainProduct = $Q("main");
  const productVariants = $Q("product-variants");
  const {
    variantsWrapper
  } = productVariants.props
  const productVariantsWrapper = $Q(variantsWrapper)

  entries.forEach((entry) => {
    if (validationMediaQuery(!entry.isIntersecting)) {
      productVariants.classList.add('product-variants-sticky')
      mainProduct.appendChild(productVariants);
      productVariants.activeStickyFeature()
    } else {
      productVariants.classList.remove('product-variants-sticky')
      productVariantsWrapper.appendChild(productVariants);
    }
  })
}

/**
** Change sectionOne variable depending
on when you want sticky cart to appear.
*/
export const initialStickyCard = (() => {
  const {
    intersectionElement
  } = $Q("product-variants").props

  const sectionOne = $Q(intersectionElement);
  const sectionOptions = {};
  const sectionObserver = new IntersectionObserver(
    observeActionSticky,
    sectionOptions
  );

  sectionObserver.observe(sectionOne);
})()

