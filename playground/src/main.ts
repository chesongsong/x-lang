import * as monaco from "monaco-editor";
import editorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";
import { XLangApp } from "@x-lang/core";
import { ElementComponentFactory } from "./renderers/element-factory";
import { table } from "./components/table";
import { tlink } from "./components/tlink";
import { button } from "./components/button";
import { radio } from "./components/radio";
import { registerXLang, createXLangTheme, XLANG_ID } from "./monaco-lang";
import "./style.css";

self.MonacoEnvironment = {
  getWorker() {
    return new editorWorker();
  },
};

registerXLang();
createXLangTheme();

// ---------------------------------------------------------------------------
// 1. 创建 app，注册组件，注入数据，监听事件
// ---------------------------------------------------------------------------

const statusEl = document.getElementById("event-status");

const app = new XLangApp(new ElementComponentFactory());

app
  .use(table)
  .use(tlink)
  .use(button)
  .use(radio)
  .provide({
    用户列表: [
      { 姓名: "张三", 部门: "工程部", 薪资: 25000 },
      { 姓名: "李四", 部门: "设计部", 薪资: 22000 },
      { 姓名: "王五", 部门: "产品部", 薪资: 28000 },
      { 姓名: "赵六", 部门: "工程部", 薪资: 30000 },
    ],
    公司名: "X-Lang 科技",
    部门选项: ["全部", "工程部", "设计部", "产品部"],
    当前部门: "全部",
  })
  .on("radio", "change", (value) => {
    if (statusEl) {
      statusEl.textContent = `当前选择：${value}`;
    }

    const filter = value as string;
    const all = [
      { 姓名: "张三", 部门: "工程部", 薪资: 25000 },
      { 姓名: "李四", 部门: "设计部", 薪资: 22000 },
      { 姓名: "王五", 部门: "产品部", 薪资: 28000 },
      { 姓名: "赵六", 部门: "工程部", 薪资: 30000 },
    ];
    const filtered = filter === "全部" ? all : all.filter((u) => u.部门 === filter);

    app.provide({ 用户列表: filtered, 当前部门: filter });
    requestAnimationFrame(() => app.run(editor.getValue(), output));
  });

// ---------------------------------------------------------------------------
// 2. Editor & Layout
// ---------------------------------------------------------------------------

const editorContainer = document.getElementById("editor")!;
const output = document.getElementById("output-content")!;
const divider = document.getElementById("divider")!;

const DEFAULT_CODE = `# x-lang Playground

欢迎使用 x-lang，只有标记 \`x-lang\` 的代码块会被执行。

## 交互组件演示

选择部门来筛选下方表格（UI → JS 双向通信）：

\`\`\`x-lang
radio(部门选项, 当前部门)
\`\`\`

\`\`\`x-lang
table(用户列表)
\`\`\`

## 执行 x-lang 代码

\`\`\`x-lang
名字 = "World"
问候 = "Hello, " + 名字 + "!"
问候
\`\`\`

## 普通代码块（Markdown 渲染）

没有 \`x-lang\` 标记的代码块按 Markdown 原样展示：

\`\`\`python
def greet(name):
    return f"Hello, {name}!"
\`\`\`

\`\`\`javascript
const greet = (name) => \`Hello, \${name}!\`;
\`\`\`

## JS 注入变量 → x-lang 渲染

以下变量由 JS 注入：\`公司名\`、\`用户列表\`

\`\`\`x-lang
标题 = 公司名 + " - 员工花名册"
标题
\`\`\`

## 自定义渲染组件

\`\`\`x-lang
tlink("访问百度", "https://www.baidu.com")
\`\`\`

\`\`\`x-lang
tlink("X-Lang GitHub", "https://github.com")
\`\`\`

## Element Plus 按钮

\`\`\`x-lang
button("点击我")
\`\`\`

\`\`\`x-lang
button(text = "成功按钮", type = "success")
\`\`\`

\`\`\`x-lang
button(text = "危险操作", type = "danger", size = "large", onClick = "你点击了危险按钮！")
\`\`\`

## 骨架屏（流式输出模拟）

下面是一个未闭合的代码块，模拟 AI 正在流式输出的场景：

\`\`\`x-lang
table(用户列表, 姓名, 薪资)
`;

const editor = monaco.editor.create(editorContainer, {
  value: DEFAULT_CODE,
  language: XLANG_ID,
  theme: "xlang-light",
  fontSize: 14,
  lineHeight: 1.6,
  fontFamily:
    '"SF Mono", "Cascadia Code", "Fira Code", "JetBrains Mono", Consolas, monospace',
  minimap: { enabled: false },
  scrollBeyondLastLine: false,
  padding: { top: 12, bottom: 12 },
  automaticLayout: true,
  tabSize: 2,
  renderLineHighlight: "line",
  cursorBlinking: "smooth",
  cursorSmoothCaretAnimation: "on",
  smoothScrolling: true,
  bracketPairColorization: { enabled: true },
  guides: { indentation: true, bracketPairs: true },
  wordWrap: "on",
  contextmenu: true,
  suggest: { showKeywords: true },
  overviewRulerLanes: 0,
  hideCursorInOverviewRuler: true,
  overviewRulerBorder: false,
  scrollbar: {
    verticalScrollbarSize: 8,
    horizontalScrollbarSize: 8,
  },
});

function execute() {
  try {
    app.run(editor.getValue(), output);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    output.innerHTML = "";
    const errDiv = document.createElement("div");
    errDiv.className = "render-error-item";
    errDiv.textContent = message;
    output.appendChild(errDiv);
  }
}

editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
  execute();
});

let debounceTimer: ReturnType<typeof setTimeout>;
editor.onDidChangeModelContent(() => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(execute, 300);
});

let isDragging = false;
divider.addEventListener("mousedown", (e) => {
  isDragging = true;
  divider.classList.add("dragging");
  e.preventDefault();
});

document.addEventListener("mousemove", (e) => {
  if (!isDragging) return;
  const main = document.getElementById("main")!;
  const rect = main.getBoundingClientRect();
  const ratio = (e.clientX - rect.left) / rect.width;
  const clamped = Math.max(0.2, Math.min(0.8, ratio));
  const editorPanel = document.getElementById("editor-panel")!;
  const outputPanel = document.getElementById("output-panel")!;
  editorPanel.style.flex = `${clamped}`;
  outputPanel.style.flex = `${1 - clamped}`;
});

document.addEventListener("mouseup", () => {
  isDragging = false;
  divider.classList.remove("dragging");
});

execute();
