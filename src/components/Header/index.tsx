import { memo } from "react";
import "./style.less";
interface HeaderProps {
  onBack: () => void;
  title: string;
}

export const Header = memo((props: HeaderProps) => {
  const { onBack, title } = props;
  return (
    <div className="page-header">
      <div className="header-back" onClick={onBack}>
        返回
      </div>
      {title}
    </div>
  );
});
