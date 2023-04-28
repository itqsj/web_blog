import type { User, TeamInt } from '@/types/user';

export interface PanelInt {
  name: string;
  _id: string;
  sort: number;
  team_id: string;
  type: 1 | 2 | 3 | 4; //1 待执行 2.进行中 3已完成 4需复习
  tasks: TaskInt[];
}

export type AddTaskParams = Pick<
  TaskInt,
  'name' | 'needTime' | 'img' | 'priority' | 'content'
>;

export type EditTaskParams = AddTaskParams & Pick<TaskInt, '_id'>;

export type IdParamsInt = Pick<TaskInt, '_id'>;

export interface TaskInt {
  _id: string;
  name: string;
  sort: number;
  panel_id: string;
  team_id: string;
  img: string;
  usageTime: Array<number[]>;
  completeTime?: number;
  content: string;
  needTime: number;
  priority: keyof [1, 2, 3];
  creator: string;
  creator_at: number;
  user?: User;
  team?: TeamInt;
}

export type TaskTimeInt = Pick<TaskInt, 'usageTime' | 'needTime'>;

// 移动改变
export interface DragChange<T> {
  moved: {
    newIndex: number;
    oldIndex: number;
    element: T;
  };
  added: {
    newIndex: number;
    element: T;
  };
  removed: {
    oldIndex: number;
    element: T;
  };
}

// 移动请求参数
export type MovePanelParams = Omit<PanelInt, 'type' | 'tasks'>;

export interface MoveTaskParams {
  team_id: string;
  type: keyof [1, 2];
  // data: Pick<TaskInt, '_id' | 'sort' | 'panel_id'>;
  data: string;
  startTime?: number;
  needTime?: number;
}
