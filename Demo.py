import mysql.connector;

myresult =[ ];

mydb = mysql.connector.connect(

  host="localhost",

  user="root",

  passwd="jayvishaal2000",

  database="aicte"

)
Posts=[];
def  main():
	Itype=input("Enter the Institution Type :");
	State=input("Enter the State            :");
	Utype=input("Enter the University Type  :");	
	print("Itype = {0} \nState= {1} \nUtype= {2} ".format(Itype,State,Utype));
	
	mycursor = mydb.cursor()
	
	mycursor.execute("select university from univ where state=%s and type=%s and cluster=%s  ",(State,Utype,9));
	myresult= mycursor.fetchall()
	for row in myresult:
		Posts.append(row)
	for R in Posts:
		print(R)
	mycursor.close()
	
	
	
	
	
main()