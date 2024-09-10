import React, { memo, useEffect, useRef } from 'react'

interface VirtualScrollProps {
  tableData: number[][]
  rowHeight: number
  visibleRows: number
}

const VirtualScroll = ({ rowHeight, tableData, visibleRows }: VirtualScrollProps) => {
  const virtualRootRef = useRef<HTMLDivElement | null>(null)
  const [start, setStart] = React.useState(0);


  function getTopHeight() {
    return rowHeight * start;
  }
  function getBottomHeight() {
    return rowHeight * (tableData.length - (start + visibleRows + 1));
  }

  useEffect(() => {
    const onScroll = (e: Event) => {
      const target = e.target as HTMLDivElement;
      setStart(Math.min(
        tableData.length - visibleRows - 1,
        Math.floor(target.scrollTop / rowHeight)
      ));
    }

    if (!virtualRootRef.current) return;

    virtualRootRef.current.addEventListener('scroll', onScroll);

    return () => virtualRootRef.current?.removeEventListener('scroll', onScroll);
  }, [rowHeight, tableData.length, visibleRows]);

  return (
    <div
      className='virtual_scroll'
      style={{ height: rowHeight * visibleRows + 1, overflow: 'auto' }}
      ref={virtualRootRef}
    >
      <div style={{ height: getTopHeight() }} />
      <table>
        <tbody>
          {tableData.slice(start, start + visibleRows + 1).map((row, rowIndex) => (
            <tr
              style={{ height: rowHeight }}
              key={start + rowIndex}
            >{row.map((text, colIndex) => (
              <td
                className='table_cell'
                key={start + '' + rowIndex + colIndex}>{text + 1}
              </td>
            ))}</tr>
          ))}
        </tbody>
      </table>
      <div style={{ height: getBottomHeight() }} />
    </div>
  )
}
export default memo(VirtualScroll) 