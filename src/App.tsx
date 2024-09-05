import './App.css'
import { useCallback, useMemo, useState } from 'react'
import VirtualizerControl from './components/VirtualizerControl'
import VirtualScroll from './components/VirtualScroll'


export interface OptionsState {
  rowHeight: number,
  visibleRows: number,
  w: number,
  h: number,
}

function App() {
  const [{ rowHeight, visibleRows, w, h }, setData] = useState<OptionsState>({
    rowHeight: 35,
    visibleRows: 10,
    w: 5,
    h: 5001
  })

  const onChangeHandler = useCallback((data: number, optionName: string) => {
    setData((state) => {
      return { ...state, [optionName]: data }
    })
  }, [])

  const generateTable = useMemo(() => {
    return new Array(h).fill(0).map((_, row) => {
      return new Array(w).fill(0).map((_, col) => {
        return col + row
      })
    })
  }, [h, w])

  return (
    <div className='app'>
      <VirtualizerControl
        state={{ rowHeight, visibleRows, w, h }}
        onChangeHandler={onChangeHandler}
      />
      <VirtualScroll
        rowHeight={rowHeight}
        visibleRows={visibleRows}
        tableData={generateTable}
      />
    </div>
  )
}

export default App





