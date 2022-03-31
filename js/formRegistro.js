let usuarios = [
	{
		identificacion: '1',
		nombre: 'Manuel',
		apellido: 'Hernández',
		direccion: 'Cra 20'
	},
	{
		identificacion: '2',
		nombre: 'Jose',
		apellido: 'Pacheco',
		direccion: 'Cra 22'
	}
]

var tablaUsuarios = document.getElementById('usuarios')


console.log(usuarios.length)

const limpiarTabla = () => {
	usuarios.map(() => {
		console.log(tablaUsuarios.deleteRow(-1))
	})
}

const cargarUsuarios = () => {
	usuarios.map((usuario) => {
		tablaUsuarios.insertRow(-1).innerHTML +=
			`
    	<th class='table-light'>${usuario.identificacion}</td>
    	<td class='table-light'>${usuario.nombre}</td>
    	<td class='table-light'>${usuario.apellido}</td>
    	<td class='table-light'>${usuario.direccion}</td>
		`
	})
}

const seEncuentra = (id) => {
	return usuarios.find((usuario) => usuario.identificacion == id) !== undefined
}

const esNumero = (id) => {
	return !isNaN(id)
}

const esVacio = (valor) => {
	return valor === ''
}

const registrarUsuario = () => {
	//Obtiene los datos del form
	const identificacion = document.getElementById("identificacion").value
	const nombre = document.getElementById("nombre").value
	const apellido = document.getElementById("apellido").value
	const direccion = document.getElementById("direccion").value

	if (!esVacio(identificacion) && !esVacio(nombre) && !esVacio(apellido) && !esVacio(direccion)) {
		if (esNumero(identificacion)) {
			if (!seEncuentra(identificacion)) {
				//Agrega los datos del formulario a un objeto usuarios de tipo JSON
				const nuevoUsuario = {
					identificacion,
					nombre,
					apellido,
					direccion,
				}

				//Limpia la tabla usuarios en el DOM
				limpiarTabla()

				//agrega un nuevo usuario al array usuarios
				usuarios.push(nuevoUsuario)


				//Carga los datos del array usuarios en el DOM
				cargarUsuarios()

				//Mostrar mensaje success
				document.getElementById('message').innerHTML += 
				`
					<div class="alert alert-success" role="alert">
							Usuario registrado correctamente.
					</div>
				`

			} else {
				//Mostrar mensaje fail
				document.getElementById('message').innerHTML +=
					`
					<div class="alert alert-danger" role="alert">
							El usuario ingresado ya se encuentra registrado.
					</div>
				`
			}
		} else {
			alert('La identificación debe ser un número.')
		}
	} else {
		alert('Todos los campos son obligatorios.')
	}
}

document.addEventListener("keyup", (event) => {
	event.preventDefault()
	event.key === "Enter" && registrarUsuario()
});

