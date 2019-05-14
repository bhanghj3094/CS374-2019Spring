import json
from flask import Flask, request, send_from_directory, render_template
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


@app.route('/send_user_info', methods=['POST'])
def send_user():

	return render_template('challenge_set_up.html')


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


@app.route('/<path:path>', methods=['get', 'post'])
def send_js(path):
	return send_from_directory('templates', path + ".html")


@app.after_request
def set_response_headers(response):
	response.headers['Cache-Control'] = 'no-cache, no-store, must-revalidate'
	response.headers['Pragma'] = 'no-cache'
	response.headers['Expires'] = '0'
	return response

if __name__ == '__main__':
	app.run(host='0.0.0.0')


