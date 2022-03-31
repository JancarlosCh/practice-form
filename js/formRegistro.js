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

				//Agrega un nuevo usuario al array usuarios
				usuarios.push(nuevoUsuario)

				//Carga los datos del array usuarios en el DOM
				cargarUsuarios()

				//Mostrar mensaje success
				success()

				//Eliminar alerta del DOM
				eliminarAlerta()

			} else {
				//Mostrar mensaje fail
				fail()

				//Eliminar alerta del DOM
				eliminarAlerta()
			}
		} else {
			warning('La identificación del usuario debe ser un número.')
		}
	} else {
		warning('Todos los campos del formulario son obligatorios.')
	}
}

document.addEventListener("keyup", (event) => {
	event.preventDefault()
	event.key === "Enter" && registrarUsuario()
});

const eliminarAlerta = () => {
	let alertNode = document.querySelector('#message')
	let alert = document.querySelector('.alert')

	setTimeout(() => {
		alertNode.removeChild(alert);
	}, 4000);
}

const success = () => {
	document.getElementById('message').innerHTML +=
		`
			<div class="alert alert-success" role="alert">
				Usuario registrado correctamente.
			</div>
		`
}

const fail = () => {
	document.getElementById('message').innerHTML +=
		`
			<div class="alert alert-dangerrole="alert" id="alert">
					El número de identificación ingresado ya se encuentra registrado.
			</div>
		`
}

const warning = (mensaje) => {
	const Toast = Swal.mixin({
		toast: true,
		position: 'top-end',
		showConfirmButton: false,
		timer: 3000,
		timerProgressBar: true,
		didOpen: (toast) => {
			toast.addEventListener('mouseenter', Swal.stopTimer)
			toast.addEventListener('mouseleave', Swal.resumeTimer)
		}
	})

	Toast.fire({
		icon: 'warning',
		title: mensaje
	})
}


