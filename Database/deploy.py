import os

folders = [('schema',False),('data',False),('functions',True),('procedures',True)]

f = open('toRun2.sql','w')
f.write('USE ineq_bench;\n')

for eachfolder in folders: 
	for each in os.listdir(eachfolder[0]): 
		print each + ' - ' + str(eachfolder[1])
		if(eachfolder[1]): 
			f.write('DELIMITER $$\nUSE \'ineq_bench\'$$\n')
		with open(os.path.join(eachfolder[0],each), 'r') as content_file:
			f.write(content_file.read())
		if(eachfolder[1]):
			f.write('$$ \nDELIMITER ;\n')

f.close()