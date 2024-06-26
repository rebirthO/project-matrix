import type { RapidDataDictionary } from "@ruiapp/rapid-extension";

export default {
  code: "MomMpsScheduleState",
  name: "主计划规划状态",
  valueType: "string",
  level: "app",
  entries: [
    { name: "未计划", value: "unscheduled" },
    { name: "计划中", value: "scheduling", color: "orange" },
    { name: "已计划", value: "scheduled", color: "green" },
    { name: "已取消", value: "canceled", color: "red" },
  ],
} satisfies RapidDataDictionary;
