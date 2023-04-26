import http from './index';
import type { DataInt } from '@/types/index';
import type {
  AddArticleParams,
  ArticleInt,
  ArticleDatailParams,
  EditArticleParams,
  ArticleListParams,
} from '@/types/article';

export function addArticle(data: AddArticleParams) {
  return http({
    url: '/api/article/add',
    data,
  });
}

export function articleList(params: ArticleListParams) {
  return http<DataInt<ArticleInt[]>>({
    url: '/api/article/list',
    params,
    method: 'get',
  });
}

export function articleDetail(params: ArticleDatailParams) {
  return http<ArticleInt>({
    url: '/api/article/detail',
    params,
    method: 'get',
  });
}

export function articleEdit(data: EditArticleParams) {
  return http({
    url: '/api/article/edit',
    data,
  });
}

export function articleDel(data: Pick<ArticleInt, '_id'>) {
  return http({
    url: '/api/article/del',
    data,
  });
}
