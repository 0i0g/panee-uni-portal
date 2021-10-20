export class UpdateClassDTO {
  readonly _id: string;
  readonly subject: string;
  readonly name: string;
  readonly fromDate: Date;
  readonly toDate: Date;
  readonly dow: number[];
  readonly slots: number[];
  readonly enrollCode: string;
}
