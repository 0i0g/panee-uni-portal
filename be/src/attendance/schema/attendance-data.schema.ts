export class AttendanceData {
  classId: string;

  attended: string[];

  notAttended: string[];

  public constructor(init?: Partial<AttendanceData>) {
    Object.assign(this, init);
  }
}
