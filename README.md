# React-Elevator

A React elevator implementation using Xstate

## Motivation
The motivation behind this project was to improve my problem-solving skills by replicating a concept/problem that exists in the real world using my knowledge in Javascript and React.

This project was built with the intent of simulating an elavator machine based on my concept of how it works and not on a real world implementation.

## Use Case

- User can call the elevator from any floor excluding the one that the car is already in.
- User can only choose a floor to go to (left panel buttons) when the car is not moving.
- If the user don't choose a floor after 5 seconds, the car goes to the first floor and waits for the next command.

## Technologies

- **React**: I chose React for it's simplicity in creating great modular and user interactive applications.
- **Xstate**: Because it's based on an old matematical concept, Statecharts, Xstate is great for managing structured and complicated state that needs to simulate real world systems using JS.
- **Snowpack**: A great frontend build tool that leverages JS ESM for faster development exprerience no matter how big is your project.

## How to use
- You can install localy by:
  1. Clonning the repository with ```git clone```
  2. Installing the dependencies with ```npm install```
  3. Then running the program with ```npm start```
- Or you can create a new sandbox on Codesandbox and fork the project via the github link for this repository. 

