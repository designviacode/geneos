import { library } from '@fortawesome/fontawesome-svg-core';
import { faEdit, faUser, faBell } from '@fortawesome/free-regular-svg-icons';
import {
  faLongArrowAltLeft,
  faLongArrowAltRight
} from '@fortawesome/free-solid-svg-icons';

library.add(faEdit);
// library.add(faUser);

export const iconEdit = faEdit;
export const iconArrowLeft = faLongArrowAltLeft;
export const iconArrowRight = faLongArrowAltRight;
export const iconUser = faUser;
export const iconBell = faBell;
