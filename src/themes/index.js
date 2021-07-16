import cloneDeep from 'lodash/cloneDeep';

import themeBase from './_base';
import defaultDark from './defaultDark';

const themeDefaultDark = { ...cloneDeep(themeBase), ...cloneDeep(defaultDark)};

export {
  themeDefaultDark
};