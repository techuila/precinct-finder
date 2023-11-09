import React from 'react';

function Input(
	props: React.PropsWithChildren<{} & React.HTMLProps<HTMLInputElement>>
) {
	const { ...domProps } = props;
	return (
		<input
			{...domProps}
			type='text'
			className='input input-bordered focus:input-info w-full min-w-xs max-w-md shadow-lg shrink-0'
		/>
	);
}

export default Input;
