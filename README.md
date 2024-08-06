# WorkIndia InShorts Backend project

## Prerequisite
1. Node version 18.17
2. npm version 9.6.7
3. mysql version 14.14 
   
## How to run the code
1. Clone the repo
2. cd WorkIndia_InShorts
3. Update DB username, password, IP and database in .env and start mysql server
4. npm i dotenv
5. node index.js

Note: I have comitted .env file also. But in actual it should not be comitted since it has DB username and password

## Demo
### Register a User

<img width="840" alt="Screenshot 2024-08-06 at 10 39 24 AM" src="https://github.com/user-attachments/assets/b21b131d-9caf-44cc-8de3-b169935dee02">

### Register a User (User already exist)
<img width="799" alt="Screenshot 2024-08-06 at 10 40 16 AM" src="https://github.com/user-attachments/assets/cacc7509-bd9e-4297-a247-e57c6150311f">

### Login User
<img width="948" alt="Screenshot 2024-08-06 at 10 42 06 AM" src="https://github.com/user-attachments/assets/094e2d12-8e61-4b1b-a5ae-16c094131e4c">

### Login User (Wrong password)
<img width="702" alt="Screenshot 2024-08-06 at 10 43 08 AM" src="https://github.com/user-attachments/assets/ae7ddeed-c306-4d66-8a88-a1bf9744d2f2">

### Admin add new post
<img width="784" alt="Screenshot 2024-08-06 at 10 49 54 AM" src="https://github.com/user-attachments/assets/aaad9714-2231-4000-a76d-ea09256394b5">

### Admin add new post (No API key)
<img width="743" alt="Screenshot 2024-08-06 at 10 50 47 AM" src="https://github.com/user-attachments/assets/1e9e0eb3-e187-4d92-859a-8bcc42d70bc1">

### Get shorts by user (No auth token)
<img width="668" alt="Screenshot 2024-08-06 at 10 57 50 AM" src="https://github.com/user-attachments/assets/886b9d76-d0fa-4608-806f-054f1ce86ce8">


### Get shorts by user (Invalid token )
<img width="760" alt="Screenshot 2024-08-06 at 10 52 33 AM" src="https://github.com/user-attachments/assets/31a5de83-f10d-4537-bad1-9938a153ba22">

### Get shorts by user (Valid token)
<img width="852" alt="Screenshot 2024-08-06 at 10 53 25 AM" src="https://github.com/user-attachments/assets/e1c0df73-5d42-44be-95b3-abe2afae2b49">

### Get user feed based on filters and random text searches 
![Uploading image.png…]()



