import { createApp } from "vue";
import { defineComponent } from "@x-lang/core";
import type { ComponentDefinition } from "@x-lang/core";
import type { SkeletonContext } from "@x-lang/core";
import { defineVueComponent } from "./_define-vue-component.js";
import {
  buttonSetup,
  alertSetup,
  radioSetup,
  progressSetup,
  tagSetup,
  statisticSetup,
  descriptionsSetup,
  resultSetup,
  rateSetup,
  cardSetup,
  tableSetup,
  type RenderTableData,
} from "./_setups.js";

import ElementButtonView from "./element/ButtonView.vue";
import ElementAlertView from "./element/AlertView.vue";
import ElementTableView from "./element/TableView.vue";
import ElementRadioView from "./element/RadioView.vue";
import ElementProgressView from "./element/ProgressView.vue";
import ElementTagView from "./element/TagView.vue";
import ElementStatisticView from "./element/StatisticView.vue";
import ElementDescriptionsView from "./element/DescriptionsView.vue";
import ElementResultView from "./element/ResultView.vue";
import ElementRateView from "./element/RateView.vue";
import ElementCardView from "./element/CardView.vue";

import ArcoButtonView from "./arco/ButtonView.vue";
import ArcoAlertView from "./arco/AlertView.vue";
import ArcoTableView from "./arco/TableView.vue";
import ArcoRadioView from "./arco/RadioView.vue";
import ArcoProgressView from "./arco/ProgressView.vue";
import ArcoTagView from "./arco/TagView.vue";
import ArcoStatisticView from "./arco/StatisticView.vue";
import ArcoDescriptionsView from "./arco/DescriptionsView.vue";
import ArcoResultView from "./arco/ResultView.vue";
import ArcoRateView from "./arco/RateView.vue";
import ArcoCardView from "./arco/CardView.vue";

import AntdButtonView from "./antd/ButtonView.vue";
import AntdAlertView from "./antd/AlertView.vue";
import AntdTableView from "./antd/TableView.vue";
import AntdRadioView from "./antd/RadioView.vue";
import AntdProgressView from "./antd/ProgressView.vue";
import AntdTagView from "./antd/TagView.vue";
import AntdStatisticView from "./antd/StatisticView.vue";
import AntdDescriptionsView from "./antd/DescriptionsView.vue";
import AntdResultView from "./antd/ResultView.vue";
import AntdRateView from "./antd/RateView.vue";
import AntdCardView from "./antd/CardView.vue";

import ButtonSkeleton from "./skeletons/ButtonSkeleton.vue";
import AlertSkeleton from "./skeletons/AlertSkeleton.vue";
import TableSkeleton from "./skeletons/TableSkeleton.vue";
import RadioSkeleton from "./skeletons/RadioSkeleton.vue";
import ProgressSkeleton from "./skeletons/ProgressSkeleton.vue";
import TagSkeleton from "./skeletons/TagSkeleton.vue";
import StatisticSkeleton from "./skeletons/StatisticSkeleton.vue";
import DescriptionsSkeleton from "./skeletons/DescriptionsSkeleton.vue";
import ResultSkeleton from "./skeletons/ResultSkeleton.vue";
import RateSkeleton from "./skeletons/RateSkeleton.vue";
import CardSkeleton from "./skeletons/CardSkeleton.vue";

export type UILib = "element" | "arco" | "antd";

interface ViewMap {
  button: typeof ElementButtonView;
  alert: typeof ElementAlertView;
  table: typeof ElementTableView;
  radio: typeof ElementRadioView;
  progress: typeof ElementProgressView;
  tag: typeof ElementTagView;
  statistic: typeof ElementStatisticView;
  descriptions: typeof ElementDescriptionsView;
  result: typeof ElementResultView;
  rate: typeof ElementRateView;
  card: typeof ElementCardView;
}

const elementViews: ViewMap = {
  button: ElementButtonView,
  alert: ElementAlertView,
  table: ElementTableView,
  radio: ElementRadioView,
  progress: ElementProgressView,
  tag: ElementTagView,
  statistic: ElementStatisticView,
  descriptions: ElementDescriptionsView,
  result: ElementResultView,
  rate: ElementRateView,
  card: ElementCardView,
};

