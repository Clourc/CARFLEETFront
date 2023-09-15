export class ReservationDto {
    id: number;
    start_Date: Date;
    end_Date: Date;
    reason: string;
  
    constructor(id: number, start_Date: Date, end_Date: Date, reason: string) {
      this.id = id;
      this.start_Date = start_Date;
      this.end_Date = end_Date;
      this.reason = reason;
    }
  }