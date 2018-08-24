import 'whatwg-fetch';

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

export function getAllMembers() {
	return new Promise((resolve, reject) => {
		fetch('/api/members')
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
