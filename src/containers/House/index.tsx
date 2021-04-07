import Banner from "./components/Banner";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Info from "./components/Info";
import List from "./components/List";
import "./style.less";
import { useRef } from "react";
import { useDownRefresh } from "@/hooks";
import { DownRefreshLoading } from "@/components";

const House = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const downRefreshLoading = useDownRefresh(containerRef, () => {
    return new Promise((resolve) => {
      resolve("");
    });
  });

  return (
    <div className="house">
      <Header />
      <div className="house_main">
        <DownRefreshLoading downRefreshLoading={downRefreshLoading} />
        <div className="house_container" ref={containerRef}>
          <Banner />
          <Info />
          <List />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default House;
