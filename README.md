1️. Why did you choose the frontend stack you used?

I chose React for the frontend because it enables building reusable, component-based UI and efficiently managing state, which is essential for a dynamic application like an issue tracking system. React also has a strong ecosystem and community support, making development faster and more maintainable.

I used Vite as the frontend build tool because it provides extremely fast development startup, instant hot module replacement (HMR), and optimized production builds. Compared to traditional bundlers, Vite significantly improves developer experience and performance during development.

React Router was used to handle client-side routing, allowing smooth navigation between pages such as Login, Signup, Dashboard, Create Issue, and Issue List without full page reloads, resulting in a seamless user experience.

This stack helped me focus more on application logic and user experience rather than backend infrastructure.
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

2️. Explain your Firestore data structure

I used a single main collection called issues in Firestore.

🔹 Collection: issues

Each document in the collection represents one issue with the following fields:

{
  "title": "bug",
  "description": "invalid password",
  "priority": "Low",
  "status": "Open",
  "assignedTo": "krishna",
  "createdBy": "user@gmail.com",
  "createdAt": "Timestamp"
}

🔹 Reasoning

Using one collection keeps the structure simple and scalable

createdAt is stored as a Firestore Timestamp to enable sorting (newest first)

Filters (status and priority) are applied on the frontend for better flexibility
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

3️. Explain how you handled similar issues

When creating a new issue, the application checks for similar existing issues by:

Fetching all existing issues from Firestore

Normalizing the title and description (lowercase + trimmed)

Comparing them with the new issue’s title and description

If a match is found:

A warning message is shown

The user is asked to confirm whether they still want to create the issue

This approach prevents duplicate issues while still allowing the user to proceed if needed.
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

4️. Mention what was confusing or challenging

Understanding Firestore rules and queries was initially confusing, especially how filtering and ordering work together.

Handling controlled vs uncontrolled inputs in React caused warnings until the state was properly initialized.

Designing a clean UI layout while keeping the logic simple required multiple iterations.

Implementing business rules like preventing status change from Open directly to Done needed careful validation.
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

5️. Mention what you would improve next

If I had more time, I would improve the following:

Add inline editing for issue status with validation rules

Implement search by title or assigned user

Add pagination for large issue lists

Improve role-based access (admin vs user)

Add charts or analytics on the dashboard

Move inline styles to reusable CSS files or use a UI library
