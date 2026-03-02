import {
  createApp,
  defineComponent as vueDefineComponent,
  h,
  reactive,
} from "vue";
import { ElRadioGroup, ElRadio } from "element-plus";
import "element-plus/es/components/radio/style/css";
import "element-plus/es/components/radio-group/style/css";
import { defineComponent } from "@x-lang/core";

interface RadioData {
  readonly options: readonly string[];
  readonly selected: string;
}

export const radio = defineComponent<RadioData>("radio", {
  setup: (args) => ({
    options: args[0] as string[],
    selected: (args[1] as string) ?? "",
  }),

  render(data, container, ctx) {
    const state = reactive({ selected: data.selected });

    const RadioWrapper = vueDefineComponent({
      setup() {
        return () =>
          h(
            ElRadioGroup,
            {
              modelValue: state.selected,
              "onUpdate:modelValue": (val: string | number | boolean | undefined) => {
                const strVal = String(val ?? "");
                state.selected = strVal;
                ctx.emit("change", strVal);
              },
            },
            () =>
              data.options.map((opt) =>
                h(ElRadio, { value: opt }, () => opt),
              ),
          );
      },
    });

    const mountEl = document.createElement("div");
    mountEl.style.padding = "8px 0";
    container.appendChild(mountEl);
    const vueApp = createApp(RadioWrapper);
    vueApp.mount(mountEl);

    return {
      dispose() {
        vueApp.unmount();
        mountEl.remove();
      },
      update(newData: RadioData) {
        state.selected = newData.selected;
      },
    };
  },
});
