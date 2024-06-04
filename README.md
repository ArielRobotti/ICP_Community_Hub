# ICP Community Hub
https://ly65v-2yaaa-aaaan-qluwa-cai.icp0.io/

Decentralized community shared knowledge platform on ICP, for those who want to get involved, build or contribute to the community with new projects, learning, questions or answers and research ideas, with rewards for participation and a reputation with tokens (pending).


## Features
### Registration and login
Users can create their ICP identity or register on the platform with an already created identity.
### Creation of tutorials, lessons or minis
Registered users can create complete courses to learn ICP features. A kind of Medium with unique tutorials created by community users, proposing projects, or explaining detailed characteristics of the protocol (complementary to the documentation).
### Approval of tutorials, lessons or minis
Content creators upload their proposals and they are approved by community members (DAO).
### Publication of questions and answers
Community tutors or developers can answer questions posted by community members seeking to learn more about a topic or fix a bug in their development.
### Reputation and rewards
User interactions on the platform reward them with tokens, which allow them to generate a reputation (with level of experience) and access to give conferences or greater visibility (REVIEW)
Developer resources


## Arquitecture.
  <img width="395" alt="image" src="https://github.com/ArielRobotti/ICP_Community_Hub/assets/80497634/7695717e-583d-4a6b-8687-9cbed583f86a">
  
  The app uses thre canisters that interact with each other, the frontend canister with the UI, the backend canister with business logic, and the DAO canister for the community decision process. It also uses an Internet Identity local canister for development.
  
  ![image](https://github.com/ArielRobotti/ICP_Community_Hub/assets/80497634/0bf18e93-bfcd-4872-9cb2-040d0af953a7)

## Installation
```bash
# Clone the project
git clone https://github.com/ArielRobotti/ICP_Community_Hub
# Get inside the project folder
cd ICP_Community_Hub
# Install project dependencies
npm install --legacy-peer-deps
# start the local replica of the Internet Computer
dfx start
# generate canister files
dfx generate
# pull canister dependencies
dfx deps pull
# copy generated files in tool folder
cp src/declarations/backend/* .dfx/local/canisters/backend
# deploy local canisters and dependencies
dfx deps deploy
dfx deploy

# run the app
npm run dev
```

Screenshots

## FAQS

Q: Is this project open source?
A: Yes, it is for the community and by the community.

Q: I want to keep building on this, how can I do it?
A: Contact us here or open an issue on what you would like to add.

## Resources
Part of the ICP Zero to DApp Hackathon

## Licence
MIT
