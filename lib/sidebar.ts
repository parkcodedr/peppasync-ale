import { Layers, LucideIcon } from "lucide-react";

export interface SidebarItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

export const sidebarItems: SidebarItem[] = [
  {
    label: "Ops Pipeline",
    href: "/",
    icon: Layers,
  },
];
