import pymysql
from DBUtils.PooledDB import PooledDB


class DBPool:

	def __init__(self):
		self.pool = PooledDB(pymysql,
							 10,
							 host='cs374-2019spring.cguznaldu7hu.ap-northeast-2.rds.amazonaws.com',
							 user='admin',
							 passwd='denimsteak',
							 db='cs374_2019spring',
							 port=3306,
							 setsession=['SET AUTOCOMMIT = 1']
							)

	# setsession=['SET AUTOCOMMIT = 1'] is used to set whether the thread pool opens the automatic update configuration, 0 is False, 1 is True.

	def get_connection(self):
		conn = self.pool.connection()
		return conn

	def close_connection(self, conn):
		conn.close()

