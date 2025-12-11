@Regression
Feature: ONION Application Login
  As a registered ONION user
  I want to log into the ONION application
  So that I can access the dashboard and use the system features

@Ologin
Scenario: Successful login with valid credentials
When the user enters valid username
When the user enters valid password
When the user clicks on the Login button
Then the user should be navigated to the Dashboard page

@OCreateProject
Scenario: Create a new project successfully
When the user clicks on the profile icon on the left side
And the user selects Settings option
And the user navigates to the Projects module
And the user clicks on Add Project button
And the user enters project name
And the user enters project description
And the user clicks on Save button
Then the project should be created successfully