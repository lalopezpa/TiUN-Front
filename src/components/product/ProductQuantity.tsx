import React, {Component} from 'react';

class ProductQuantity extends Component {
	constructor(props) {
		super(props);
		this.state = {
			cantidad: 1,
			opcionesCantidad: [1, 2, 3],
			isOpen: false,
			customInput: '', // Estado para el campo de entrada personalizado
		};
	}

	handleCantidadChange = opcion => {
		// Validar que la opción no supere el stock disponible
		if (opcion <= this.props.stock) {
			this.setState({cantidad: opcion, isOpen: false});
		} else {
			alert('Stock insuficiente');
		}
	};

	handleInputChange = e => {
		this.setState({customInput: e.target.value});
	};

	toggleDropdown = () => {
		this.setState(prevState => ({isOpen: !prevState.isOpen}));
	};

	render() {
		const {cantidad, opcionesCantidad, isOpen, customInput} = this.state;

		return (
			<div className='relative inline-block min-w-screen text-left '>
				<div>
					<button
						type='button'
						onClick={this.toggleDropdown}
						className='inline-flex justify-center w-24 py-2 text-sm font-medium text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring focus:ring-gray-300 rounded-full'
					>
						Cantidad: {cantidad}
					</button>
				</div>
				{isOpen && (
					<div className='flex flex-col origin-top-right absolute right-0 mt w-24 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5'>
						<div className='py-1' role='menu' aria-orientation='vertical' aria-labelledby='options-menu'>
							{opcionesCantidad.map(opcion => (
								<button
									key={opcion}
									onClick={() => {
										this.handleCantidadChange(opcion);
									}}
									className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left ${
										cantidad === opcion ? 'bg-gray-100' : ''
									}`}
									role='menuitem'
								>
									{opcion}
								</button>
							))}
							<div className='px-4 py-2 '>
								<input
									type='number'
									className='w-full border rounded py-1 '
									placeholder='3+'
									value={customInput}
									onChange={this.handleInputChange}
								/>
								<button
									className='mt-2 bg-blue-500 hover:bg-blue-700 text-white text-xs font-bold py-2 rounded'
									onClick={() => {
										this.handleCantidadChange(parseInt(customInput, 10));
									}}
								>
                  Aplicar
								</button>
							</div>
						</div>
					</div>
				)}
			</div>
		);
	}
}

export default ProductQuantity;
