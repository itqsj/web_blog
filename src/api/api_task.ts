import http from './index';
import type {
  MovePanelParams,
  PanelInt,
  MoveTaskParams,
  AddTaskParams,
  TaskInt,
  IdParamsInt,
  EditTaskParams,
} from '@/types/task';
import type { DataInt } from '@/types/index';
// 面板列表
export function panelList() {
  return http<DataInt<PanelInt[]>>({
    url: '/api/task/panel_list',
  });
}

// 面板移动
export function panelMove(data: MovePanelParams) {
  return http({
    url: '/api/task/panel_move',
    data,
  });
}

// task
export function taskMove(data: MoveTaskParams) {
  return http({
    url: '/api/task/move',
    data,
  });
}

// task
export function taskAdd(data: AddTaskParams) {
  return http({
    url: '/api/task/add',
    data,
  });
}

// task编辑
export function taskEdit(data: EditTaskParams) {
  return http({
    url: '/api/task/edit',
    data,
  });
}

// task详情
export function taskDetail(data: IdParamsInt) {
  return http<TaskInt>({
    url: '/api/task/detail',
    data,
  });
}

// task删除
export function taskDel(data: IdParamsInt) {
  return http({
    url: '/api/task/del',
    data,
  });
}
