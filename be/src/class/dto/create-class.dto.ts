export class CreateClassDTO {
  readonly subject: string;
  readonly name: string;
  readonly fromDate: Date;
  readonly toDate: Date;
  readonly dow: number[];
  readonly slots: number[];
}
