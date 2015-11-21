from werkzeug.security import generate_password_hash, check_password_hash

def hashPassword(password):
	return generate_password_hash(password)

def checkPassword(expected, actual):
	return check_password_hash(expected, actual)