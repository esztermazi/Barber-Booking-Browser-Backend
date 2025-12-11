export interface Booking {
  id: string;
  barberId: string;
  start: number;
  end: number;
  email: string;
}

export namespace BookingDTO {
  export type Get = Pick<Booking, "email">;
  export type Create = Omit<Booking, "id">;
  export type Delete = Pick<Booking, "id">;
}
