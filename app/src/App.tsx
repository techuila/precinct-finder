import { Navbar } from './components/Navbar';
import { Input } from './components/Input';
import { Container } from './components/Container';
import { Table } from './components/Table';

function App() {
	return (
		<Container>
			<Container.Header>
				<Navbar />
			</Container.Header>

			<Container.Body>
				<Input placeholder='Search Name' />

				<Table />
			</Container.Body>
		</Container>
	);
}

export default App;
