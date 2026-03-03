import type { ComponentRenderer, Disposable } from "@x-lang/render";
import MarkdownIt from "markdown-it";

const md = new MarkdownIt({
  html: false,
  breaks: true,
  linkify: true,
});

export class MarkdownRenderer implements ComponentRenderer<string> {
  render(content: string, container: HTMLElement): Disposable {
    const block = document.createElement("div");
    block.className = "markdown-body";
    block.innerHTML = md.render(content);

    container.appendChild(block);
    return { dispose: () => block.remove() };
  }
}
