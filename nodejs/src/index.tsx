import { createRoot } from "react-dom/client";
import App from "./App";

let CURRENT_SCRIPT_PARENT : Element | null = null

function renderForDjango(): boolean {
  if (CURRENT_SCRIPT_PARENT === null) {
    const currentScript = document.currentScript;
    if (currentScript === null) {
      console.error("The javascript has no current script tag");
      return false;
    }
    CURRENT_SCRIPT_PARENT = currentScript
  }
  const parentDiv = CURRENT_SCRIPT_PARENT.parentNode;
  if (parentDiv === null) {
    console.error("Javascript script tag has no parent node");
    return false;
  }
  const editorContainerDiv = Array.from(parentDiv.children).find(
    (elm) => elm instanceof HTMLDivElement
  );
  const editorContainerHiddenField = Array.from(parentDiv.children).find(
    (elm) => elm instanceof HTMLInputElement
  )

  if (
    editorContainerDiv === undefined ||
    editorContainerHiddenField === undefined
  ) {
    console.error("Div Element : ", editorContainerDiv);
    console.error("Input Element : ", editorContainerHiddenField);
    console.error("Child Elements : ", Array.from(parentDiv.children))
    console.error(`
      <...>
        <div></div> // This will render the element. Has to be the first element.
        <script></script> // load the script here
        <input></input> // This will be the source and output of data. Has to be the last element
      <...>
    `);
    return false;
  }
  console.log("Using mainline django branch");
  const root = createRoot(editorContainerDiv as HTMLDivElement);
  root.render(<App inputElement={editorContainerHiddenField as HTMLInputElement} />);
  return true;
}

function renderForReactDev() {
  const rootElement = document.getElementById("root")
  if (rootElement !== null){
    const root = createRoot(rootElement);
    root.render(<App />);
    return true;
  }
  return false;
}

let MAX_RETRY = 10
function tryRender() {
  console.log("Trying to render for Django")
  if (renderForDjango() === true) return;
  console.log("Trying to render for React Dev")
  if (renderForReactDev() === true) return;
  if (MAX_RETRY > 0) {
    console.log("Retrying render")
    setTimeout(tryRender, 500);
    MAX_RETRY -= 1;
  }
  console.log("Failed to Render")
}

tryRender()
