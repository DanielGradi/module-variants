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
  const thisParent = $Q('form-variants');

  if (!thisParent) return

  const htmlResponse = await shopifyVariantByUrl(
    `/products/${handle}`,
    variantId
  );
  const {
    sectionRendering,
    priceSelector,
    imagesChange,
    buttonSubmit
  } = thisParent.props

  const parentSpecific = $Q(sectionRendering, stringToHTML(htmlResponse))
  const variantPrice = priceSelector ? $Q(priceSelector, parentSpecific) : null;
  const variantAvailable = $Q(`${thisParent.tagName} [name="available"]`, parentSpecific);
  const button = $Q(`${buttonSubmit}`, parentSpecific);
  const imagesVariant = imagesChange ? $Q(imagesChange, parentSpecific) : null; // PDTE DARLE SOPORTE

  return {
    price: variantPrice ? variantPrice.outerHTML : null,
    available: variantAvailable.value,
    button: button.textContent,
    images: imagesVariant ? imagesVariant : null,
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
  const {
    buttonSubmit
  } = parent.props

  const button = $Q(buttonSubmit);
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
  const thisParent = target.closest('form-variants');

  const {
    sectionRendering,
    priceSelector,
    buttonSubmit
  } = thisParent.props

   const addcartBtn = $Q(buttonSubmit);
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
  } = await sectionHandle(dataset.variant, value);

  updateButton(available, thisParent, button);
  updatePrice(price, $Q(priceSelector));

  if(images) updateSlider($Q(sectionRendering), images)
}
