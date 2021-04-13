import Banner from "./components/Banner";
import Footer from "./components/Footer";
import Info from "./components/Info";
import List from "./components/List";
import "./style.less";
import { useCallback, useRef, useState, useMemo } from "react";
import { useCallbackRef, useDownRefresh, useLoadMore, useMount } from "@/hooks";
import { DownRefreshLoading, Header } from "@/components";
import { useDispatch, useSelector } from "react-redux";
import { NewDispatch, RootState, ServerStore } from "@/store";
import * as HouseActions from "@/store/actions/house";
import { useHistory, useLocation } from "react-router";
import qs from "qs";
import { cleanObject, parallel } from "@/utils";
import { ActivityIndicator, Toast } from "antd-mobile";
import { ServerMatch } from "@/typings";

const House = () => {
  const dispatch = useDispatch<NewDispatch>();
  const {
    houseInfo,
    comments,
    commentsCount,
    selfComment,
    orderStatus,
  } = useSelector<RootState, RootState["house"]>((state) => state.house);
  const history = useHistory();
  const { search, state } = useLocation<{ from: string; houseFrom: string }>();
  const containerRef = useRef<HTMLDivElement>(null);
  const query = useMemo(() => cleanObject(qs.parse(search.slice(1))), [search]);

  const [pageLoading, setPageLoading] = useState(false);
  const [refreshLoading, setRefreshLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const downRefreshLoading = useDownRefresh(containerRef, () => {
    return fetchData();
  });

  const fetchData = () => {
    setPageLoading(true);
    return parallel([
      dispatch(HouseActions.getHouseInfo(query.id)),
      dispatch(HouseActions.getComments(query.id)),
      dispatch(HouseActions.getOrderStatus(query.id)),
      dispatch(HouseActions.getSelfComment(query.id)),
    ]).then(resolveFetchFail);
  };

  const resolveFetchFail = (val: any[]) => {
    setPageLoading(false);
    if (val[0]) {
      Toast.fail("获取民宿信息失败", 1);
    } else if (val[1]) {
      Toast.fail("获取评论列表失败", 1);
    }
  };

  console.log(orderStatus, selfComment);

  useLoadMore(
    containerRef,
    useCallbackRef(() => {
      if (refreshLoading || commentsCount === comments.length) {
        return;
      }
      setRefreshLoading(true);
      dispatch(HouseActions.refreshComments(query.id)).then(() => {
        setRefreshLoading(false);
      });
    })
  );

  useMount(() => {
    fetchData();
  });

  const addOrder = useCallback(() => {}, []);

  const addComment = useCallback(() => {
    dispatch(HouseActions.getComments(query.id)).then(() => {
      (containerRef.current as HTMLElement).scrollTop = 234;
    });
  }, []);

  const handleBack = useCallback(() => {
    history.push(state?.from || state?.houseFrom || "/search", {
      from: "/house",
    });
  }, [history, state]);

  return (
    <div className="house">
      <Header onBack={handleBack} title="民宿详情" />
      <div className="house_main">
        <DownRefreshLoading downRefreshLoading={downRefreshLoading} />
        <div className="house_container" ref={containerRef}>
          {pageLoading ? (
            <ActivityIndicator toast />
          ) : (
            <>
              <Banner images={houseInfo?.images || []} />
              <Info
                houseInfo={houseInfo || {}}
                orderStatus={orderStatus}
                setModalVisible={setModalVisible}
                addOrder={addOrder}
              />
              <List
                hasMore={commentsCount > comments.length}
                comments={comments}
                refreshLoading={refreshLoading}
              />
            </>
          )}
        </div>
      </div>
      <Footer
        addComment={addComment}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        selfComment={selfComment}
      />
    </div>
  );
};

House.loadDada = (store: ServerStore, match: ServerMatch) => {
  return parallel([
    store.dispatch(HouseActions.getHouseInfo(match.query.id)),
    store.dispatch(HouseActions.getComments(match.query.id)),
    store.dispatch(HouseActions.getSelfComment(match.query.id)),
    store.dispatch(HouseActions.getOrderStatus(match.query.id)),
  ]);
};

export default House;
