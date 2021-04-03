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
numTrials = int(input("Number of trials:"))
print(numTrials)
expArrangement = []
for n in range(0, numTrials):
	trial = {}
	trial['displaySetting'] = n + 1
	random.shuffle(images)
	trial['mainImage'] = images[random.randrange(len(images))]
	trial['images'] = images[:]
	expArrangement.append(trial)

# write to JSON file
# Note: this will overwrite the previous sequence generated
with open("sequence.json", "w") as write_file:
    json.dump(expArrangement, write_file, indent = 4)
