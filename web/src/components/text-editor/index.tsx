import React, { useState, useCallback, useRef } from "react"
import Editor, { loader } from "@monaco-editor/react"
import styles from "./index.module.less"
import { DataType } from "../../api/data"

loader.config({
  paths: {
    vs: "https://cdn.jsdelivr.net/npm/monaco-editor@0.45.0/min/vs",
  },
})

interface TextEditorProps {
  value?: string
  onChange?: (value: string) => void;
  type?: DataType;
  className?: string
  readOnly?: boolean
  height?: string
  theme?: "light" | "dark"
}

interface JsonError {
  message: string
  line?: number
  column?: number
}

const TextEditor: React.FC<TextEditorProps> = (props) => {
  const {
    value = "",
    onChange,
    type = DataType.JSON,
    className,
    readOnly = false,
    height = "400px",
    theme = "light",
  } = props
  const [jsonValue, setJsonValue] = useState(value)
  const [error, setError] = useState<JsonError | null>(null)
  const [isValid, setIsValid] = useState(true)
  const editorRef = useRef<any>(null)

  // 验证JSON
  const validateJson = useCallback((jsonString: string): JsonError | null => {
    if (!jsonString.trim()) {
      return null
    }

    try {
      JSON.parse(jsonString)
      return null
    } catch (err) {
      const error = err as Error
      const match = error.message.match(/at position (\d+)/)
      let line = 1
      let column = 1

      if (match) {
        const position = Number.parseInt(match[1])
        const lines = jsonString.substring(0, position).split("\n")
        line = lines.length
        column = lines[lines.length - 1].length + 1
      }

      return {
        message: error.message,
        line,
        column,
      }
    }
  }, [])

  const handleEditorChange = useCallback(
    (newValue: string | undefined) => {
      const value = newValue || ""
      setJsonValue(value)

      if (type === DataType.JSON) {
        const validationError = validateJson(value)
        const valid = !validationError
  
        setError(validationError)
        setIsValid(valid)
      }

      onChange?.(value)
    },
    [onChange, validateJson, type],
  )

  const formatJson = useCallback(() => {
    if (!jsonValue.trim() || !isValid) return

    try {
      const parsed = JSON.parse(jsonValue)
      const formatted = JSON.stringify(parsed, null, 2)
      editorRef.current?.setValue(formatted)
    } catch (err) { }
  }, [jsonValue, isValid])

  const minifyJson = useCallback(() => {
    if (!jsonValue.trim() || !isValid) return

    try {
      const parsed = JSON.parse(jsonValue)
      const minified = JSON.stringify(parsed)
      editorRef.current?.setValue(minified)
    } catch (err) { }
  }, [jsonValue, isValid])

  const handleEditorDidMount = useCallback((editor: any) => {
    editorRef.current = editor
  }, [])

  return (
    <div className={`${styles.container} ${className || ""}`}>
      <div className={styles.toolbar}>
        <div className={styles.title}>
          <span className={`${styles.badge} ${isValid ? styles.valid : styles.invalid}`}>
            {isValid ? "有效" : "无效"}
          </span>
          {error && (
            <span className={styles.errorInfo}>
              第{error.line}行，第{error.column}列
            </span>
          )}
        </div>

        {type === DataType.JSON && (
          <div className={styles.actions}>
            <button className={styles.button} onClick={formatJson} disabled={!isValid || readOnly} title="格式化JSON">
              格式化
            </button>
            <button className={styles.button} onClick={minifyJson} disabled={!isValid || readOnly} title="压缩JSON">
              压缩
            </button>
          </div>
        )}
      </div>

      <div className={styles.editorContainer}>
        <Editor
          height={height}
          language={type === DataType.JSON ? 'json' : 'txt'}
          value={jsonValue}
          onChange={handleEditorChange}
          onMount={handleEditorDidMount}
          theme={theme === "dark" ? "vs-dark" : "vs"}
          options={{
            readOnly,
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            fontSize: 14,
            lineNumbers: "on",
            glyphMargin: false,
            folding: true,
            lineDecorationsWidth: 0,
            lineNumbersMinChars: 3,
            renderLineHighlight: "line",
            automaticLayout: true,
            wordWrap: "on",
            formatOnPaste: true,
            formatOnType: true,
            tabSize: 2,
            insertSpaces: true,
          }}
        />
      </div>
    </div>
  )
}

export default TextEditor
