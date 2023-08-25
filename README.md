# Natours

The purpose of the project is to learn Express-MongoDB, understand general MVC architecture, and learn how to make a web application more secure. Project has been builded Full-Stack. Also, it contains couple of API services.

The core of the project is an interactive web platform that showcases unreal tours in America. Users can create accounts, explore tours, make purchases, share experiences, and manage their profiles. Additionally, this project includes both learning and security considerations.

## Learning and Technological Components:

### Node.js and Express: 
I embraced the power of Node.js and Express to build a robust web application. Navigating client-server interactions, creating routes, and managing server-side logic became second nature.

### MVC Architecture: 
The project adheres to the Model-View-Controller (MVC) architecture, ensuring clean code organization and scalability. This approach provided insights into maintaining a structured codebase.

### Database Management: 
The integration of MongoDB enabled me to master database design, data storage, and querying. Overcoming challenges associated with data management was an invaluable experience.

### API Integration: 
By incorporating external APIs, I enhanced the website's functionality with dynamic and up-to-date content.(For sending mails to users, purchasing tours and showing map of route of relevant tour)

## Security Measures:

### Hashing Passwords: 
I prioritized user security by hashing and securely storing passwords, minimizing potential vulnerabilities.

### XSS and NoSQL Injection Mitigation: 
User input was carefully handled to prevent cross-site scripting (XSS) and NoSQL injection attacks.

### IP Rate Limiting: 
A proactive approach was taken to thwart malicious behavior by implementing IP-based rate limiting.

### Route Protection: 
I have set up the routes according to the user's authority for access using middlewares.

## Used APIs:
### Stripe:
For payment simulation.
https://stripe.com/docs/api

### Mailtrap:
For sending mail in development stage.
https://api-docs.mailtrap.io/

### SendGrid:
For sending mail in production stage.
https://docs.sendgrid.com/for-developers/sending-email/api-getting-started
