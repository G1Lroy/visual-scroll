import { OptionsState } from '../App'

interface VirtualizerControlProps {
  state: OptionsState
  onChangeHandler: (data: number, optionName: string) => void
}

const VirtualizerControl = ({ onChangeHandler, state }: VirtualizerControlProps) => {
  const { h, rowHeight, visibleRows, w } = state

  return (
    <div>
      <table className='table_preview'>
        <thead>
          <tr >
            <th>Row height</th>
            <th>Visible rows</th>
            <th>Table columns</th>
            <th>Table rows</th>
          </tr>
        </thead>
        <tbody className='table_controls'>
          <tr>
            <td>{rowHeight} px</td>
            <td>{visibleRows}</td>
            <td>{w}</td>
            <td>{h}</td>
          </tr>
          <tr>
            <td>
              <input
                defaultValue={rowHeight}
                onChange={(e) => onChangeHandler(Number(e.target.value), e.target.name)}
                type="range"
                name='rowHeight'
                min={25}
                max={100}
              />
            </td>
            <td>
              <input
                defaultValue={visibleRows}
                onChange={(e) => onChangeHandler(Number(e.target.value), e.target.name)}
                type="range"
                name='visibleRows'
                min={2}
                max={10}
              />
            </td>
            <td>
              <select
                defaultValue={w}
                onChange={(e) => onChangeHandler(Number(e.target.value), e.target.name)}
                name='w'
              >
                {Array.from({ length: 20 }, (_, index) => index + 1).map(value => (
                  <option key={value} value={value}>{value}</option>
                ))}
              </select>
            </td>
            <td>
              <input
                defaultValue={h}
                onChange={(e) => onChangeHandler(Number(e.target.value), e.target.name)}
                type="range"
                name='h'
                min={25}
                max={99999}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default VirtualizerControl