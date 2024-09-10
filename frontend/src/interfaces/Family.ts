export interface FamilyInterface{
  ID?: number;
  FathersName?: string;
  MathersName?: string;
  OccupationFather?: string;
  OccupationMather?: string;
  PhoneFather?: string;
  PhoneMather?: string;
  OrGuardiansName?: string;
  Relationship?: string;
  OccupationGuardian?: string;
  PhoneGuardian?: string;
  guardian_id?: number;
  family_status_id?: number;
  StudentID?: string; // เชื่อมโยงกับ Student
}