const arcoViews: ViewMap = {
  button: ArcoButtonView,
  alert: ArcoAlertView,
  table: ArcoTableView,
  radio: ArcoRadioView,
  progress: ArcoProgressView,
  tag: ArcoTagView,
  statistic: ArcoStatisticView,
  descriptions: ArcoDescriptionsView,
  result: ArcoResultView,
  rate: ArcoRateView,
  card: ArcoCardView,
};

const antdViews: ViewMap = {
  button: AntdButtonView,
  alert: AntdAlertView,
  table: AntdTableView,
  radio: AntdRadioView,
  progress: AntdProgressView,
  tag: AntdTagView,
  statistic: AntdStatisticView,
  descriptions: AntdDescriptionsView,
  result: AntdResultView,
  rate: AntdRateView,
  card: AntdCardView,
};

const viewMap: Record<UILib, ViewMap> = {
  element: elementViews,
  arco: arcoViews,
  antd: antdViews,
};

const skeletonMap = {
  button: ButtonSkeleton,
  alert: AlertSkeleton,
  table: TableSkeleton,
  radio: RadioSkeleton,
  progress: ProgressSkeleton,
  tag: TagSkeleton,
  statistic: StatisticSkeleton,
  descriptions: DescriptionsSkeleton,
  result: ResultSkeleton,
  rate: RateSkeleton,
  card: CardSkeleton,
};

function createTableDef(
  tableView: ViewMap["table"],
  tableSkeleton: typeof TableSkeleton,
): ComponentDefinition<RenderTableData> {
  return defineComponent<RenderTableData>("table", {
    setup: tableSetup,
    render(data, container) {
      const mountEl = document.createElement("div");
      container.appendChild(mountEl);
      const vueApp = createApp(tableView, { columns: data.columns });
      vueApp.mount(mountEl);
      return {
        dispose() {
          vueApp.unmount();
          mountEl.remove();
        },
      };
    },
    skeleton(container: HTMLElement, ctx: SkeletonContext) {
      const mountEl = document.createElement("div");
      container.appendChild(mountEl);
      const vueApp = createApp(tableSkeleton, {
        content: ctx.content,
        variables: ctx.variables,
      });
      vueApp.mount(mountEl);
      return {
        dispose() {
          vueApp.unmount();
          mountEl.remove();
        },
      };
    },
  });
}

export function createComponents(lib: UILib): ComponentDefinition[] {
  const views = viewMap[lib];
  return [
    defineVueComponent("button", {
      setup: buttonSetup,
      component: views.button,
      skeleton: skeletonMap.button,
    }),
    defineVueComponent("alert", {
      setup: alertSetup,
      component: views.alert,
      skeleton: skeletonMap.alert,
    }),
    defineVueComponent("radio", {
      setup: radioSetup,
      component: views.radio,
      skeleton: skeletonMap.radio,
    }),
    defineVueComponent("progress", {
      setup: progressSetup,
      component: views.progress,
      skeleton: skeletonMap.progress,
    }),
    defineVueComponent("tag", {
      setup: tagSetup,
      component: views.tag,
      skeleton: skeletonMap.tag,
    }),
    defineVueComponent("statistic", {
      setup: statisticSetup,
      component: views.statistic,
      skeleton: skeletonMap.statistic,
    }),
    defineVueComponent("descriptions", {
      setup: descriptionsSetup,
      component: views.descriptions,
      skeleton: skeletonMap.descriptions,
    }),
    defineVueComponent("result", {
      setup: resultSetup,
      component: views.result,
      skeleton: skeletonMap.result,
    }),
    defineVueComponent("rate", {
      setup: rateSetup,
      component: views.rate,
      skeleton: skeletonMap.rate,
    }),
    defineVueComponent("card", {
      setup: cardSetup,
      component: views.card,
      skeleton: skeletonMap.card,
    }),
    createTableDef(views.table, skeletonMap.table),
  ];
}
