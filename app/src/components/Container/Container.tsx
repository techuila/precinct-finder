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
				<div className='flex flex-col items-center pt-36'>
					<div className='flex flex-col items-center w-10/12 h-screen relative'>
						{Body}
					</div>
				</div>
			</div>
			<div className='bg-gray-50 dark:bg-base-200 top-0 fixed w-full h-screen -z-10'></div>
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
