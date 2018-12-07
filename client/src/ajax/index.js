import 'whatwg-fetch';

// Login
export function login(username, password) {
	return new Promise((resolve, reject) => {
		fetch('/api/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({username, password})
			})
				.then(response => response.json())
				.then((response) => {
					if (response.success) {
						resolve(response);
					} else {
						reject('Login failed');
					}
				});
	})
};

// GET all the stuff
export function getAllMembers() {
	return new Promise((resolve, reject) => {
		fetch('/api/members', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then(response => response.json())
			.then((response) => {
				if (response.success) {
					resolve(response.data);
				} else {
					reject(response.error);
				}
			});
	});
}

export function getAllFamilies() {
	return new Promise((resolve, reject) => {
		fetch('/api/families')
			.then(response => response.json())
			.then((response) => {
				if (response.success) {
					resolve(response.data);
				} else {
					reject(response.error);
				}
			});
	});
}

export function getAllNotes() {
	return new Promise((resolve, reject) => {
		fetch('/api/notes')
			.then(response => response.json())
			.then((response) => {
				if (response.success) {
					resolve(response.data);
				} else {
					reject(response.error);
				}
			});
	});
}

export function getAllUsers() {
	return new Promise((resolve, reject) => {
		fetch('/api/users')
			.then(response => response.json())
			.then((response) => {
				if (response.success) {
					resolve(response.data);
				} else {
					reject(response.error);
				}
			});
	});
}

// POST new stuff
export function addNewNote(date, author, members, families, text) {
	const body = JSON.stringify({date, author, members, families, text});
	return new Promise((resolve, reject) => {
		fetch('/api/notes', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body
		})
			.then(response => response.json())
			.then((response) => {
				if (response.success) {
					resolve(response.data);
				} else {
					reject(response.error);
				}
			});
	});
}

export function addNewUser(name, username, password, passwordConf, isAdmin) {
	const body = JSON.stringify({name, username, password, passwordConf, isAdmin});
	return new Promise((resolve, reject) => {
		fetch('/api/users', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body
		})
			.then(response => response.json())
			.then((response) => {
				if (response.success) {
					resolve(response.data);
				} else {
					reject(response.error);
				}
			});
	});
}

export function addNewMember(name) {
	const body = JSON.stringify({name});
	return new Promise((resolve, reject) => {
		fetch('/api/members', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body
		})
			.then(response => response.json())
			.then((response) => {
				if (response.success) {
					resolve(response.data);
				} else {
					reject(response.error);
				}
			});
	});
}

export function addNewFamily(name, head) {
	const body = JSON.stringify({name, head});
	return new Promise((resolve, reject) => {
		fetch('/api/families', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body
		})
			.then(response => response.json())
			.then((response) => {
				if (response.success) {
					resolve(response.data);
				} else {
					reject(response.error);
				}
			});
	});
}

// DELETE stuff
export function deleteNote(id) {
	return new Promise((resolve, reject) => {
		fetch(`/api/notes/${id}`, {
			method: 'DELETE'
		})
			.then(response => response.json())
			.then((response) => {
				if (response.success) {
					resolve(response.data);
				} else {
					reject(response.error);
				}
			});
	});
}

export function deleteUser(id) {
	return new Promise((resolve, reject) => {
		fetch(`/api/users/${id}`, {
			method: 'DELETE'
		})
			.then(response => response.json())
			.then((response) => {
				if (response.success) {
					resolve(response.data);
				} else {
					reject(response.error);
				}
			});
	});
}

export function deleteMember(id) {
	return new Promise((resolve, reject) => {
		fetch(`/api/members/${id}`, {
			method: 'DELETE'
		})
			.then(response => response.json())
			.then((response) => {
				if (response.success) {
					resolve(response.data);
				} else {
					reject(response.error);
				}
			});
	});
}

export function deleteFamily(id) {
	return new Promise((resolve, reject) => {
		fetch(`/api/families/${id}`, {
			method: 'DELETE'
		})
			.then(response => response.json())
			.then((response) => {
				if (response.success) {
					resolve(response.data);
				} else {
					reject(response.error);
				}
			});
	});
}
