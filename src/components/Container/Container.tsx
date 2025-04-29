import { cn } from '@/lib/utils';
import React from 'react';

function Container({ children }: React.PropsWithChildren<{}>) {
	const components = React.Children.map(
		children,
		(child) => child
	) as React.ReactNode[];
	const Header = components.find((e: any) => e.type.name === 'Header');
	const Body = components.find((e: any) => e.type.name === 'Body');

	return (
		<>
			<div className='z-10'>
				{Header}
				<div className='flex flex-col items-center'>
					<div
						className={cn(
							'flex flex-col relative',
							'max-w-7xl mx-auto px-4 w-full'
						)}
					>
						{Body}
					</div>
				</div>
			</div>
			<div className='bg-gray-50 dark:bg-base-200 top-0 fixed w-full -z-10'></div>
		</>
	);
}

const Header = ({ children }: React.PropsWithChildren<{}>) => {
	return <>{children}</>;
};

const Body = ({ children }: React.PropsWithChildren<{}>) => {
	return <>{children}</>;
};

Container.Header = Header;
Container.Body = Body;

export default Container;
