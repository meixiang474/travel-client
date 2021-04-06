import {
  useCallbackRef,
  useDebounceValue,
  useDownRefresh,
  useEffectSecond,
  useMount,
  useScrollTop,
} from "@/hooks";
import { NewDispatch, RootState, ServerStore } from "@/store";
import { ActivityIndicator } from "antd-mobile";
import { useState, useRef, ChangeEvent, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import * as SearchActions from "@/store/actions/seatch";
import qs from "qs";
import SearchList from "./components/SearchList";
import "./style.less";
import { ServerMatch } from "@/typings";
import { useLoadMore } from "@/hooks/useLoadMore";
import { BsArrowRepeat } from "react-icons/bs";
import SearchBar from "./components/SearchBar";

const Search = () => {
  const { houses, refreshLoading, count } = useSelector<
    RootState,
    RootState["search"]
  >((state) => state.search);
  const { search, state } = useLocation<{ from: string }>();
  const dispatch = useDispatch<NewDispatch>();
  const [houseName, setHouseName] = useState("");
  const [loading, setLoading] = useState(false);

  const debounceHouseName = useDebounceValue(houseName);

  const listContainerRef = useRef<HTMLDivElement>(null);

  const searchHouses = () => {
    const { code, startTime, endTime } = qs.parse(search.slice(1));
    return dispatch(
      SearchActions.searchHouses({
        startTime: new Date(startTime as string),
        endTime: new Date(endTime as string),
        cityCode: code as string,
        name: debounceHouseName,
        setLoading,
      })
    );
  };

  // ssr mount时不需要再加载数据
  useMount(() => {
    console.log(state);
    if (state && state.from === "/") {
      searchHouses();
    }
  });

  useScrollTop("searchListScrollTop", listContainerRef);

  // 上拉加载
  useLoadMore(
    listContainerRef,
    useCallbackRef(() => {
      const { code, startTime, endTime } = qs.parse(search.slice(1));
      dispatch(
        SearchActions.refreshHouses({
          startTime: new Date(startTime as string),
          endTime: new Date(endTime as string),
          cityCode: code as string,
          name: debounceHouseName,
        })
      );
    })
  );

  // 下拉刷新
  const downRefreshLoading = useDownRefresh(
    listContainerRef,
    useCallbackRef(() => {
      const { code, startTime, endTime } = qs.parse(search.slice(1));
      return dispatch(
        SearchActions.searchHouses({
          startTime: new Date(startTime as string),
          endTime: new Date(endTime as string),
          cityCode: code as string,
          name: houseName,
        })
      );
    })
  );

  // 第一次不需要再加载数据
  useEffectSecond(() => {
    searchHouses();
  }, [debounceHouseName]);

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setHouseName(e.target.value);
  }, []);

  const handleCancel = useCallback(() => {
    setHouseName("");
  }, []);

  return (
    <div className="search_page">
      <div className="search_bar">
        <SearchBar
          houseName={houseName}
          handleChange={handleChange}
          handleCancel={handleCancel}
        />
      </div>
      {downRefreshLoading && (
        <div className="rotate_icon">
          <BsArrowRepeat className="rotate_icon" />
          <div>loading</div>
        </div>
      )}
      <div className="search_list_container" ref={listContainerRef}>
        {loading ? (
          <ActivityIndicator toast />
        ) : (
          <SearchList
            houses={houses}
            refreshLoading={refreshLoading}
            hasMore={houses.length < count}
          />
        )}
      </div>
    </div>
  );
};

Search.loadData = (store: ServerStore, match: ServerMatch) => {
  const { query } = match;
  return store.dispatch(
    SearchActions.searchHouses({
      startTime: new Date(query.startTime as string),
      endTime: new Date(query.endTime as string),
      cityCode: query.code,
      name: "",
    })
  );
};

export default Search;
