import { PathEnum } from "../../enums/PathEnum";
import { ColorsEnum } from "../../enums/ColorsEnum";

export interface SidebarNavigationItemData {
  name: string;
  icon: any;
  path: PathEnum;
  color: ColorsEnum;
}
