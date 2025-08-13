import { loader } from "@monaco-editor/react"

let isPreloaded = false

export const preloadMonacoEditor = async (): Promise<void> => {
  if (isPreloaded) {
    return
  }

  try {
    loader.config({
      paths: {
        vs: "https://cdn.jsdelivr.net/npm/monaco-editor@0.45.0/min/vs",
      },
    })

    await loader.init()
    isPreloaded = true
    console.log("Monaco Editor预加载完成")
  } catch (error) {
    console.error("Monaco Editor预加载失败:", error)
    throw error
  }
}

export const isMonacoPreloaded = (): boolean => {
  return isPreloaded
}
