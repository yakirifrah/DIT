ReadMe!How To Run It!
--------------------------------------------------------------------
React Native “Get Started” documentation. 
http://facebook.github.io/react-native/docs/getting-started.html
--------------------------------------------------------------------

for run this app first time, should install the environments dependence:

1.nodejs - Node.js® is a JavaScript runtime
https://nodejs.org/en/

2. IDE - using or installing any code editors for development like
	Visual Studio Code : code.visualstudio.com

3. Installing the CLI - 
	3.1.MAC users - 
		https://brew.sh - Installing Homebrew package manager for macOS for installing yarn package:
		
	Paste that at a Terminal prompt.
	(a) /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
	(b) brew install yarn --without-node
	(c) yarn global add create-native-app

	3.2 WINDOWS users - 
	installing yarn package:
	(a) Download the installer from the site and install it - 
	https://yarnpkg.com/en/docs/install#windows-stable
	(b) Paste that at a cmd prompt:
	yarn global add create-native-app

4. ANDROID simulator -
	4.1. Running the ANDROID simulator 
		Download and install it from the official site 
		https://developer.android.com/studio/
			a.while installing check the option  "Android Virtual Device" for installing simulator
			b.Open Android Studio and Select option "Open an existing Android Studio project" and navigate to the folder App 				and Select the folder "android" and open
			c.installing "java runtime environment" and "java development kit" - optional, if installed skip this
				http://www.oracle.com/technetwork/java/javase/downloads/jre8-downloads-2133155.html
				http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html

	4.2 running the App - open the project app in the IDE (Visual Studio Code) and Paste that at a cmd/terminal prompt for running 			the ANDROID simulator :
		yarn run android


5. IOS simulator - MAC users only 
	5.1. install Xcode from the AppStore, open the project app folder and select the folder "iOS"
	5.2. running the App - open the project app in the IDE (Visual Studio Code) and Paste that at a terminal prompt for running the 			iOS simulator:
				yarn run ios

Enjoy:-)

