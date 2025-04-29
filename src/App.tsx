import { Navbar } from './components/Navbar';
import { Searchbar } from './components/SearchBar';
import { Container } from './components/Container';
import { Table } from './components/Table';

function App() {
	return (
		<Container>
			<Container.Header>
				<Navbar />
			</Container.Header>

			<Container.Body>
				<div className='py-6'>
					<h2 className='text-2xl font-bold text-center text-gray-900 dark:text-white'>
						Find Your Precinct
					</h2>
					<p className='mt-2 text-center text-gray-600 dark:text-gray-400'>
						Search for precinct information by ID, name, location, or building
					</p>
				</div>

				<Searchbar />

				<Table className='mt-4'>
					<Table.Header>
						<Table.HeaderCell>Name</Table.HeaderCell>
						<Table.HeaderCell>Address</Table.HeaderCell>
						<Table.HeaderCell>Barangay</Table.HeaderCell>
						<Table.HeaderCell>Cluster No</Table.HeaderCell>
						<Table.HeaderCell>Assign No</Table.HeaderCell>
						<Table.HeaderCell>Precinct No</Table.HeaderCell>
						<Table.HeaderCell>Building</Table.HeaderCell>
						<Table.HeaderCell>Room</Table.HeaderCell>
					</Table.Header>
					<Table.Body>
						{Array.from({ length: 100 }).map((_, index) => (
							<Table.Row key={index}>
								<Table.Cell>John Doe</Table.Cell>
								<Table.Cell>123 Main St</Table.Cell>
								<Table.Cell>Barangay 1</Table.Cell>
								<Table.Cell>1</Table.Cell>
								<Table.Cell>101</Table.Cell>
								<Table.Cell>P001</Table.Cell>
								<Table.Cell>Main Building</Table.Cell>
								<Table.Cell>Room 101</Table.Cell>
							</Table.Row>
						))}
					</Table.Body>
				</Table>
			</Container.Body>
		</Container>
	);
}

export default App;
