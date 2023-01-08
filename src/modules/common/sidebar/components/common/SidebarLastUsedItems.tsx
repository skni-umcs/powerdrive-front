import React from "react";
import { LastUsedItemData } from "../../../../../models/ui/LastUsedItemData";

interface SidebarLastUsedItemsProps {
  title: string;
  items: LastUsedItemData[];
}
const SidebarLastUsedItems = ({ title, items }: SidebarLastUsedItemsProps) => {
  return (
    <div className="app__sidebar__last-used">
      <div className="app__sidebar__last-used__header">{title}</div>
      <div className="app__sidebar__last-used__items">
        {items.map((item) => (
          <div className="app__sidebar__last-used__item">
            <img
              src={require("assets/images/" + item.type + ".png")}
              className="app__sidebar__last-used__item__icon"
            />
            <div className="app__sidebar__last-used__item__name">
              {item.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SidebarLastUsedItems;
