import { CateInt } from '@/types/cate';
import type { ParamsListInt } from '@/types/index';

export interface ArticleInt {
  _id: string;
  title: string;
  cate_id: string;
  content: string;
  introduce: string;
  state: '1' | '2' | '3';
  cover_img: Array<string>;
  tags: Array<string>;
  pub_time: number;
  author_id: string;
  author_name: string;
  cate?: CateInt;
}

export type AddArticleParams = Pick<
  ArticleInt,
  'title' | 'cate_id' | 'content' | 'introduce' | 'state' | 'cover_img' | 'tags'
>;

export type EditArticleParams = AddArticleParams & Pick<ArticleInt, '_id'>;

export type ArticleDatailParams = Pick<ArticleInt, '_id'>;

export type ArticleListParams = ParamsListInt &
  Pick<Partial<ArticleInt>, 'author_id'> & {
    not_id?: string;
  };
