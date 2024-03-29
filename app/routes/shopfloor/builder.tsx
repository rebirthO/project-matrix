import { Framework, Page } from "@ruiapp/move-style";
import type { PageConfig, RockConfig, RockEvent } from "@ruiapp/move-style";
import { Rui } from "@ruiapp/react-renderer";
import { Rui as RuiRock, ErrorBoundary, Show, HtmlElement, Anchor, Box, Label, List, Scope, Text } from "@ruiapp/react-rocks";
import AntdExtension from "@ruiapp/antd-extension";
import MonacoExtension from "@ruiapp/monaco-extension";
import DesignerExtension, { DesignerStore, DesignerUtility } from "@ruiapp/designer-extension";
import RapidExtension, { rapidAppDefinition, RapidExtensionSetting } from '@ruiapp/rapid-extension';
import { useMemo } from "react";
import _, { first } from "lodash";
import { redirect, type LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import type { RapidPage, RapidEntity, RapidDataDictionary } from "@ruiapp/rapid-extension";
import qs from "qs";

import dataDictionaryModels from "~/_definitions/meta/data-dictionary-models";
import entityModels from "~/_definitions/meta/entity-models";

import AppExtension from "~/app-extension/mod";
import LinkshopExtension from "~/linkshop-extension/mod";
import ShopfloorExtension from "~/shopfloor-extension/mod";

import styles from "antd/dist/antd.css";
import rapidService from "~/rapidService";

import { Avatar, Dropdown,  PageHeader } from "antd";
import type { MenuProps } from "antd";
import { ExportOutlined, UserOutlined } from "@ant-design/icons";
import { ShopfloorApp } from "~/_definitions/meta/entity-types";

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

const framework = new Framework();

framework.registerExpressionVar("_", _);
framework.registerExpressionVar("qs", qs);

framework.registerComponent(RuiRock);
framework.registerComponent(ErrorBoundary);
framework.registerComponent(Show);
framework.registerComponent(HtmlElement);
framework.registerComponent(Scope);
framework.registerComponent(Text);

framework.registerComponent(Anchor);
framework.registerComponent(Box);
framework.registerComponent(Label);
framework.registerComponent(List);

framework.loadExtension(AntdExtension);
framework.loadExtension(MonacoExtension);
framework.loadExtension(RapidExtension);
framework.loadExtension(DesignerExtension);
framework.loadExtension(AppExtension);
framework.loadExtension(LinkshopExtension);
framework.loadExtension(ShopfloorExtension);

RapidExtensionSetting.setDefaultRendererPropsOfRendererType("rapidCurrencyRenderer", {
  usingThousandSeparator: true,
  decimalPlaces: 2,
  currencyCode: 'CNY',
});


export interface GenerateRuiPageConfigOption<TPage = RapidPage> {
  sdPage: TPage;
  entities: RapidEntity[];
  dataDictionaries: RapidDataDictionary[];
}

export function generateRuiPage(option: GenerateRuiPageConfigOption) {
  const { sdPage } = option;
  const viewRocks = (sdPage.view ? (sdPage.view.length ? sdPage.view : [sdPage.view]) : []) as RockConfig[];

  const ruiPageConfig: PageConfig = {
    $id: sdPage.code,
    stores: sdPage.stores || [],
    view: viewRocks.map((child, index) => {
      return {
        $type: "box",
        $id: `page-section-${index + 1}`,
        className: "rui-page-section",
        children: child,
      }
    }),
    eventSubscriptions: sdPage.eventSubscriptions,
  };

  return ruiPageConfig;
}



export type Params = {
  code: string;
}

type ViewModel = {
  myProfile: any;
  myAllowedActions: string[];
  pageAccessAllowed: boolean;
  appId: string;
  shopfloorApp: ShopfloorApp;
  entities: RapidEntity[];
  dataDictionaries: RapidDataDictionary[];
}

export const loader: LoaderFunction = async ({ request, params }) => {
  const myProfile = (await rapidService.get(`me`, {
    headers: {
      "Cookie": request.headers.get("Cookie"),
    }
  })).data?.user;

  if (!myProfile) {
    return redirect("/signin");
  }

  const myAllowedActions = (await rapidService.get(`app/listMyAllowedSysActions`, {
    headers: {
      "Cookie": request.headers.get("Cookie"),
    }
  })).data;

  let { searchParams } = new URL(request.url);
  let appId = searchParams.get("appId");
  const shopfloorApps = (await rapidService.post(`shopfloor/shopfloor_apps/operations/find`, {
      filters: [
        {
          field: "id",
          operator:"eq",
          value: appId,
        }
      ],
      properties: ["id", "name", "content"],
    },
    {
      headers: {
        "Cookie": request.headers.get("Cookie"),
      },
    }
    )).data.list;

    const shopfloorApp = first(shopfloorApps);

  return {
    myProfile,
    myAllowedActions,
    appId,
    shopfloorApp,
    entities: entityModels,
    dataDictionaries: dataDictionaryModels,
    pageAccessAllowed: true,
  }
}


export default function Index() {
  const viewModel = useLoaderData<ViewModel>();
  const { myProfile, myAllowedActions, pageAccessAllowed, appId, shopfloorApp, entities, dataDictionaries } = viewModel;

  framework.registerExpressionVar('me', {
    profile: myProfile,
    allowedActions: myAllowedActions,
  });

  rapidAppDefinition.setAppDefinition({
    entities,
    dataDictionaries,
  })

  const page = useMemo(() => {
    let ruiPageConfig: PageConfig | undefined;
    if (!pageAccessAllowed) {
      ruiPageConfig = {
        view: [
          { $type: "text", text: `You are not allowed to visit this page.`}
        ]
      }
      return new Page(framework, ruiPageConfig);
    }

    if (!shopfloorApp) {
      ruiPageConfig = {
        view: [
          { $type: "text", text: `Shopfloor app with id '${appId}' was not found.`}
        ]
      }
      return new Page(framework, ruiPageConfig);
    }

    const canvasPageConfig: PageConfig = {
      "$id": "canvasPage",
      "stores": [
        {
          name: "viewModel",
          type: "constant",
          data: {
            greet: " Hello World!",
            textTop1: "300px",
            textTop2: "400px",
            brandColor: "#c038ff",
          }
        },
      ],
      "view": [
        {
          $type: "text",
          text: "Hello",
        }
      ]
    }

    ruiPageConfig = {
      $id: "designerPage",
      stores: [
        {
          type: "designerStore",
          name: "designerStore",
          pageConfig: canvasPageConfig,
        }
      ],
      view: [
        {
          $type: "antdLayout",
          children: [
            {
              $type: "antdLayoutSider",
              theme: "light",
              children: [
                {
                  $type: "designerToolbox",
                  style: {
                    height: "100vh",
                    overflow: "auto",
                  }
                },
              ]
            },
            {
              $type: "antdLayout",
              children: [
                {
                  $type: "antdLayoutSider",
                  theme: "light",
                  style: {
                    backgroundColor: "#eee",
                  },
                  children: [
                    {
                      $type: "htmlElement",
                      htmlTag: "div",
                      children: [
                        {
                          $type: "antdButton",
                          icon: {
                            $type: "antdIcon",
                            name: "ScissorOutlined",
                          },
                          onClick: [
                            {
                              $action: "script",
                              script: (event: RockEvent) => {
                                const designerPage = event.page;
                                const designerStore = designerPage.getStore<DesignerStore>("designerStore");
                                if (designerStore.selectedSlotName) {
                                  return;
                                }
    
                                DesignerUtility.sendDesignerCommand(designerPage, designerStore, {
                                  name: "cutComponents",
                                  payload: {
                                    componentIds: [designerStore.selectedComponentId],
                                  }
                                });
                              },
                            }
                          ]
                        },
                        {
                          $type: "antdButton",
                          icon: {
                            $type: "antdIcon",
                            name: "CopyOutlined",
                          },
                          onClick: [
                            {
                              $action: "script",
                              script: (event: RockEvent) => {
                                const designerPage = event.page;
                                const designerStore = designerPage.getStore<DesignerStore>("designerStore");
                                if (designerStore.selectedSlotName) {
                                  return;
                                }
    
                                DesignerUtility.sendDesignerCommand(designerPage, designerStore, {
                                  name: "copyComponents",
                                  payload: {
                                    componentIds: [designerStore.selectedComponentId],
                                  }
                                });
                              },
                            }
                          ]
                        },
                        {
                          $type: "antdButton",
                          icon: {
                            $type: "antdIcon",
                            name: "SnippetsOutlined",
                          },
                          onClick: [
                            {
                              $action: "script",
                              script: (event: RockEvent) => {
                                const designerPage = event.page;
                                const designerStore = designerPage.getStore<DesignerStore>("designerStore");
                                DesignerUtility.sendDesignerCommand(designerPage, designerStore, {
                                  name: "pasteComponents",
                                  payload: {
                                    parentComponentId: designerStore.selectedComponentId,
                                    slotName: designerStore.selectedSlotName,
                                  }
                                });
                              },
                            }
                          ]
                        },
                        {
                          $type: "antdButton",
                          icon: {
                            $type: "antdIcon",
                            name: "DeleteOutlined",
                          },
                          onClick: [
                            {
                              $action: "script",
                              script: (event: RockEvent) => {
                                const designerPage = event.page;
                                const designerStore = designerPage.getStore<DesignerStore>("designerStore");
                                if (designerStore.selectedSlotName) {
                                  return;
                                }
    
                                DesignerUtility.sendDesignerCommand(designerPage, designerStore, {
                                  name: "removeComponents",
                                  payload: {
                                    componentIds: [designerStore.selectedComponentId],
                                  }
                                });
                              },
                            }
                          ]
                        },
                      ],
                    },
                    {
                      $type: "designerComponentTree",
                      style: {
                        height: "calc(100vh - 72px)",
                        overflow: "auto",
                      },
                      $exps: {
                        designingPage: "$stores.designerStore.page",
                      }
                    },
                  ],
                },
                {
                  $type: "antdLayoutContent",
                  children: [
                    {
                      $type: "antdLayout",
                      children: [
                        {
                          $type: "antdLayoutContent",
                          children: [
                            {
                              $type: "htmlElement",
                              $id: "previewIFrame",
                              htmlTag: "iframe",
                              attributes: {
                                id: "previewIFrame",
                                width: "100%",
                                height: "100%",
                                frameBorder: "0",
                                src: "/shopfloor/design-preview",
                              },
                              style: {
                                display: "block",
                              },
                            }
                          ]
                        },
                        {
                          $type: "antdLayoutSider",
                          width: 300,
                          style: {
                            height: "100vh",
                            overflow: "auto",
                            background: "white",
                            padding: "10px",
                          },
                          children: [
                            {
                              $type: "designerComponentPropertiesPanel",
                              $exps: {
                                designingPage: "$stores.designerStore.page",
                                selectedComponentId: "$stores.designerStore.selectedComponentId",
                              }
                            },
                          ]
                        }
                      ]
                    },
                  ]
                }
              ]
            },
          ],
        },
      ],
    };
    return new Page(framework, ruiPageConfig);
  }, [appId, shopfloorApp, pageAccessAllowed]);

  const profileMenuItems: MenuProps['items'] = [
    {
      key: "signout",
      label: <a href="/api/signout">登出</a>,
      icon: <ExportOutlined rev={undefined} />
    }
  ]

  return <>
    <PageHeader
      title={shopfloorApp?.name}
      extra={
        <div>
            <Dropdown menu={{items: profileMenuItems}}>
              <div className="rui-current-user-indicator">
                <Avatar icon={<UserOutlined rev={undefined} />} />
                {"" + myProfile?.name}
              </div>
            </Dropdown>
        </div>
      }
    >
    </PageHeader>
    <Rui framework={framework} page={page} />
  </>
}