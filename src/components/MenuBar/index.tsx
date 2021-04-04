import { TabBar } from "antd-mobile";
import {
  BsHouseDoorFill,
  BsHouseDoor,
  BsBagFill,
  BsBag,
  BsPersonFill,
  BsPerson,
} from "react-icons/bs";
import { useHistory } from "react-router-dom";
import "./style.less";

interface MenuBarProps {
  show?: boolean;
  pathname?: string;
}

const tabBarItems = [
  {
    title: "首页",
    selectedIcon: <BsHouseDoorFill className="font" />,
    icon: <BsHouseDoor className="font" />,
    link: "/",
  },
  {
    title: "订单",
    selectedIcon: <BsBagFill className="font" />,
    icon: <BsBag className="font" />,
    link: "/order",
  },
  {
    title: "我的",
    selectedIcon: <BsPersonFill className="font" />,
    icon: <BsPerson className="font" />,
    link: "/user",
  },
];

export const MenuBar = (props: MenuBarProps) => {
  const { show = false, pathname = "" } = props;
  const history = useHistory();

  return (
    <div className="menu-bar">
      <TabBar hidden={!show}>
        {tabBarItems.map((item) => {
          return (
            <TabBar.Item
              key={item.link}
              title={item.title}
              icon={item.icon}
              selectedIcon={item.selectedIcon}
              selected={pathname === item.link}
              onPress={() => {
                history.push(item.link);
              }}
            />
          );
        })}
      </TabBar>
    </div>
  );
};
