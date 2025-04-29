import React, { useState, useRef } from 'react';
import { Search, X } from 'lucide-react';
// import { usePrecinctStore } from '../store/precinctStore';

const SearchBar: React.FC = () => {
	// const { searchTerm, setSearchTerm } = usePrecinctStore();
	const [inputValue, setInputValue] = useState('');
	const inputRef = useRef<HTMLInputElement>(null);

	// Debounce search term updates
	// useEffect(() => {
	// 	const timer = setTimeout(() => {
	// 		setSearchTerm(inputValue);
	// 	}, 300);

	// 	return () => clearTimeout(timer);
	// }, [inputValue, setSearchTerm]);

	const handleClear = () => {
		setInputValue('');
		// setSearchTerm('');
		inputRef.current?.focus();
	};

	return (
		<div className='w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-6'>
			<div className='relative'>
				<div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
					<Search className='h-5 w-5 text-gray-400' />
				</div>

				<input
					ref={inputRef}
					type='text'
					value={inputValue}
					onChange={(e) => setInputValue(e.target.value)}
					placeholder='Search by ID, name, location...'
					className='block w-full pl-10 pr-10 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all'
					aria-label='Search precincts'
				/>

				{inputValue && (
					<button
						onClick={handleClear}
						className='absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors'
						aria-label='Clear search'
					>
						<X className='h-5 w-5' />
					</button>
				)}
			</div>
		</div>
	);
};

export default SearchBar;
