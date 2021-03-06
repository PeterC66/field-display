import {
  isEmpty,
  isFunction,
  isNil,
  toString,
} from 'lodash';

import { NO_VALUE } from '../helpers';

export default function stringValueArrayDisplay(
  createElement,
  valueArray,
  get,
  valueStyleClass = '',
) {
  if (isNil(valueArray)) return null;

  const valueArrayToUse = isEmpty(valueArray) ? [NO_VALUE] : valueArray;
  return valueArrayToUse.map((value) => {
    const valueToUse = toString(isFunction(get) ? get(value) : value);
    return createElement(
      'p',
      { class: valueStyleClass },
      `${valueToUse}`,
    );
  });
}
