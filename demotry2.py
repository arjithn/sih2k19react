import mysql.connector
import pymysql.cursors 
from flask import Flask , render_template,request,jsonify,request
import json
import mysql.connector
import numpy as np
import pickle
import math
from sklearn.cluster import KMeans
import ast
from generatejson import mad
from json.encoder import JSONEncoder
app=Flask(__name__)

myresult =[ ];

mydb = mysql.connector.connect(

  host="localhost",

  user="root",

  passwd="jayvishaal2000",

  database="aishe",
  

)
connection = pymysql.connect(host='localhost',
								 user='root',
								 password='jayvishaal2000',                             
								 db='aishe',
								 charset='utf8mb4',
								 cursorclass=pymysql.cursors.DictCursor)



km = pickle.load(open('deploy-model-v20','rb'))
centroid = km.cluster_centers_

Posts =[ ];
def dist(x1,x2):
	return math.pow((x2-x1),2)
	
def default(o):
    if hasattr(o, 'to_json'):
        return o.to_json()
    raise TypeError(f'Object of type {o.__class__.__name__} is not JSON serializable')

class A(object):
    def __init__(self):
        self.data = 'stuff'
        self.other_data = 'other stuff'

    def to_json(self):
        return {'data': self.data}

		



	
	
@app.route('/' , methods=['GET','POST'])
@app.route('/send' , methods=['GET','POST'])
def send():
	inputs=[0.032258064516129,0.2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
	inputs = np.zeros(24)
	frontinput=request.data
	d=json.loads(frontinput.decode('utf-8').replace('\0',''))
	print("Type of Inputs ",type(d))
	print(d)
	# for key,values in d.items():
		# if(key==str(1)):
			# istate=values
			# mycursor = mydb.cursor()
			# sql="select distinct state_code from realuniversity where state=\'{0}\' ".format(istate)
			# mycursor.execute(sql);
			# mresult=mycursor.fetchall()
			# print(type(mresult))
			# inputs[int(key)]=float(mresult[0][0])
			# print(inputs[int(key)])
		# elif(key==str(2)):
			# itype=values
			# mycursor = mydb.cursor()
			# sql="select distinct type_code from realuniversity where type =\'{0}\' ".format(itype)
			# mycursor.execute(sql);
			# mresult=mycursor.fetchall()
			# print("inside Elif",type(mresult))
			# inputs[int(key)]=float(mresult[0][0])
			# print(inputs[int(key)])
		# elif(int(key)<24):
			# inputs[int(key)]=float(values)
	print(inputs)
	clus=[]
	list=[]
	
	for j in range(len(centroid)):
	  sum_=0
	  for i in range(len(centroid[0])):
		   sum_+=dist(inputs[i],centroid[j][i])
	  list.append(math.sqrt(sum_))
	   
	clus.append(list.index(min(list)))
	list.remove(min(list))
	clus.append(list.index(min(list)))
	print(clus)
	Posts.clear()
	mycursor = mydb.cursor()
	if request.method =='POST':
		ustate = "Punjab"
		utypes = "Deemed University-Government"
		ucluster1=clus[0]
		print(ucluster1)
		ucluster2=clus[1]
		print(ucluster2)
		mycursor.execute("truncate cluster_table")
		mycursor.execute("INSERT INTO cluster_table (id, state, state_code, university, district, type, type_code, girl_exclusive, staff_quarter_available, offers_distance_programme, hostel_count, playground, auditorium, theatre, library, laboratory, conference_hall, health_center, gymnasium_fitness_center, indoor_stadium, common_room, computer_center, cafeteria, guest_house, scholarships,teaching_staff,no_of_journals,opportunity_cell,intake,cluster,website,latitude,longitude) SELECT id, state, state_code, university, district, type, type_code, girl_exclusive, staff_quarter_available, offers_distance_programme, hostel_count, playground, auditorium, theatre, library, laboratory, conference_hall, health_center, gymnasium_fitness_center, indoor_stadium, common_room, computer_center, cafeteria, guest_house, scholarships,teaching_staff,no_of_journals,opportunity_cell,intake,cluster,website,latitude,longitude FROM realuniversity WHERE cluster = %s AND state = %s AND type = %s ", (ucluster1, ustate, utypes))
		mycursor.execute("select * from cluster_table");
		myresult1=mycursor.fetchall()
		for row in myresult1:
			print(row)
		print("enter weights of each feature: ")
		nw_f3=inputs[3]
		nw_f4=inputs[4]
		nw_f5=inputs[5]
		nw_f6=inputs[6]
		nw_f7=inputs[7]
		nw_f8=inputs[8]
		nw_f9=inputs[9]
		nw_f10=inputs[10]
		nw_f11=inputs[11]
		nw_f12=inputs[12]
		nw_f13=inputs[13]
		nw_f14=inputs[14]
		nw_f15=inputs[15]
		nw_f16=inputs[16]
		nw_f17=inputs[17]
		nw_f18=inputs[18]
		nw_f19=inputs[19]
		nw_f20=inputs[20]
		nw_f21=inputs[21]
		nw_f22=inputs[22]
		nw_f23=inputs[23]
		nw_f24=inputs[23]
		
		
		print("enter weights of each feature: Finish ")
		mycursor.execute("SET SQL_SAFE_UPDATES =0")
		
		
		sql3="UPDATE cluster_table SET staff_quarter_available = staff_quarter_available *{0}".format(nw_f3);
		sql4="UPDATE cluster_table SET offers_distance_programme =offers_distance_programme*{0}".format(nw_f4);
		sql5="UPDATE cluster_table SET hostel_count = hostel_count * {0}".format(nw_f5);
		sql6="UPDATE cluster_table SET playground =playground*{0}".format(nw_f6)
		sql7="UPDATE cluster_table SET auditorium =auditorium*{0}".format(nw_f7)
		sql8="UPDATE cluster_table SET theatre = theatre*{0}".format(nw_f8)
		sql9="UPDATE cluster_table SET library =library * {0}".format(nw_f9)
		sql10="UPDATE cluster_table SET laboratory = laboratory *{0}".format(nw_f10)
		sql11="UPDATE cluster_table SET conference_hall =conference_hall * {0}".format(nw_f11)
		sql12="UPDATE cluster_table SET health_center = health_center * {0}".format(nw_f12)
		sql13="UPDATE cluster_table SET gymnasium_fitness_center * {0}".format(nw_f13)
		sql14="UPDATE cluster_table SET indoor_stadium = indoor_stadium*{0}".format(nw_f14)
		sql15="UPDATE cluster_table SET common_room = common_room * {0}".format(nw_f15)
		sql16="UPDATE cluster_table SET computer_center = computer_center*{0}".format(nw_f16)
		sql17="UPDATE cluster_table SET cafeteria = cafeteria * {0}".format(nw_f17)
		sql18="UPDATE cluster_table SET guest_house =guest_house *{0}".format(nw_f18)
		sql19="UPDATE cluster_table SET scholarships = scholarships *{0}".format(nw_f19)
		sql20="UPDATE cluster_table SET girl_exclusive = girl_exclusive * {0}".format(nw_f20)
		sql21="UPDATE cluster_table SET teaching_staff= teaching_staff * {0}".format(nw_f21)
		sql22="UPDATE cluster_table SET no_of_journals = no_of_journals * {0}".format(nw_f22)
		sql23="UPDATE cluster_table SET opportunity_cell = opportunity_cell * {0}".format(nw_f23)
		sql24="UPDATE cluster_table SET intake = intake*{0}".format(nw_f24)
		mycursor.execute(sql3)
		mycursor.execute(sql4)
		mycursor.execute(sql5)
		mycursor.execute(sql6)
		mycursor.execute(sql7)
		mycursor.execute(sql8)
		mycursor.execute(sql9)
		mycursor.execute(sql10)
		mycursor.execute(sql11)
		mycursor.execute(sql12)
		mycursor.execute(sql3)
		mycursor.execute(sql4)
		mycursor.execute(sql5)
		mycursor.execute(sql6)
		mycursor.execute(sql7)
		mycursor.execute(sql18)
		mycursor.execute(sql19)
		mycursor.execute(sql20)
		mycursor.execute(sql21)
		mycursor.execute(sql22)
		mycursor.execute(sql23)
		mycursor.execute(sql24)
		
		mycursor.execute("UPDATE cluster_table SET score = staff_quarter_available + offers_distance_programme + hostel_count + playground +auditorium + theatre+ library + laboratory + conference_hall + health_center + common_room + computer_center + cafeteria + guest_house + scholarships + girl_exclusive + teaching_staff + no_of_journals + opportunity_cell + intake")
		mycursor.execute("SELECT count(score) from cluster_table")
		c_list = mycursor.fetchall()
		c=int (c_list[0][0])
		print(c)
		
		count = 0
		if(c>=5):
			mycursor.execute("SELECT id, state, type, university, score FROM cluster_table ORDER BY score DESC")
			myresult= mycursor.fetchall()
			for row in myresult:
				if count <5:
					print(row)
					count = count +1
		else:
			mycursor.execute("SELECT id, state, type, university, score FROM cluster_table ORDER BY score DESC")
			myresult= mycursor.fetchall()
			for row in myresult:
				if count <c:
					print(row)
					count = count +1
		mycursor.execute("INSERT INTO cluster_table (id, state, state_code, university, district, type, type_code, girl_exclusive, staff_quarter_available, offers_distance_programme, hostel_count, playground, auditorium, theatre, library, laboratory, conference_hall, health_center, gymnasium_fitness_center, indoor_stadium, common_room, computer_center, cafeteria, guest_house, scholarships,teaching_staff,no_of_journals,opportunity_cell,intake,cluster,website,latitude,longitude) SELECT id, state, state_code, university, district, type, type_code, girl_exclusive, staff_quarter_available, offers_distance_programme, hostel_count, playground, auditorium, theatre, library, laboratory, conference_hall, health_center, gymnasium_fitness_center, indoor_stadium, common_room, computer_center, cafeteria, guest_house, scholarships,teaching_staff,no_of_journals,opportunity_cell,intake,cluster,website,latitude,longitude FROM realuniversity WHERE cluster = %s AND state = %s AND type = %s ", (ucluster2, ustate, utypes))
		mycursor.execute("select * from cluster_table");
		myresult1=mycursor.fetchall()
		for row in myresult1:
			print(row)
			
		#print("enter weights of each feature: ")
		weights=[2,3,7]
		nw_f3=inputs[3]
		nw_f4=inputs[4]
		nw_f5=inputs[5]
		nw_f6=inputs[6]
		nw_f7=inputs[7]
		nw_f8=inputs[8]
		nw_f9=inputs[9]
		nw_f10=inputs[10]
		nw_f11=inputs[11]
		nw_f12=inputs[12]
		nw_f13=inputs[13]
		nw_f14=inputs[14]
		nw_f15=inputs[15]
		nw_f16=inputs[16]
		nw_f17=inputs[17]
		nw_f18=inputs[18]
		nw_f19=inputs[19]
		nw_f20=inputs[20]
		nw_f21=inputs[21]
		nw_f22=inputs[22]
		nw_f23=inputs[23]
		nw_f24=inputs[23]
		
		
		print("enter weights of each feature: Finish ")
		mycursor.execute("SET SQL_SAFE_UPDATES =0")
		
		
		sql3="UPDATE cluster_table SET staff_quarter_available = staff_quarter_available *{0}".format(nw_f3);
		sql4="UPDATE cluster_table SET offers_distance_programme =offers_distance_programme*{0}".format(nw_f4);
		sql5="UPDATE cluster_table SET hostel_count = hostel_count * {0}".format(nw_f5);
		sql6="UPDATE cluster_table SET playground =playground*{0}".format(nw_f6)
		sql7="UPDATE cluster_table SET auditorium =auditorium*{0}".format(nw_f7)
		sql8="UPDATE cluster_table SET theatre = theatre*{0}".format(nw_f8)
		sql9="UPDATE cluster_table SET library =library * {0}".format(nw_f9)
		sql10="UPDATE cluster_table SET laboratory = laboratory *{0}".format(nw_f10)
		sql11="UPDATE cluster_table SET conference_hall =conference_hall * {0}".format(nw_f11)
		sql12="UPDATE cluster_table SET health_center = health_center * {0}".format(nw_f12)
		sql13="UPDATE cluster_table SET gymnasium_fitness_center * {0}".format(nw_f13)
		sql14="UPDATE cluster_table SET indoor_stadium = indoor_stadium*{0}".format(nw_f14)
		sql15="UPDATE cluster_table SET common_room = common_room * {0}".format(nw_f15)
		sql16="UPDATE cluster_table SET computer_center = computer_center*{0}".format(nw_f16)
		sql17="UPDATE cluster_table SET cafeteria = cafeteria * {0}".format(nw_f17)
		sql18="UPDATE cluster_table SET guest_house =guest_house *{0}".format(nw_f18)
		sql19="UPDATE cluster_table SET scholarships = scholarships *{0}".format(nw_f19)
		sql20="UPDATE cluster_table SET girl_exclusive = girl_exclusive * {0}".format(nw_f20)
		sql21="UPDATE cluster_table SET teaching_staff= teaching_staff * {0}".format(nw_f21)
		sql22="UPDATE cluster_table SET no_of_journals = no_of_journals * {0}".format(nw_f22)
		sql23="UPDATE cluster_table SET opportunity_cell = opportunity_cell * {0}".format(nw_f23)
		sql24="UPDATE cluster_table SET intake = intake*{0}".format(nw_f24)
		mycursor.execute(sql3)
		mycursor.execute(sql4)
		mycursor.execute(sql5)
		mycursor.execute(sql6)
		mycursor.execute(sql7)
		mycursor.execute(sql8)
		mycursor.execute(sql9)
		mycursor.execute(sql10)
		mycursor.execute(sql11)
		mycursor.execute(sql12)
		mycursor.execute(sql3)
		mycursor.execute(sql4)
		mycursor.execute(sql5)
		mycursor.execute(sql6)
		mycursor.execute(sql7)
		mycursor.execute(sql18)
		mycursor.execute(sql19)
		mycursor.execute(sql20)
		mycursor.execute(sql21)
		mycursor.execute(sql22)
		mycursor.execute(sql23)
		mycursor.execute(sql24)
		
		mycursor.execute("UPDATE cluster_table SET score = staff_quarter_available + offers_distance_programme + hostel_count + playground +auditorium + theatre+ library + laboratory + conference_hall + health_center + common_room + computer_center + cafeteria + guest_house + scholarships + girl_exclusive + teaching_staff + no_of_journals + opportunity_cell + intake")
		

		print("\n\n\n\nResult")
	return(mad())
	
		# mycursor1.execute("SELECT distinct id, state, type, university,score,district,website FROM cluster_table ORDER BY score DESC")
		# myresult= mycursor.fetchall()
		# for row in myresult :
			# print(row)
		# return(jsonify(myresult))
		# fetchedData = json.dumps(myresult, ensure_ascii=false)
		# return fetchedData
		# for row in myresult:
			# if (count<=5 and count>0):
				# print(row)
				# content={'ID':row[0],'State':row[1],'Type':row[2],'University':row[3],'Score':row[4],'district':row[5],'website':row[6],'lattitude':str(row[7]),'longitude':str(row[8])}
				# payload.append(content)
				# content={}
				# count = count-1
		# act=json.dumps(content)
		# payload=json.loads(act)
		# return jsonify(payload)
		
			
		#	return('[{"ID": 1, "State": "Punjab", "Type": "State Private University", "University": "LPU", "Score": "10", "District": "Patiala", "website": "www.google.com", "latitude": 12.3456, "longitude": 34.682}, {"ID": 1, "State": "Punjab", "Type": "State Private University", "University": "LPU", "Score": "10", "District": "Patiala", "website": "www.google.com", "latitude": 12.3456, "longitude": 34.682}]')
		#except:
		#	json.JSONDecodError
		
	
if __name__=="__main__":
	app.run()
	  


