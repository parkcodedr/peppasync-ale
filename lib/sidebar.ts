import { Layers } from "lucide-react";

export interface SidebarItem {
  label: string;
  href: string;
  icon: any;
}

export const sidebarItems: SidebarItem[] = [
  {
    label: "Ops Pipeline",
    href: "/ops-pipeline",
    icon: Layers,
  },
];
