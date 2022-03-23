import { OverridableComponent } from "@mui/material/OverridableComponent";
import { SvgIconTypeMap } from "@mui/material/SvgIcon";

// LinkItem is an interface for defining the routes for navigation menu items
interface LinkItem {
  key: string;
  title: string;
  tooltip?: string;
  path?: string;
  enabled: boolean;
  icon?: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
  subRoutes?: Array<LinkItem>;
  appendDivider?: boolean;
}

export default LinkItem;
