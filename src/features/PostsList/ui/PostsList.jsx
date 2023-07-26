import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncfetchPosts } from "../modal/services/asyncfetchPosts";
import { usePosts } from "../../../shared/lib/hooks/usePosts";
import { PaginationList } from "../../../entities/PaginationList/PaginationList";
import { useSearchParams } from "react-router-dom";
import cls from "./PostsList.module.css";
import { MyLoader } from "../../../shared/ui/MyLoader/MyLoader";

export function PostsList () {

    const [limit, setLimit] = useState(10);

    const [page, setPage] = useState(1);

    const [paramsSearch, setParamsSearch] = useSearchParams();

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(asyncfetchPosts());
    }, [dispatch]);

    useEffect(() => {
          setParamsSearch({
            q: page,
          }); 
     }, [page, setParamsSearch]);

    const posts = useSelector(state => state.posts.posts);

    const isLoading = useSelector(state => state.posts.isLoading);

    const searchQuery = useSelector(state => state.search.text);
    
    const seachedPosts = usePosts(
        posts,
        searchQuery
    );

    function changePage(p) {
        setPage(p);
    };

    function changePageForward(p) {
        if(page < limit) setPage(p => p + 1);
    };

    function changePageBack(p) {
        if(page > 1) setPage(p => p - 1);
    };

    if(isLoading) {
        return (
            <div className={cls.loaderBox}>
                <MyLoader/>
            </div>
        )
    };

    return (
        <div>
            <div className={cls.sortBox}>
                <div className={cls.sortBoxItem}>ID</div>
                <div className={cls.sortBoxItem}>Заголовок <span className={cls.sortBoxIcon}></span></div>
                <div className={cls.sortBoxItem}>Описание</div>
            </div>
                {seachedPosts.slice((page - 1) * limit, page * limit).map((post) => (
                     <div key={post.id}
                     className={cls.container}>
                     <div className={cls.item_id}>{post.id}</div>
                     <div className={cls.item}>{post.title}</div>
                     <div className={cls.item}>{post.body}</div>
                 </div>
                ))}
            <PaginationList changePage={changePage} 
                page={page} 
                totalPages={seachedPosts.length} 
                limit={limit}
                changePageForward={changePageForward}
                changePageBack={changePageBack}
            />
        </div>
    );
};
