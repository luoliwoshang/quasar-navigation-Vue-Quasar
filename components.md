# 组件均通过 v-if 统一进行销毁 组件通过 hide 事件发出销毁请求

# 工作台组件会接受 workbench_back 事件 返回工作台首页

# 工作台中的每个组件都需要接收 backComponentsMain 事件，用于返回组件中主要部分，比如 plane 组件中接受此事件时，需要返回到主要游玩区域

# 工作台中的每个组件都需要发送 changeWorkBenchMainHeight 用于设置 workbench 组件的高度过渡
