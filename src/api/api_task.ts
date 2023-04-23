import http from './index';

import { PanelInt } from '@/types/task';

// 面板列表
export function panelList() {
  return http({
    url: '/api/task/panel_list',
  });
}

// 面板移动
export function panelMove(data: PanelInt) {
  return http({
    url: '/api/task/panel_move',
    data,
  });
}
