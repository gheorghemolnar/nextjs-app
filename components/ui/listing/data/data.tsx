import { Check, XIcon } from "lucide-react";

export const statuses = [
  {
    value: "C",
    label: "Conforme",
    icon: Check,
    color: "text-green-900"
  },
  {
    value: "NC",
    label: "NonConforme",
    icon: XIcon,
    color: "text-red-900"
  }
];

export enum CONTROL_STATUS {
  C = "C",
  NC = "NC"
}
