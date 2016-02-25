import os

folders = [('schema',False),('data',False),('functions',True),('procedures',True)]

print('USE ineq_bench;\n')

for eachfolder in folders: 
	for each in os.listdir(eachfolder[0]): 
		if(eachfolder[1]): 
			print('DELIMITER $$\nUSE \'ineq_bench\'$$\n')
		with open(os.path.join(eachfolder[0],each), 'r') as content_file:
			print(content_file.read())
		if(eachfolder[1]):
			print('$$ \nDELIMITER ;\n')
