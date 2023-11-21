export interface PanelInterface {
  password: string;
  username: string;
  datetime: Date;
  finished?: boolean;
}

export type PanelPasswordType =  'A' | 'P';