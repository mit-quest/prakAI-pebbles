# prakAI-pebbles
An Electron app with touch interactions for visual cognition testing in children treated by [Project Prakash](www.ProjectPrakash.org). 

- [prakAI-pebbles](#prakai-pebbles)
	- [Using the App](#using-the-app)
	- [Previewing, Packaging, and Modifying the App](#previewing-packaging-and-modifying-the-app)
		- [Previewing App using Electron](#previewing-app-using-electron)
			- [Sample App](#sample-app)
			- [PrakAI-Pebbles](#prakai-pebbles)
		- [Packaging the App using Electron Forge](#packaging-the-app-using-electron-forge)
	- [About the Naming](#about-the-naming)
		- [Why PrakAI?](#why-prakai)
		- [Why Pebbles?](#why-pebbles)
	- [Attributions](#attributions)

## Using the App
You can download the executable in the `out` directory to install and run the app. If you simply want to run the app and see what it does, then then you will need to download two things: 

1. the executable for your system in the `out` directory (if there is now installer, then see the next section)
2. the `example_experiments` directory has example configuration directories inside that you can load into the app to see how it works.
3. the `example_datalogs` directory has some example log files from success runs of an experiment, it is useful for writing analysis scripts.

## Previewing, Packaging, and Modifying the App
If there is not an installer in the `out` directory for your OS, then you will need to build it for yourself using [Electron](https://electronjs.org/) and [Electron Forge](https://www.electronforge.io/), it is really not too bad I promise. 

### Previewing App using Electron

1. Install [Node.js and the Node package manager NPM](https://www.npmjs.com/get-npm)
2. Install [Electron]() by running `npm install --save-dev electron`
3. You can then try to build an app with one of the following two options

#### Sample App
Following [Electron's first app documentation](https://electronjs.org/docs/tutorial/first-app)

#### PrakAI-Pebbles
Building PrakAI-Pebbles by completing the following steps:

1. Download this repo
2. Terminal into the `prakAI-pebbles` directory inside the local copy
3. Install all dependencies by running `npm install` 
4. Preview the app by running `npm start` 

### Packaging the App using Electron Forge

1. Install [Electron Forge](https://www.electronforge.io/) by running `npm i -g @electron-forge/cli`
2. Terminal into your project directory
3. Create distributable by running `electron-forge make`

## About the Naming

### Why PrakAI?
The name of the PrakAI Suite is a reference to the use of technology in service of Project Prakash (Prakash means "light" in Sanskrit and their team treats children with curable blindness, more info at www.projectprakash.org). We chose to keep "Prak" in direct reference to Prakash, it is also a homonym of the Sanskrit verb root प्रच्छ् ([transliterated as prachchh- or simply prach-](https://wiki.yoga-vidya.de/Sanskrit_Verbal_Roots_List_with_English_Translation)) meaning "to ask, to seek, to desire, to know". Clearly, we have the great luxury of reflecting on word choice in our spare time and also concluded that the verb root प्रा ([transliterated as pra-](https://wiki.yoga-vidya.de/Sanskrit_Verbal_Roots_List_with_English_Translation)) meaning "to fill" combines well with the verb root कै ([transliterated as kai-](https://wiki.yoga-vidya.de/Sanskrit_Verbal_Roots_List_with_English_Translation)) meaning "to sound". Of course combining two verb roots is not grammaratically correct, but it creates something that one can transliterate as prakai प्राकै, which contains a reference to the use of technology and specifically artificial intelligence (abbreviated as AI). Thus after a truly well-intentioned and avant garde misuse of grammar in two languages and convenient choice of transliterations we arrive at the rather poetic "PrakAI".

### Why Pebbles?
The first use of this app was to create a touch-driven digital version of an existing experiment that was run by having children select matching pebbles from a table in front of them. It is also a small homage to a great story (credited to [Edward de Bono](https://en.wikipedia.org/wiki/Edward_de_Bono)) about lateral thinking called [The Tale of Two Pebbles](https://academictips.org/blogs/the-tale-of-two-pebbles/) that illustrates the importance of changing one's perspective when faced with a seemingly difficult situation.

## Attributions
- [Partners in Rhyme - Public Domain Sounds](https://www.partnersinrhyme.com/soundfx/PUBLIC-DOMAIN-SOUNDS/beep_sounds/beep_beep-kind_wav.shtml)




