import { defineComponent } from "@x-lang/core";

interface TlinkData {
  readonly text: string;
  readonly url: string;
}

export const tlink = defineComponent<TlinkData>("tlink", {
  skeleton(container) {
    const line = document.createElement("div");
    line.className = "skeleton-line";
    line.style.width = `${100 + Math.random() * 60}px`;
    line.style.height = "14px";
    line.style.borderRadius = "2px";

    container.appendChild(line);
    return { dispose: () => line.remove() };
  },

  setup: (args) => ({
    text: args[0] as string,
    url: args[1] as string,
  }),

  render(data, container) {
    const link = document.createElement("a");
    link.href = data.url;
    link.textContent = data.text;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.className = "xlang-tlink";
    container.appendChild(link);

    return { dispose: () => link.remove() };
  },
});
