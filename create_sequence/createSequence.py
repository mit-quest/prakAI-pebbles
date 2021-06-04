import tkinter
from tkinter import filedialog
import os
import random
import json

root = tkinter.Tk()
root.withdraw() #use to hide tkinter window

# select directory of images
currDir = os.getcwd()
imageDir = filedialog.askdirectory(parent=root, initialdir=currDir, title='Please select the image directory')
if len(imageDir) > 0:
    print("You chose %s" % imageDir)

fileFormats = ('.png','.jpg')
images = [f for f in os.listdir(imageDir) if f.endswith(fileFormats)]

# create sequence
numTrials = int(input("Number of trials: "))
print(numTrials)
expArrangement = []
for n in range(0, numTrials):
	trial = {}
	trial['displaySetting'] = n + 1
	random.shuffle(images)
	trial['mainImage'] = images[random.randrange(len(images))]
	trial['images'] = images[:]
	expArrangement.append(trial)

# check randomization
mainImageCount = [0 for i in range(len(images))]
mainImagePos = [0 for i in range(len(images))]
imageChoicePos = {}
for trial in expArrangement:
	mainImageCount[int(trial['mainImage'][0]) - 1] += 1
	for i in range(len(trial['images'])):
		if trial['mainImage'] == trial['images'][i]:
			mainImagePos[i] += 1
		if trial['images'][i] in imageChoicePos.keys():
			imageChoicePos[trial['images'][i]][i] += 1
		else:
			imageChoicePos[trial['images'][i]] = [0 for i in range(len(images))]
			imageChoicePos[trial['images'][i]][i] += 1
print(mainImageCount)
print(mainImagePos)
print(imageChoicePos)

# write to JSON file
fileName = input("File name to save as: ")
with open(fileName, "w") as write_file:
    json.dump(expArrangement, write_file, indent = 4)
