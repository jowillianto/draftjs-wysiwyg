import React from "react";
import TextEditor from "./editor/text-editor/text-editor";
import "./index.css";
import { convertToRaw, EditorState } from "draft-js";
import EditorHeader from "./editor/editor-header/editor-header";

type AppP = {
  inputElement?: HTMLInputElement;
};

const App = ({ inputElement }: AppP) => {
  const defaultValue = React.useMemo(() => {
    if (!inputElement) return undefined;
    const value = inputElement.value;
    if (value) return JSON.parse(value);
    else return undefined;
  }, [inputElement]);
  const saveToHiddenField = React.useCallback(
    (editor: EditorState) => {
      if (inputElement)
        inputElement.value = JSON.stringify(
          convertToRaw(editor.getCurrentContent())
        );
    },
    [inputElement]
  );
  return (
    <React.Fragment>
      <TextEditor
        header={<EditorHeader />}
        onChange={saveToHiddenField}
        defaultValue={defaultValue}
        editorShortcut
      />
    </React.Fragment>
  );
};

export default App;
