import {
	WindowScroller,
	Column,
	Index,
	Table as VirtualizedTable
} from 'react-virtualized';
import { columns } from '../../utils/constants';

const list = new Array(100).fill({ name: 'Brian Vaughn' });

function Table() {
	return (
		<WindowScroller>
			{({ height, width, registerChild, scrollTop }) => (
				<div className='w-full' data-ref={registerChild}>
					<VirtualizedTable
						width={width * 0.83333333}
						autoHeight
						height={height}
						headerHeight={20}
						rowHeight={30}
						scrollTop={scrollTop}
						rowCount={list.length}
						rowGetter={({ index }: Index) => list[index]}
						headerClassName='capitalize'
						className='mt-8'
						rowClassName={({ index }: Index) =>
							index > -1
								? index % 2
									? 'hover:bg-info hover:shadow-lg hover:text-white dark:hover:text-black rounded-md'
									: 'hover:bg-info hover:shadow-lg hover:text-white dark:hover:text-black rounded-md'
								: ''
						}
					>
						{columns.map(({ label, dataKey }) => (
							<Column label={label} dataKey={dataKey} width={width * 0.2} />
						))}
					</VirtualizedTable>
				</div>
			)}
		</WindowScroller>
	);
}

export default Table;
