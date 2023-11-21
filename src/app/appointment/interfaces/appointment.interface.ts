import { UserInterface } from "src/app/users/interfaces/user.interface";

export interface AppointmentInterface {
  id: number;
  userId?: number;
  datetime: Date;
  especialidade: string;
  code: string;
};



export interface AppointmentAndUserInterface extends AppointmentInterface {
  user: UserInterface;
  username?: string;
  agendamentos: any[];
}