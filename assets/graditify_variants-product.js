import { $Q, $Qll } from "graditify-utils";
import { queryVariants } from "./graditify_variants-change";

/**
 * @param {HTMLElement} parent - Dom element parent of all seletors options
 * @returns Array of nodes
 */
 const options = (parent) => $Qll('.js-option', parent);

 /**
  * @param {Array} options - Array of option names
  * @returns separate options with "/"
  */
 const buildOption = (options) => options.join(' / ');

/**
 * optionChecked
 * Iterates and searches for the options that were selected
 *
 * @param {HTMLElement} parent - Dom element parent of all seletors options
 * @returns A variant name - string reference
 */
 function optionsChecked(parent) {
  let myOptions = [];

  options(parent).forEach(
    (option) => {
      if (option.type === "radio") {
        if (option.checked === true) {
          myOptions = [...myOptions, option.value]
        }
      } else {
        myOptions = [...myOptions, option.value]
      }
    }
  )
  return buildOption(myOptions);
}

/**
 * selectVariant
 * Searches for a selected variant in an object stored in
 * the DOM (input[id="variants"])
 *
 * @param {HTMLElement} parent - Dom element parent of all seletors options
 * @returns Replacement of id in the dom (on input[name="id"])
 */
function selectVariant(parent) {
  const thisParent = $Q('form-variants');
  const variantName = optionsChecked(parent);
  const variants = JSON.parse($Q('#variants', parent).value);

  const variantFilter = variants.filter(
    (variant) => variant.title === variantName
  )

  $Q('[name="id"]', thisParent).value = variantFilter[0].id
}

/**
 * iterationOptions
 * Detects a change of state on each option selector
 *
 * @param {HTMLElement} parent - Dom element parent of all seletors options
 * @returns Iteration of all selector
 */
 function iterationOptions(parent) {
  return options(parent).forEach((option) => {

    option.addEventListener('change', (e) => {
      selectVariant(parent);
      queryVariants(e);
    });
  });
}

/**
 * variantOnChange
 * Adds the functionality in the variant selection group
 *
 * @param {String} component - It is the reference in the dome of
 * @param {Element} node - this node is one element html.
 * reload event to a single element.
 * all input-selector (variant selection) groups by product
 * @returns Iterator function on each input-selector
 */
 export const variantOnChange = (component, scope = null) => {
  const parents = $Qll(component, scope);

  if (parents.length > 1) {
    return parents.forEach((parent) => {
        iterationOptions(parent);
    })
  }

  return iterationOptions(parents[0])
}
