import {
  AlarmCheck,
  ArrowDownToLine,
  ArrowRightToLine,
  ArrowUpToLine,
  Check,
  Hourglass,
} from "lucide-react"

export const labels = [
  {
    value: "bug",
    label: "Bug",
  },
  {
    value: "feature",
    label: "Feature",
  },
  {
    value: "documentation",
    label: "Documentation",
  },
]

export const statuses = [
  {
    value: "C",
    label: "Conforme",
    icon: Check,
  },
  {
    value: "NC",
    label: "NonConforme",
    icon: AlarmCheck,
  },
  {
    value: "in progress",
    label: "In Progress",
    icon: Hourglass,
  },
]

export const priorities = [
  {
    label: "Low",
    value: "low",
    icon: ArrowDownToLine,
  },
  {
    label: "Medium",
    value: "medium",
    icon: ArrowRightToLine,
  },
  {
    label: "High",
    value: "high",
    icon: ArrowUpToLine,
  },
]
