import { extractStyle } from '@ant-design/static-style-extract'
import { Button, ConfigProvider } from 'src/components'

export function GetAntdStyles(): React.ReactNode {
  const css = extractStyle(node => (
    <>
      <ConfigProvider>{node}</ConfigProvider>
    </>
  ))

  const onClickCopy = async () => {
    try {
      await navigator.clipboard.writeText(css)
      alert('Success')
    } catch (err) {
      console.error(err)
      alert('Error copying css, check console')
    }
  }

  return (
    <div>
      <Button onClick={onClickCopy}>Copy Styles to Clipboard</Button>
    </div>
  )
}
