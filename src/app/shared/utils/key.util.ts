import { PanelPasswordType } from './../../panel/interfaces/panel.interface';

enum KEYTABLE {
  A ='normal',
  P ='priority'
}
export function keyType(type: PanelPasswordType): string {
  return KEYTABLE[type]
}