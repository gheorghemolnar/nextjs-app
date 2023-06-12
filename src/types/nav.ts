export interface NavItem {
  title: string;
  href?: string;
  path?: string;
  disabled?: boolean;
  external?: boolean;
  children: [
    {
      title: string;
      href?: string;
    }
  ];
}
