import { requestWithToken } from "@/utils/request";

/**
 *  加载评论列表信息
 * @returns {AxiosPromise}
 */

export function getAdminCommentList() {
  return requestWithToken("/comment/getAdminCommentList", "get");
}
/**
 *  搜索评论
 * @returns {AxiosPromise}
 */

export function getAdminSearchComment(searchInput) {
  return requestWithToken("/comment/getAdminSearchComment", "get", {
    searchInput,
  });
}

/**
 *  通过电影评论
 * @param comment_id
 * @returns {AxiosPromise}
 */
export function getAdminPassComment(comment_id) {
  return requestWithToken("/comment/getAdminPassComment", "post", {
    comment_id,
  });
}

/**
 *  删除评论信息
 * @returns {AxiosPromise}
 */

export function getAdminDeleteComment(comment_id) {
  return requestWithToken("/comment/getAdminDeleteComment", "post", {
    comment_id,
  });
}
