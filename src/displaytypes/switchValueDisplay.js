import {
  isNil,
  isEqual,
} from 'lodash';

import {
  NOTFOUND,
} from '../helpers';
import stringValueDisplay from './stringValueDisplay';

export default function switchValueDisplay(
  createElement,
  value,
  textOn,
  textOff,
  valueOn,
  valueOff,
  valueStyleClass = '',
) {
  if (isNil(value)) return null;
  const textOnToUse = textOn || 'On';
  const textOffToUse = textOff || 'Off';
  const valueOnToUse = valueOn || true; // assumed defaults
  const valueOffToUse = valueOff || false;

  if (isEqual(value, valueOnToUse)) {
    return stringValueDisplay(
      createElement,
      textOnToUse, null, valueStyleClass,
    );
  } if (isEqual(value, valueOffToUse)) {
    return stringValueDisplay(
      createElement,
      textOffToUse, null, valueStyleClass,
    );
  }
  console.log('Invalid switch value: ', value);
  return stringValueDisplay(
    createElement,
    NOTFOUND, null, valueStyleClass,
  );
}
