import pymysql.cursors 
from flask import Flask , render_template,request,jsonify,request
import json
import numpy as np
import pickle
import math
from sklearn.cluster import KMeans
import ast
from json.encoder import JSONEncoder
app=Flask(__name__)






km = pickle.load(open('deploy-model-v20','rb'))
centroid = km.cluster_centers_

Posts =[ ];

def dist(x1,x2):
	return math.pow((x2-x1),2)

@app.route('/' , methods=['GET','POST'])
@app.route('/send' , methods=['GET','POST'])
def send():
	inputs=[0.032258064516129,0.2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
	connection = pymysql.connect(host='localhost',
								 user='root',
								 password='jayvishaal2000',                             
								 db='aishe',
								 charset='utf8mb4',
								 cursorclass=pymysql.cursors.DictCursor)
	# for key,values in d.items():
		# if(key==str(1)):
			# istate=values
			# try:
				# with connection.cursor() as cursor :
					# sql="SELECT `university` FROM realuniversity WHERE  `state` = %s AND `type` = %s"
					# cursor.execute(sql,('Tamil Nadu','Deemed University-Private'))
					# result = cursor.fetchone()
					# print(mresult)
			# finally :
				# print(r)
				# print("Sucessfull")
				# connection.close()
	clus=[]
	list=[]
	with connection.cursor() as cursor :
		mycursor.execute("truncate cluster_table")
		mycursor.execute("INSERT INTO cluster_table (id, state, state_code, university, district, type, type_code, girl_exclusive, staff_quarter_available, offers_distance_programme, hostel_count, playground, auditorium, theatre, library, laboratory, conference_hall, health_center, gymnasium_fitness_center, indoor_stadium, common_room, computer_center, cafeteria, guest_house, scholarships,teaching_staff,no_of_journals,opportunity_cell,intake,cluster,website,latitude,longitude) SELECT id, state, state_code, university, district, type, type_code, girl_exclusive, staff_quarter_available, offers_distance_programme, hostel_count, playground, auditorium, theatre, library, laboratory, conference_hall, health_center, gymnasium_fitness_center, indoor_stadium, common_room, computer_center, cafeteria, guest_house, scholarships,teaching_staff,no_of_journals,opportunity_cell,intake,cluster,website,latitude,longitude FROM realuniversity WHERE cluster = %s AND state = %s AND type = %s ", (ucluster1, ustate, utypes))
		mycursor.execute("select * from cluster_table");
	for j in range(len(centroid)):
	  sum_=0
	  for i in range(len(centroid[0])):
		   sum_+=dist(inputs[i],centroid[j][i])
	  list.append(math.sqrt(sum_))
	   
	clus.append(list.index(min(list)))
	list.remove(min(list))
	clus.append(list.index(min(list)))
	print(clus)
	
	ustate = "Punjab"
	utypes = "Deemed University-Government"
	ucluster1=clus[0]
	print(ucluster1)
	ucluster2=clus[1]
	print(ucluster2)
				
if __name__=="__main__":
	app.run()
	  			