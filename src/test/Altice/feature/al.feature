
@smoke
Feature:TestCases in Altice Application

    @alLogin
    Scenario:Login into the Altice Application in IQGEO
        Given User Opens the IQGeo URL
        When  User inputs <username> and <password>
        Then Click on Login
        Then User should be logged into application

        Examples:
        | username | password |
        | "admin" | "_mywWorld_" |

    @alLogout
    Scenario: User logs out successfully
        Given User is logged in
        When User clicks on the logout button
        Then User should be logged out of Altice application

    @alCreatebookmark
    Scenario:Create a New Bookmark in Altice Application in IQGEO
        Given User should be logged in the Network manager application
        When Select an area on map and click on Add and Manage Bookmarks
        When Input the name of the bookmark and Save
        Then A new bookmark must be added 

    @alOpenbookmark
    Scenario: User should be able to Open Existing Bookmark in Altice Application
        Given User was in the Network manager application
        When User clicks on Manage bookmarks
        When select the feature to be opened and click on Go to button
        Then The selected bookmark is opened

    @alClosedesign
    Scenario:User should be able to close the Design in Altice Application
        Given User is in the Network manager application
        When User clicks on the Close button 
        Then The design should be closed


    @alCreatedesign
    Scenario:User should be able to create the design using maps in Altice Application in IQGEO
        Given User is in Network manager application
        When User single clicks at 3 points on the map and double clicks at the last point
        And User inputs the fields and clicks on Create
        Then New design is created

    @alSearchdesign
    Scenario:User should be able to search the design in the Altice Application in IQGEO
        Given User should be in the Network manager application
        When User inputs the design name in the search field 
        When Clicks on the design to be opened
        Then Design is selected and highlighted on map

    @alGoingintodesign
    Scenario:User should be able to see design toolbar once we will click open button
        Given User in the Network manager application
        When Select a design and click on Open
        Then Design toolbar should open on the map

    @alNavigatetoNetworkManager
    Scenario:User Should be able to navigate to Network Manager Application in IQGEO
        Given - User is logged into Altice
        When Network manager application is available on landing page 
        And User clicks on Network Manager application
        Then Network manager application should be launched
