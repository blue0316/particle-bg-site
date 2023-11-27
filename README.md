# Installation Guide for Node.js and Running a React Project

This README provides a step-by-step guide to installing the Node.js environment on a Windows machine and running a React project.

## Installing Node.js on Windows

### Step 1: Download Node.js Installer

1. Go to the [Node.js download page](https://nodejs.org/en/download/).
2. Select the Windows Installer option. It's recommended to download the LTS (Long Term Support) version for most users.

### Step 2: Run the Installer

1. Execute the downloaded .msi file.
2. Follow the installer prompts, accept the license agreement, and keep the default installation settings.
3. Ensure that the checkboxes for `npm` package manager and adding Node.js to PATH are checked.

### Step 3: Verify Installation

1. Open a Command Prompt or PowerShell window.
2. Type `node -v` and press Enter to check the Node.js version.
3. Type `npm -v` and press Enter to check the npm version.

If both commands print version numbers, Node.js and npm have been successfully installed.

## Running a React Project

### Step 1: Clone the React Project Repository

1. Navigate to the directory where you want to run the actual React project repository.

### Step 2: Install Project Dependencies

1. Change into the project directory using: `cd react-project-name`
2. Install all required npm packages by running: `npm install`

### Step 3: Start the Development Server

1. Once the dependencies are installed, start the project with: `npm start`
2. This command will launch the React application in your default web browser at `http://localhost:3000/`.

The development server will automatically reload if you make edits to the code.

**_Note:_** To stop the server and exit the process, press `Ctrl + C` in the terminal.

With these steps, you can set up the Node.js environment on your Windows system and run your existing React project.

## Change Font Style

### 1st, Change font family.
1. Open App.css file in src folder.
2. You can find the font family on that file.

### 2nd, Change font size.
1. Navigate to text which you want to change.
2. You can find classname for font size and change font size using that class.