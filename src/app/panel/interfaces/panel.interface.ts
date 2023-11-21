export interface PanelInterface {
  password: string;
  username: string;
  datetime: Date;
  finished?: boolean;
  appointmentId: number;
}

export type PanelPasswordType =  'A' | 'P';