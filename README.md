**Setup Instructions**

1. **Clone the Repository**
   git clone https://github.com/PruthviAsadi/Flow-AI-Assignment-Personal-Expense-Tracker
   cd Flow-AI-Assignment-Personal-Expense-Tracker

   
2. **Install Dependencies**
   Make sure you have Node.js, Sqlite and npm installed. Run the following command to install the necessary packages:
   npm install express sqlite3 body-parser

   
3.**Database Initialization**
  The database will be automatically created with the required tables when the application starts for the first time.


**Running the Application**
To start the server, run:
node server.js
The API will be available at http://localhost:3000


**Using Postman to Test API Endpoints**
1. **Add a New Transaction**
   Request Type: POST
   URL: http://localhost:3000/transactions
   
**Steps:**
1.Open Postman and create a new request.
2.Set the method to POST.
3.Enter the URL.
4.Go to the Body tab, select raw, and choose JSON.
5.Enter the following JSON:

  {
    "type": "income",
    "category": "Salary",
    "amount": 5000,
    "date": "2024-10-22",
    "description": "Monthly Salary"
  },
  {
    "type": "expense",
    "category": "Food",
    "amount": 100,
    "date": "2024-10-22",
    "description": "Grocery shopping"
    }
6.Click Send.

**Expected Response:**
{
    "id": 1
},
{
    "id": 2
}

2. **Retrieve All Transactions**
   Request Type: GET
   URL: http://localhost:3000/transactions
   
**Steps:**
1.Create a new request.
2.Set the method to GET.
3.Enter the URL.
4.Click Send.

**Expected Response:**
[
    {
        "id": 1,
        "type": "income",
        "category": "Salary",
        "amount": 5000,
        "date": "2024-10-22",
        "description": "Monthly Salary"
    },
    {
        "id": 2,
        "type": "expense",
        "category": "Food",
        "amount": 100,
        "date": "2024-10-22",
        "description": "Grocery shopping"
    }
]

3.**Retrieve a Transaction by ID**
  Request Type: GET
  URL: http://localhost:3000/transactions/:id
  
**Steps:**
1.Create a new request.
2.Set the method to GET.
3.Enter the URL (replace :id with the actual transaction ID, e.g., http://localhost:3000/transactions/1).
4.Click Send.

**Expected Response:**
{
    "id": 1,
    "type": "income",
    "category": "Salary",
    "amount": 5000,
    "date": "2024-10-22",
    "description": "Monthly Salary"
}

4.**Update a Transaction by ID**
  Request Type: PUT
  URL: http://localhost:3000/transactions/:id
  
**Steps:**
1.Create a new request.
2.Set the method to PUT.
3.Enter the URL (replace :id with the transaction ID).
4.Go to the Body tab, select raw, and choose JSON.
5.Enter the following JSON:
{
    "type": "income",
    "category": "Bonus",
    "amount": 2000,
    "date": "2024-10-23",
    "description": "Year-end Bonus"
}
6.Click Send.

**Expected Response:**
{
    "updatedID": 1
}

5.**Delete a Transaction by ID**
  Request Type: DELETE
  URL: http://localhost:3000/transactions/:id
  
**Steps:**
1.Create a new request.
2.Set the method to DELETE.
3.Enter the URL (replace :id with the transaction ID).
4.Click Send.

**Expected Response:**
{
    "deletedID": 1
}

6.**Retrieve a Summary of Transactions**
  Request Type: GET
  URL: http://localhost:3000/transactions/summary
  
**Steps:**
1.Create a new request.
2.Set the method to GET.
3.Enter the URL.
4.Click Send.

**Expected Response:**
{
    "totalIncome": 5000,
    "totalExpense": 100,
    "balance": 4900
}













