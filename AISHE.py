import mysql.connector
from flask import Flask , render_template,request,jsonify
import mysql.connector
import numpy as np
import pickle
import math
from sklearn.cluster import KMeans
app=Flask(__name__)

myresult =[ ];

mydb = mysql.connector.connect(

  host="localhost",

  user="root",

  passwd="jayvishaal2000",

  database="aishe"

)


#def softmax(x):
#   e_x = np.exp(x - np.max(x))
#   return e_x / e_x.sum()


km = pickle.load(open('deploy-model-v2','rb'))
centroid = km.cluster_centers_

Posts =[ ];
def dist(x1,x2):
	return math.pow((x2-x1),2)
	
	
@app.route('/' , methods=['GET','POST'])
@app.route('/send' , methods=['GET','POST'])
def send():
	inputs=[0.06451612903225806,0.20000000000000004,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
	list=[]
	for j in range(len(centroid)):
		sum_=0
		for i in range(len(centroid[0])):
		   sum_+=dist(inputs[i],centroid[j][i])
		list.append(math.sqrt(sum_))
	ucluster=list.index(min(list))
	print(ucluster)
	Posts.clear()
	mycursor = mydb.cursor()
	if request.method =='POST':
		age = request.form['Name']
		Email = request.form['Email']
		State = request.form['State']
		Utype = request.form['Utype']	
		ustate = State
		utypes = Utype
		#ucluster=2
		print(Utype ,ustate,utypes)
		#mycursor.execute("select state_code from final_univ where cluster = %s", (ucluster,))
		#myresult= mycursor.fetchall()
		#for row in myresult:
		#    print(row)
		mycursor.execute("truncate cluster_table")
		mycursor.execute("INSERT INTO cluster_table (id, state, state_code, university, district, district_code, type, type_code, website, area, girl_exclusive, is_accredited, staff_quarter_available, offers_distance_programme, student_hostel_available, hostel_count, playground, auditorium, theatre, library, laboratory, conference_hall, health_center, gymnasium_fitness_center, indoor_stadium, common_room, computer_center, cafeteria, guest_house, scholarships, cluster) SELECT id, state, state_code, university, district, district_code, type, type_code, website, area, girl_exclusive, is_accredited, staff_quarter_available, offers_distance_programme, student_hostel_available, hostel_count, playground, auditorium, theatre, library, laboratory, conference_hall, health_center, gymnasium_fitness_center, indoor_stadium, common_room, computer_center, cafeteria, guest_house, scholarships, cluster FROM final_univ WHERE cluster = %s AND state = %s AND type = %s ", (ucluster, ustate, utypes))
		mycursor.execute("select * from cluster_table");
		myresult1=mycursor.fetchall()
		for row in myresult1:
			print(row)
		print("enter weights of each feature: ")
		#s=input()
		#weights = list(map(int, s.split()))
		#weights = [w_f1, w_f2, w_f3]
		weights=[2,3,7]
		#new_weights = softmax(weights)
		nw_f1=2#new_weights[0]
		nw_f2=3#new_weights[1]
		nw_f3=7#new_weights[2]
		print("enter weights of each feature: Finish ")
		mycursor.execute("SET SQL_SAFE_UPDATES =0")
		mycursor.execute("UPDATE cluster_table SET hostel_count = hostel_count * 2")
		mycursor.execute("UPDATE cluster_table SET scholarships = scholarships * 3")#, (nw_f2))
		mycursor.execute("UPDATE cluster_table SET laboratory = laboratory *7")#, (nw_f3))
		mycursor.execute("UPDATE cluster_table SET score = hostel_count + scholarships + laboratory")

		#mycursor.execute("SELECT score from cluster_table")
		print("\n\n\n\nResult")
		count = 0
		mycursor.execute("SELECT id, state, type, university,score FROM cluster_table ORDER BY score DESC")
		myresult= mycursor.fetchall()
		for row in myresult:
			if count <5:
				print(row)
				count = count +1
		##mycursor.execute("select * from result");
		##myresult= mycursor.fetchall()
		#payload=[]
		#content={}
		#for row in myresult:
		#	print(row)
			#content={'State':row[0],'code':row[1]}
			#payload.append(content)
			#content={}
			#Posts.append(row)
		mycursor.close()
		#return jsonify(payload)
		

		#mycursor.execute("select hostel_count, scholarships, laboratory from cluster_table")
		#myresult= mycursor.fetchall()
		#for row in myresult:
		#    print(row)

		#mycursor.execute("ALTER TABLE cluster_table ADD score double")
		
	return render_template('univ.html')
	
	
	
	
if __name__=="__main__":
	app.run()
	  


