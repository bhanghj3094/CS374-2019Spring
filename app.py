import json
from flask import Flask, request, send_from_directory, redirect
from userdao import UserDao
from dbconnection import DBPool


app = Flask(__name__)
pool = DBPool


@app.route('/json/user/<user_id>')
def get_user(user_id):
	conn = pool.get_connection()
	dao = UserDao(conn)
	user = dao.get_user(user_id)

	return json.dumps(user)


@app.route('/create_user')
def create_user():
	conn = pool.get_connection()
	dao = UserDao(conn)
	user = request.get_json('user_created')
	create_user(user)


@app.route('/update_user')
def update_user():
	conn = pool.get_connection()
	dao = UserDao(conn)
	user = request.get_json('user_updated')
	create_user(user)

@app.route('/')
def hello_world():
	return 'Hello World!'


if __name__ == '__main__':
	app.run()


