import { ILanguage } from "../interfaces/formInterfaces";

export const sortArrayByString = (a: ILanguage, b: ILanguage) => {
  let fa = a.name.toLowerCase(),
    fb = b.name.toLowerCase();

  if (fa < fb) {
    return -1;
  }
  if (fa > fb) {
    return 1;
  }
  return 0;
}
