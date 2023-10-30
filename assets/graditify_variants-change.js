import { $Q, stringToHTML } from "graditify-utils";
import { shopifyVariantByUrl } from "graditify-api";

/**
 * Captures the HTML section of the product in question and returns data
 * @param {String} handle Data element of the product
 * to which the query will be made
 * @param {String} variantId Id of the selected variant
 * @returns Object - price, available, button
 */
async function sectionHandle(handle, variantId) {
  const thisParent = $Q('product-variants');

  if (!thisParent) return

  const htmlResponse = await shopifyVariantByUrl(
    `/products/${handle}`,
    variantId
  );
  const {
    sectionRendering,
    priceSelector,
    imagesChange
  } = thisParent.props

  const parentSpecific = $Q(sectionRendering, stringToHTML(htmlResponse))
  const variantPrice = priceSelector ? $Q(priceSelector, parentSpecific) : null;
  const variantAvailable = $Q(`${thisParent.tagName} [name="available"]`, parentSpecific);
  const button = $Q(`${thisParent.tagName} .btn-cart-js`, parentSpecific);
  const imagesVariant = imagesChange ? $Q(imagesChange, parentSpecific) : null; // PDTE DARLE SOPORTE
  const imagesVariantSticky = $Q(`.graditify_variants--images img`, parentSpecific);

  return {
    price: variantPrice ? variantPrice.outerHTML : null,
    available: variantAvailable.value,
    button: button.textContent,
    images: imagesVariant ? imagesVariant : null,
    imagesVariantSticky: imagesVariantSticky ? imagesVariantSticky.outerHTML : null,
  }
}

/**
 * Inject new price node to the section
 *
 * @param {HTMLCollection} variantPrice - Object with the price value
 * @param {HTMLElement} parent - Parent node to closest
 * with className 'product-js'
 *
 */
function updatePrice(variantPrice, sectionPrice) {
  const intoElementPrice = $Q('product-variants .price-product-js')

  // Intern price in product-variants web component
  if (intoElementPrice && variantPrice) {
    intoElementPrice.innerHTML = variantPrice;
  }

  /**
   * Price out in product-variants web component
   * This part depend of price-selector attribute in the web component -> product-variants
   */
  if (variantPrice && sectionPrice) {
    sectionPrice.innerHTML = variantPrice;
  }

}

/**
 * Show not available of the variant, depending of the stock
 *
 * @param {String} available - Dataset available
 * @param {HTMLElement} parent - Parent node to closest
 * with className 'product-js'
 * @param {String} newText - New text in button add to cart
 */
function updateButton(available, parent, newText) {
  const button = $Q('.btn-cart-js', parent);
  button.innerHTML = newText;

  if (available === 'false') {
    button.disabled = true;
  } else {
    button.disabled = false;
  }
}

/**
 * This method receive parameters to create render logic of product slider
 * @param {node} sectionParent - This node is the main section, when render product-variants
 * This node is the same that attribute section-rendering
 * @param {node} images - This node is the new node with new images (slider) to render
 * @author Daniel Santos
 */
function updateSlider(sectionParent, images) {
  // If you are going to update product slider, in this mC)thod add lC3gic.
}

function updateVariantImage(imagesVariantSticky) {
  const imageVariantWrapper = $Q('product-variants .graditify_variants--images')
  console.log({imagesVariantSticky})
  if (!imageVariantWrapper) return

  imageVariantWrapper.innerHTML = imagesVariantSticky
}

/**
 * Section rendering to dynamic price
 * and available data, changing the values on Cart page
 * and product card.
 *
 * @param {HTMLElement} param0 - Node with event change
 *
 * @author Andres BriC1ez
 * @author Cristian Velasco
 * @author Edinson Figueroa
 * @author Daniel Santos
 * @version 2.0
 */
 export async function queryVariants({ target }) {
  const thisParent = target.closest('product-variants');

  const {
    sectionRendering,
    priceSelector
  } = thisParent.props

   const addcartBtn = $Q('.btn-cart-js', thisParent);
   const {
    value,
    dataset,
  } = $Q('[name="id"]', thisParent);

  addcartBtn.disabled = true;
  addcartBtn.innerHTML = '<div id="loading"></div>';

  const {
    price,
    available,
    button,
    images,
    imagesVariantSticky
  } = await sectionHandle(dataset.variant, value);

  updateButton(available, thisParent, button);
  updatePrice(price, $Q(priceSelector));
  updateVariantImage(imagesVariantSticky)

  if(images) updateSlider($Q(sectionRendering), images)
}
