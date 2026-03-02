import type { OutputSegment } from "@x-lang/interpreter";
import { ZValue, ZRenderable } from "@x-lang/interpreter";
import type {
  ComponentFactory,
  ComponentHandle,
  ComponentRenderer,
  Disposable,
  EventCallback,
  PendingData,
  RenderContext,
} from "./types.js";

export interface ComponentInstance {
  readonly kind: string;
  readonly index: number;
  readonly handle: ComponentHandle;
}

const IDENTIFIER_RE =
  /^[a-zA-Z_$\u4e00-\u9fff\u3400-\u4dbf][a-zA-Z0-9_$\u4e00-\u9fff\u3400-\u4dbf]*/;

export class RenderEngine {
  private factory: ComponentFactory;
  private disposables: Disposable[] = [];
  private instances: ComponentInstance[] = [];
  private eventCallback: EventCallback | undefined;
  private kindCounters = new Map<string, number>();
  private skeletonFactories = new Map<
    string,
    () => ComponentRenderer<PendingData>
  >();

  constructor(factory: ComponentFactory) {
    this.factory = factory;
  }

  setFactory(factory: ComponentFactory): void {
    this.factory = factory;
  }

  setEventCallback(cb: EventCallback): void {
    this.eventCallback = cb;
  }

  registerSkeleton(
    name: string,
    factory: () => ComponentRenderer<PendingData>,
  ): void {
    this.skeletonFactories.set(name, factory);
  }

  getInstances(kind?: string): readonly ComponentInstance[] {
    if (!kind) return this.instances;
    return this.instances.filter((i) => i.kind === kind);
  }

  renderSegments(
    segments: readonly OutputSegment[],
    errors: readonly { message: string }[],
    container: HTMLElement,
  ): void {
    this.disposeAll();
    container.innerHTML = "";

    if (errors.length > 0) {
      const errDiv = document.createElement("div");
      errDiv.className = "render-errors";
      for (const e of errors) {
        const item = document.createElement("div");
        item.className = "render-error-item";
        item.textContent = e.message;
        errDiv.appendChild(item);
      }
      container.appendChild(errDiv);
    }

    for (const segment of segments) {
      switch (segment.type) {
        case "markdown":
          this.renderMarkdown(segment.content, container);
          break;
        case "codeblock":
          this.renderCodeBlock(segment.language, segment.content, container);
          break;
        case "pending":
          this.renderPending(segment.language, segment.content, container);
          break;
        case "scope":
          this.renderScope(segment.result, container);
          break;
      }
    }
  }

  private renderMarkdown(content: string, container: HTMLElement): void {
    const wrapper = document.createElement("div");
    wrapper.className = "render-segment render-markdown";
    container.appendChild(wrapper);

    const renderer = this.factory.createMarkdownRenderer();
    const disposable = renderer.render(content, wrapper);
    this.disposables.push(disposable);
  }

  private renderCodeBlock(
    language: string,
    content: string,
    container: HTMLElement,
  ): void {
    const wrapper = document.createElement("div");
    wrapper.className = "render-segment render-codeblock";
    container.appendChild(wrapper);

    const renderer = this.factory.createCodeBlockRenderer();
    const disposable = renderer.render({ language, content }, wrapper);
    this.disposables.push(disposable);
  }

  private renderPending(
    language: string,
    content: string,
    container: HTMLElement,
  ): void {
    const componentName = this.detectComponentName(content);

    if (componentName) {
      const skeletonFactory = this.skeletonFactories.get(componentName);
      if (skeletonFactory) {
        const wrapper = document.createElement("div");
        wrapper.className = `render-segment render-pending render-pending-${componentName}`;
        container.appendChild(wrapper);

        const renderer = skeletonFactory();
        const disposable = renderer.render({ language, content }, wrapper);
        this.disposables.push(disposable);
        return;
      }
    }

    const wrapper = document.createElement("div");
    wrapper.className = "render-segment render-pending";
    container.appendChild(wrapper);

    const renderer = this.factory.createPendingRenderer();
    const disposable = renderer.render({ language, content }, wrapper);
    this.disposables.push(disposable);
  }

  private detectComponentName(content: string): string | null {
    const trimmed = content.trim();
    const match = IDENTIFIER_RE.exec(trimmed);
    return match ? match[0] : null;
  }

  private renderScope(
    result: { value: ZValue; error?: string },
    container: HTMLElement,
  ): void {
    if (result.error) {
      const errDiv = document.createElement("div");
      errDiv.className = "render-segment render-error-item";
      errDiv.textContent = result.error;
      container.appendChild(errDiv);
      return;
    }

    const value = result.value;

    if (value instanceof ZRenderable) {
      const renderer = this.factory.createRenderer(value.kind);
      if (renderer) {
        const wrapper = document.createElement("div");
        wrapper.className = `render-segment render-${value.kind}`;
        container.appendChild(wrapper);

        const kind = value.kind;
        const ctx = this.createRenderContext(kind);
        const handle = renderer.render(value.renderData, wrapper, ctx);

        this.disposables.push(handle);
        this.trackInstance(kind, handle as ComponentHandle);
        return;
      }
    }

    const formatted = value.toString();
    const wrapper = document.createElement("div");
    wrapper.className = "render-segment render-scope";
    container.appendChild(wrapper);

    const renderer = this.factory.createMarkdownRenderer();
    const disposable = renderer.render(formatted, wrapper);
    this.disposables.push(disposable);
  }

  private createRenderContext(kind: string): RenderContext {
    return {
      emit: (event: string, payload?: unknown) => {
        this.eventCallback?.(kind, event, payload);
      },
    };
  }

  private trackInstance(kind: string, handle: ComponentHandle): void {
    const count = this.kindCounters.get(kind) ?? 0;
    this.instances.push({ kind, index: count, handle });
    this.kindCounters.set(kind, count + 1);
  }

  private disposeAll(): void {
    for (const d of this.disposables) {
      d.dispose();
    }
    this.disposables = [];
    this.instances = [];
    this.kindCounters.clear();
  }
}
