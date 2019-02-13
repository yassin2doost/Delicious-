import '../sass/style.scss';

import { $, $$ } from './modules/bling';
import autocompelete from './modules/autocomplete';

autocompelete( $('#address'), $('#lat'), $('#lng')); 