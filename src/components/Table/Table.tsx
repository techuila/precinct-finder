import { GlowingEffect } from '@/components/ui/GlowingEffect';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface TableProps {
	children: ReactNode;
	className?: string;
}

interface TableHeaderProps {
	children: ReactNode;
	className?: string;
}

interface TableBodyProps {
	children: ReactNode;
	className?: string;
}

interface TableRowProps {
	children: ReactNode;
	className?: string;
	onClick?: () => void;
}

interface TableCellProps {
	children: ReactNode;
	className?: string;
}

const Table = ({ children, className }: TableProps) => {
	return (
		<div
			className={cn('w-full h-[calc(100vh-18rem)] flex flex-col', className)}
		>
			<div className='w-full flex-1 overflow-hidden flex flex-col'>
				<div className='overflow-y-auto flex-1 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-thumb]:bg-gray-700 hover:[&::-webkit-scrollbar-thumb]:bg-gray-400 dark:hover:[&::-webkit-scrollbar-thumb]:bg-gray-600'>
					<div className='relative w-full'>
						<table className='w-full border-collapse'>{children}</table>
					</div>
				</div>
			</div>
		</div>
	);
};

const Header = ({ children, className }: TableHeaderProps) => {
	return (
		<thead
			className={cn('sticky top-0 bg-white dark:bg-gray-800 z-20', className)}
		>
			<tr className='border-b border-gray-200 dark:border-gray-800'>
				{children}
			</tr>
		</thead>
	);
};

const Body = ({ children, className }: TableBodyProps) => {
	return <tbody className={className}>{children}</tbody>;
};

const Row = ({ children, className, onClick }: TableRowProps) => {
	return (
		<tr
			onClick={onClick}
			className={cn(
				'group relative transition-all duration-300',
				'border-b border-gray-100 dark:border-gray-800',
				'dark:hover:text-white hover:text-black dark:hover:bg-[#00A1E4]/10 hover:bg-[#00A1E4]/10',
				'first:rounded-t-lg last:rounded-b-lg',
				className
			)}
		>
			{children}
			<div className='absolute inset-0 rounded-lg opacity-20 group-hover:opacity-100 transition-opacity duration-100 pointer-events-none mx-[1px]'>
				<GlowingEffect
					blur={0}
					borderWidth={1}
					spread={10}
					glow={true}
					disabled={false}
					proximity={32}
					inactiveZone={0.3}
					variant='blue'
				/>
			</div>
		</tr>
	);
};

const Cell = ({ children, className }: TableCellProps) => {
	return (
		<td className={cn('px-4 py-3 text-sm relative z-10 text-left', className)}>
			{children}
		</td>
	);
};

const HeaderCell = ({ children, className }: TableCellProps) => {
	return (
		<th
			className={cn(
				'px-4 py-3 text-sm font-medium text-black text-left dark:text-white',
				className
			)}
		>
			{children}
		</th>
	);
};

Table.Header = Header;
Table.Body = Body;
Table.Row = Row;
Table.Cell = Cell;
Table.HeaderCell = HeaderCell;

export default Table;
