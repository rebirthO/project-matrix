/**
 * 活跃/不活跃状态
 */
export type ActiveInactiveState =
  | 'active'
  | 'inactive'
  ;

/**
 * 审批状态
 */
export type ApprovalState =
  | 'uninitiated'
  | 'pending'
  | 'approving'
  | 'approved'
  | 'rejected'
  | 'revoked'
  ;

/**
 * 地点类型
 */
export type BaseLocationType =
  | 'factory'
  | 'building'
  | 'shop'
  | 'warehouse'
  | 'storageArea'
  | 'office'
  | 'lab'
  | 'gate'
  | 'other'
  ;

/**
 * 业务活动类型
 */
export type BusinessActivityKind =
  | 'approval'
  | 'cc'
  | 'comment'
  ;

/**
 * 流程活动状态
 */
export type BusinessActivityState =
  | 'pending'
  | 'finished'
  ;

/**
 * 流程申请单状态
 */
export type BusinessApplicationState =
  | 'draft'
  | 'processing'
  | 'approved'
  | 'refused'
  | 'withdrawed'
  ;

/**
 * 流程任务状态
 */
export type BusinessTaskState =
  | 'pending'
  | 'finished'
  ;

/**
 * 合同类型
 */
export type CbsContractKind =
  | 'sale'
  | 'purchase'
  | 'special'
  ;

/**
 * 合同状态
 */
export type CbsContractState =
  | 'unsigned'
  | 'fulfilling'
  | 'fulfilled'
  | 'suspended'
  | 'cancelled'
  ;

/**
 * 订单类型
 */
export type CbsOrderKind =
  | 'sale'
  | 'purchase'
  ;

/**
 * 订单状态
 */
export type CbsOrderState =
  | 'unsigned'
  | 'fulfilling'
  | 'fulfilled'
  | 'suspended'
  | 'cancelled'
  ;

/**
 * 确认状态
 */
export type ConfirmationState =
  | 'unconfirmed'
  | 'confirmed'
  ;

/**
 * 字典值类型
 */
export type DataDictionaryValueType =
  | 'string'
  | 'integer'
  ;

/**
 * 文档类型
 */
export type DocumentType =
  | 'directory'
  | 'file'
  | 'link'
  ;

/**
 * 员工状态
 */
export type EmployeeState =
  | 'normal'
  | 'disabled'
  | 'quitted'
  ;

/**
 * 启用/禁用状态
 */
export type EnabledDisabledState =
  | 'enabled'
  | 'disabled'
  ;

/**
 * 转账类型
 */
export type FinTransactionType =
  | 'in'
  | 'out'
  ;

/**
 * 表单字段类型
 */
export type FormFieldType =
  | 'text'
  | 'long'
  | 'double'
  | 'date'
  | 'datetime'
  | 'boolean'
  | 'option'
  ;

/**
 * 数据字典级别
 */
export type DataDictionaryLevel =
  | 'sys'
  | 'app'
  | 'user'
  ;

/**
 * 实体属性类型
 */
export type PropertyType =
  | 'integer'
  | 'long'
  | 'float'
  | 'double'
  | 'text'
  | 'boolean'
  | 'date'
  | 'datetime'
  | 'json'
  | 'option'
  ;

/**
 * HTTP方法
 */
export type RouteHttpMethod =
  | 'get'
  | 'post'
  | 'put'
  | 'delete'
  ;

/**
 * 路由类型
 */
export type RouteType =
  | 'RESTful'
  ;

/**
 * 设备电源状态
 */
export type MomEquipmentPowerState =
  | 'on'
  | 'off'
  ;

/**
 * 设备生产状态
 */
export type MomEquipmentProductionState =
  | 'idle'
  | 'commissioning'
  | 'processing'
  | 'fault'
  ;

/**
 * 物品状态
 */
export type MomGoodState =
  | 'normal'
  | 'splitted'
  | 'merged'
  | 'transferred'
  | 'destroied'
  ;

/**
 * 库存操作类型
 */
export type MomInventoryOperationType =
  | 'in'
  | 'out'
  | 'transfer'
  | 'organize'
  | 'adjust'
  ;

/**
 * 包内物品状态
 */
export type MomPackageGoodState =
  | 'packed'
  | 'unpacked'
  ;

/**
 * 计划执行状态
 */
export type MomProductionPlanExecutionState =
  | 'pending'
  | 'processing'
  | 'finished'
  | 'canceled'
  ;

/**
 * 计划排期状态
 */
export type MomProductionPlanScheduleState =
  | 'unscheduled'
  | 'scheduling'
  | 'scheduled'
  | 'canceled'
  ;

/**
 * 工单分配状态
 */
export type MomWorkOrderAssignmentState =
  | 'unassigned'
  | 'assigned'
  | 'canceled'
  ;

/**
 * 工单执行状态
 */
export type MomWorkOrderExecutionState =
  | 'pending'
  | 'processing'
  | 'finished'
  | 'canceled'
  ;

/**
 * 工序任务分配状态
 */
export type MomWorkTaskAssignmentState =
  | 'unassigned'
  | 'assigned'
  | 'canceled'
  ;

/**
 * 任务执行状态
 */
export type MomWorkTaskExecutionState =
  | 'pending'
  | 'processing'
  | 'finished'
  | 'canceled'
  ;

/**
 * 流转单分配状态
 */
export type MomWorkTrackAssignmentState =
  | 'unassigned'
  | 'assigned'
  | 'canceled'
  ;

/**
 * 流转单执行状态
 */
export type MomWorkTrackExecutionState =
  | 'pending'
  | 'processing'
  | 'finished'
  | 'canceled'
  ;

/**
 * 预算类型
 */
export type PmBudgetType =
  | 'in'
  | 'out'
  ;

/**
 * 里程碑状态
 */
export type PmMilestoneState =
  | 'unplanned'
  | 'planned'
  | 'inProgress'
  | 'completed'
  | 'delayed'
  | 'cancelled'
  ;

/**
 * 项目阶段状态
 */
export type PmPhaseState =
  | 'unplanned'
  | 'planned'
  | 'inProgress'
  | 'completed'
  | 'delayed'
  | 'cancelled'
  ;

/**
 * 项目阶段
 */
export type PmProjectStage =
  | 'proposal'
  | 'initialization'
  | 'planning'
  | 'executing'
  | 'closing'
  | 'archived'
  ;

/**
 * 项目状态
 */
export type PmProjectState =
  | 'active'
  | 'suspended'
  | 'closed'
  ;

/**
 * 发布状态
 */
export type PublishState =
  | 'draft'
  | 'in_review'
  | 'published'
  | 'archived'
  | 'withdrawed'
  ;

/**
 * 物理量类型
 */
export type QuantityType =
  | 'time'
  | 'length'
  | 'mass'
  | 'electric_current'
  | 'temperature'
  | 'amount_of_substance'
  | 'luminous_intensity'
  ;

/**
 * 未删除/已删除状态
 */
export type UndeletedDeletedState =
  | 'undeleted'
  | 'deleted'
  ;

/**
 * 单位类型
 */
export type UnitType =
  | 'quantity'
  | 'others'
  ;

/**
 * 用户密级
 */
export type UserSecretLevel =
  | '1'
  | '2'
  | '3'
  | '4'
  ;
