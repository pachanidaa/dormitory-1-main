// interfaces/PersonalDetail.ts
import { PersonalInterface } from "./Personal";
import { AddressInterface } from "./Address";
import { FamilyInterface } from "./Family";
import { OtherInteface } from "./Other";

export interface PersonalDetailInterface {
    personal: PersonalInterface;
    address: AddressInterface;
    family: FamilyInterface;
    other: OtherInteface;
}