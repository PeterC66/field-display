import Vue from 'vue';
import {
  isNil,
  isNull,
} from 'lodash';

import dateTimeValueDisplay from './displaytypes/dateTimeValueDisplay';
import checkboxValueDisplay from './displaytypes/checkboxValueDisplay';
import radiosValueDisplay from './displaytypes/radiosValueDisplay';
import checklistValueArrayDisplay from
  './displaytypes/checklistValueArrayDisplay';
import selectValueDisplay from './displaytypes/selectValueDisplay';
import stringValueDisplay from './displaytypes/stringValueDisplay';
import stringValueArrayDisplay from './displaytypes/stringValueArrayDisplay';
import colorValueDisplay from './displaytypes/colorValueDisplay';
import switchValueDisplay from './displaytypes/switchValueDisplay';
import {
  NO_VALUE,
} from './helpers';

function errorDisplay(createElement, type) {
  return stringValueDisplay(createElement, `Unknown field type "${type}"`);
}

function notYetDoneDisplay(createElement, type) {
  return stringValueDisplay(
    createElement,
    `Field type "${type}" has yet to be done`,
  );
}

export default Vue.component('EachFieldDisplay',
  {
    props: {
      field: { // Includes the vfg_schema for the field, its current 'value', and options
        type: Object,
        required: true,
      },
    },
    render(createElement) {
      const {
        type,
        inputType,
        key,
        label,
        value,
        get,
        values = [],
        textOn,
        textOff,
        valueOn,
        valueOff,
        radiosOptions = {},
        selectOptions = {},
        checklistOptions = {},
        fieldOptions = {},
        format = null,
      } = this.field;

      const {
        stylePrefix = '',
        showNulls = true,
        hidden = false,
      } = fieldOptions;

      if (isNil(value) || isNil(type)) return null;
      if (hidden) return null;

      const labelToUse = label || key || 'Unknown';

      // First deal with those that need multiple lines for display, hence their displays return an array
      let fieldValueArrayDisplay = [];
      if (['checklist'].includes(type)) {
        const fieldLabelAsHeader = createElement(
          'p',
          { class: `${stylePrefix}Overall ${stylePrefix}ListName` },
          `${labelToUse}: `,
        );

        switch (type) {
          case 'checklist':
            fieldValueArrayDisplay = checklistValueArrayDisplay(
              createElement,
              value,
              values,
              checklistOptions,
              `${stylePrefix}Overall ${stylePrefix}ListValue`,
            );
            break;
          default:
            // eslint-disable-next-line no-console
            console.log('Problem in fVDA', this.field);
        }
        if (isNull(fieldValueArrayDisplay)) {
          if (!showNulls) return null;
          fieldValueArrayDisplay = stringValueArrayDisplay(
            createElement,
            [NO_VALUE],
            null,
            `${stylePrefix}ListValue`,
          );
        }
        return createElement('div', [
          fieldLabelAsHeader,
          ...fieldValueArrayDisplay,
        ]);
      }

      // Now we deal with those that need only one line for display
      if (!showNulls && (isNil(value) || value === '')) return null;

      let fieldValueDisplay = errorDisplay(createElement, type);
      const fieldLabel = createElement(
        'span',
        { class: `${stylePrefix}Name` },
        `${labelToUse}: `,
      );

      switch (type) {
        // For Core fields see https://vue-generators.gitbook.io/vue-generators/fields/core-fields
        case 'checkbox':
          if (!showNulls && !value) return null;
          fieldValueDisplay = checkboxValueDisplay(
            createElement,
            value,
            `${stylePrefix}Value`,
          );
          break;
        case 'input':
          // See https://vue-generators.gitbook.io/vue-generators/fields/core-fields/input
          // We do not allow here for inputTypes that are better handled by other field types
          // See ...\vue-form-generator\src\fields\core\fieldInput.vue
          switch (inputType.toLowerCase()) {
            case 'text':
            case 'url':
            case 'telephone':
            case 'email':
            case 'password':
            case 'number': // stringValueDisplay handles formatting
            case 'range':
            case 'year':
              fieldValueDisplay = stringValueDisplay(
                createElement,
                value,
                get,
                `${stylePrefix}Value`,
              );
              break;
              // ignore datetime (deprecated in favour of "datetime-local"), Month, Week, and Time
            case 'date':
            case 'datetime':
            case 'datetime-local':
              fieldValueDisplay = dateTimeValueDisplay(
                createElement,
                value,
                inputType,
                `${stylePrefix}Value`,
              );
              break;
            case 'color':
              fieldValueDisplay = colorValueDisplay(
                createElement,
                value,
                `${stylePrefix}Value`,
              );
              break;
            default:
              // eslint-disable-next-line no-console
              console.log('Problem in fVDB', this.field);
          }
          break;
        case 'label':
          fieldValueDisplay = stringValueDisplay(
            createElement,
            value,
            get,
            `${stylePrefix}Value`,
          );
          break;
        case 'radios':
          fieldValueDisplay = radiosValueDisplay(
            createElement,
            value,
            values,
            radiosOptions,
            `${stylePrefix}Value`,
          );
          break;
        case 'select':
          fieldValueDisplay = selectValueDisplay(
            createElement,
            value,
            values,
            selectOptions,
            `${stylePrefix}Value`,
          );
          break;
        case 'textArea':
          fieldValueDisplay = stringValueDisplay(
            createElement,
            value,
            get,
            `${stylePrefix}Value`,
          );
          break;

        // For optional fields https://vue-generators.gitbook.io/vue-generators/fields/optional_fields
        case 'cleave':
          fieldValueDisplay = stringValueDisplay(
            createElement,
            value,
            get,
            `${stylePrefix}Value`,
          );
          break;
        case 'dateTimePicker':
          if (format) { // Display in the format it is stored in
            fieldValueDisplay = stringValueDisplay(
              createElement,
              value,
              null,
              `${stylePrefix}Value`,
            );
          } else { // The value is stored in the normal Unix time (=Date())
            fieldValueDisplay = dateTimeValueDisplay(
              createElement,
              value,
              type,
              `${stylePrefix}Value`,
            );
          }
          break;
        case 'googleAddress':
        case 'masked':
          fieldValueDisplay = stringValueDisplay(
            createElement,
            value,
            get,
            `${stylePrefix}Value`,
          );
          break;
        case 'image':
          fieldValueDisplay = notYetDoneDisplay(createElement, type);
          break;
        case 'noUiSlider':
          fieldValueDisplay = stringValueDisplay(
            createElement,
            value,
            null,
            `${stylePrefix}Value`,
          );
          break;
        case 'pikaday':
          fieldValueDisplay = dateTimeValueDisplay(
            createElement,
            value,
            type,
            `${stylePrefix}Value`,
          );
          break;
        case 'selectEx':
          // Beware - this can be either single or multiple valued
          fieldValueDisplay = notYetDoneDisplay(createElement, type);
          break;
        case 'rangeSlider':
          // Beware - this can be either single or double valued
          fieldValueDisplay = notYetDoneDisplay(createElement, type);
          break;
        case 'spectrum':
          fieldValueDisplay = colorValueDisplay(
            createElement,
            value,
            `${stylePrefix}Value`,
          );
          break;
        case 'staticMap':
          fieldValueDisplay = notYetDoneDisplay(createElement, type);
          break;
        case 'switch':
          fieldValueDisplay = switchValueDisplay(
            createElement,
            value,
            textOn,
            textOff,
            valueOn,
            valueOff,
            `${stylePrefix}Value`,
          );
          break;
        case 'vueMultiSelect':
          fieldValueDisplay = notYetDoneDisplay(createElement, type);
          break;
        // Others
        case 'unknown': // a non-schema field
          fieldValueDisplay = stringValueDisplay(
            createElement,
            value,
            get,
            `${stylePrefix}Value`,
          );
          break;
        default:
          // eslint-disable-next-line no-console
          console.log('Problem in fVDC', this.field);
      }

      if (showNulls || !isNull(fieldValueDisplay)) {
        return createElement(
          'p',
          { class: `${stylePrefix}Overall` },
          [
            fieldLabel,
            fieldValueDisplay,
          ],
        );
      }
      return null;
    },
  });
