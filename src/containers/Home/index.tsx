import { useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import { BsArrowRepeat } from "react-icons/bs";
import { NewDispatch, RootState, ServerStore } from "@/store";
import Header from "./components/Header";
import Hot from "./components/Hot";
import Search from "./components/Search";
import * as HomeActions from "@/store/actions/home";
import "./style.less";
import { useMount } from "@/hooks";
import { parallel } from "@/utils";
import { useDownRefresh } from "@/hooks/useDownRefresh";
import { ServerMatch } from "@/typings";

const Home = () => {
  const { selectedCity, times, cities, hots } = useSelector<
    RootState,
    RootState["home"]
  >((state) => state.home);
  const dispatch = useDispatch<NewDispatch>();
  const homeRef = useRef<HTMLDivElement>(null);

  useMount(() => {
    if (cities[0].length === 1) {
      dispatch(HomeActions.getCities());
    }
    if (hots.length === 0) {
      dispatch(HomeActions.getHots());
    }
  });

  const refreshLoading = useDownRefresh(homeRef, () => {
    return dispatch(HomeActions.getHots());
  });

  const handleCityChange = useCallback(
    (val?: (string | number)[]) => {
      dispatch(HomeActions.changeSelectedCity(val as string[]));
    },
    [dispatch]
  );

  const handleTimesChange = useCallback(
    (start?: Date, end?: Date) => {
      dispatch(
        HomeActions.changeTimes(
          `${dayjs(start).format("YYYY-MM-DD")}~${dayjs(end).format(
            "YYYY-MM-DD"
          )}`
        )
      );
    },
    [dispatch]
  );

  return (
    <div className="home">
      {refreshLoading && (
        <div className="rotate_icon">
          <BsArrowRepeat className="rotate_icon" />
          <div>loading</div>
        </div>
      )}
      <div className="home_container" ref={homeRef}>
        <Header />
        <Search
          cities={cities}
          times={times}
          selectedCity={selectedCity}
          handleCityChange={handleCityChange}
          handleTimesChange={handleTimesChange}
        />
        <Hot hots={hots} />
      </div>
    </div>
  );
};

Home.loadData = (store: ServerStore, match: ServerMatch) => {
  return parallel([
    store.dispatch(HomeActions.getCities()),
    store.dispatch(HomeActions.getHots()),
  ]);
};

export default Home;
