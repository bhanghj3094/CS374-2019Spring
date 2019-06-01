import datetime

class UserDao():

	def __init__(self, conn):
		self.conn = conn

	def get_user(self, user_id):
		user = {}
		with self.conn.cursor() as cursor:
			cursor.excute("SELECT * FROM user_info WHERE user_id=%s", user_id)
			desc = cursor.description
			row = cursor.fetchone()

			if row is None:
				return None
			for i in range(len(row)):
				name = desc[i][0]
				user[name] = row[i]
		return user

	def create_user(self, user):
		id = user["id"]
		nickname = user['nickname']
		password = user["password"]
		user_email = user["email"]
		dependency = user["dependency"]
		goal_date = user["goal_date"]
		spent_money = user["spent_money"]
		spent_per = user["spent_per"]
		mini_goal_1 = user["mini_goal_1"]
		mini_goal_2 = user["mini_goal_2"]
		mini_goal_3 = user["mini_goal_3"]

		with self.conn.cursor() as cursor:
			cursor.execute("INSERT INTO user_info(id, nickname, password, email, dependency, start_date, goal_date, spent_money, spent_per, mini_goal_1, mini_goal_2, mini_goal_3)"
						   " VALUES(%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)",
						   (id, nickname, password, user_email, dependency, datetime.datetime.now(), goal_date, spent_money, spent_per, mini_goal_1, mini_goal_2, mini_goal_3))

	def update_user(self, user):
		id = user["id"]
		goal_date = user["goal_date"]
		spent_money = user["spent_money"]
		spent_per = user["spent_per"]
		mini_goal_1 = user["mini_goal_1"]
		mini_goal_2 = user["mini_goal_2"]
		mini_goal_3 = user["mini_goal_3"]

		with self.conn.cursor() as cursor:
			cursor.execute("UPDATE user_info SET goal_date=%s, spent_money=%s, spent_per=%s,"
						   " mini_goal_1=%s, mini_goal_2=%s, mini_goal_3=%s, "
						   " update_time=now() WHERE user_id=%s",
						   (goal_date, spent_money, spent_per, mini_goal_1, mini_goal_2, mini_goal_3, id))





