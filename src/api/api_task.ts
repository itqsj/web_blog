import http from './index';
import { MovePanelParams, PanelInt, MoveTaskParams } from '@/types/task';
import { DataInt } from '@/types/index';
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
