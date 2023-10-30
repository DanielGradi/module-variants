import { $Q } from "graditify-utils";
import { variantOnChange } from "./graditify_variants-product"


class ProductVariants extends  HTMLElement {
  constructor() {
    super()
    this.props = {
      intersectionElement: this.validateAttribute(this.getAttribute('intersection-element')), // REQUIRED: CSS selector
      mediaQuery: this.validateAttribute(this.getAttribute('media-query')), // Optional
      sectionRendering: this.validateAttribute(this.getAttribute('section-rendering')), // REQUIRED
      priceSelector: this.validateAttribute(this.getAttribute('price-selector')), // Optional
      imagesChange: this.validateAttribute(this.getAttribute('images-change')), // Optional
      variantsWrapper: this.validateAttribute(this.getAttribute('variants-wrapper')), // Optional
      buttonSubmit: this.validateAttribute(this.getAttribute('button-submit')), // Optional
    }
    this.variants = $Q('.variants', this)
  }

  connectedCallback() {
    this.hiddenElement($Q('.price-product-js', this))
    this.hiddenElement($Q('.graditify_variants--images', this))
    variantOnChange(".graditify-variants", this);

    // AquC- viene el add to cart
  }

  /**
   * Validate if there are something in attribute
   * @param {string} attr - Attribute
   * @returns {string || null}
   */
  validateAttribute = (attr) => !attr || !attr.length ? null : attr

  activeStickyFeature() {
    console.log('Se activaron las funcionalidades sticky')
    this.activePrice()
    this.activeMedia()
  }

  activePrice() {
    this.showElement($Q('.price-product-js', this))
  }

  activeMedia() {
    this.showElement($Q('.graditify_variants--images', this))
  }

  hiddenElement(el) {
    if (el && !el.classList.contains('hidden')) {
      el.classList.add('hidden')
    }
  }

  showElement(el) {
    if (el && el.classList.contains('hidden')) {
      el.classList.remove('hidden')
    }
  }
}

window.customElements.define('product-variants', ProductVariants)

export default ProductVariants
