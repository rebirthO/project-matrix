import type { TDictionaryCodes } from "../../meta/data-dictionary-codes";
import type { TEntitySingularCodes } from "../../meta/model-codes";
import type { RapidEntity } from "@ruiapp/rapid-extension";

const entity: RapidEntity<TEntitySingularCodes, TDictionaryCodes> = {
  namespace: "app",
  code: "EcmDocument",
  name: "文档",
  fields: [
    {
      code: "code",
      name: "Code",
      type: "text",
      required: true,
    },
    {
      code: "name",
      name: "名称",
      type: "text",
      required: true,
    },
    {
      code: "extName",
      name: "扩展名",
      type: "text",
      required: false,
    },
    {
      code: "title",
      name: "标题",
      type: "text",
      required: false,
    },
    {
      code: "size",
      name: "大小",
      type: "integer",
      required: true,
    },
    {
      code: "lastRevision",
      name: "最新版本",
      type: "relation",
      targetSingularCode: "ecm_revision",
      targetIdColumnName: "last_revision_id",
    },
    {
      code: "storageObject",
      name: "存储对象",
      type: "relation",
      targetSingularCode: "ecm_storage_object",
      targetIdColumnName: "storage_object_id",
    },
    {
      code: "ref",
      name: "链接",
      description: "链接指向的文档",
      type: "relation",
      targetSingularCode: "ecm_document",
      targetIdColumnName: "ref_id",
    },
    {
      code: "parent",
      name: "父文档",
      type: "relation",
      targetSingularCode: "ecm_document",
      targetIdColumnName: "parent_id",
    },
    {
      code: "publishState",
      name: "状态",
      type: "option",
      dataDictionary: "PublishState",
      required: true,
    },
  ],
};

export default entity;
