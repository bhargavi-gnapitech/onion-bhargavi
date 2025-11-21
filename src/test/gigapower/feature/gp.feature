
@gigapower
Feature:TestCases in Gigapower Application

    @gpCreateCabinet
    Scenario:User should be able to create cabinet on the existing design
    Given User logged in the Network manager application
    When Click on Add object, select cabinet and place it in existing design
    And Input details and click on create
    Then New cabinet(C1) should be created 

#---------------------------------------------------------------------------------------------    

    @gpAddPoles
    Scenario:User should be able to create poles on the existing design
    Given User should land on the Network Manager application
    When Click on Add object, select pole and place it in existing design left to the cabinet created
    And Input all the available details and click on create
    Then New pole(P1) should be created 
    Then Create three more poles(P2, P3, P4)

#---------------------------------------------------------------------------------------------------
    @gplogin
    Scenario:Login into the Gigapower Application in IQGEO
        Given User Opens the IQGeo URL
        When the user enters <username> and <password>
        Then User Click on Login
        Then User should be navigated to network manager application

        Examples:
        | username | password |
        | "automation" | "iqgeo" |

 # ------------------------------------------------------------------------------------------

    @gpHandHole
    Scenario:User should be able to create handhole on the existing design
    Given User is successfully navigated to the Network Manager application
    When Click on Add object, select UUB(type:Handhole) and place it in existing design left to the pole(P4) created
    And Input all the provided details and click on create
    Then New UUB(U1-handole) should be created 
    Then Create another UUB(U2) below the UUB(U1)

 #--------------------------------------------------------------------------------------------------   

    @gpBuilding
    Scenario:User should be able to do add building under the HandHole(U2) on the existing design
    Given User is on the Network manager application
    When Click on Add object, select Building(B1) and place it in existing design below handhole(U2) created
    And Input all required details and click on create
    Then New Building(B1)  should be created 

 #--------------------------------------------------------------------------------------------------------------------

   @gplogout
    Scenario:User should be able to logout frrom the Gigapower IQGEO Application
        Given User is logged in 
        When User clicks on the logout button 
        Then User should be logged out of the application

 # ------------------------------------------------------------------------------------------

    @gpcreatebookmark
    Scenario:Create a New Bookmark in Gigapower Application in IQGEO
        Given User should in the Network manager application
        When Select an area on map and click on Add and Manage Bookmarks
        When Input the name of the bookmark and Save
        Then A new bookmark must be added 

# ---------------------------------------------------------------------------------------------

    @gpopenbookmark
    Scenario: User should be able to Open Existing Bookmark in Gigapower Application
        Given User was in the Network manager application
        When User clicks on Manage bookmarks
        When select the feature to be opened and click on Go to button
        Then The selected bookmark is opened

    # ------------------------------------------------------------------------------------------


    @gpclosedesign
    Scenario:User should be able to close the Design in Gigapower Application
        Given User is in the Network manager application
        When User clicks on the Close button 
        Then The design should be closed

    # ------------------------------------------------------------------------------------------


    @gpcreatedesign
    Scenario:User should be able to create the design using maps in Gigapower Application in IQGEO
        Given User is in Network manager application
        When User single clicks at 3 points on the map and double clicks at the last point
        And User inputs the fields and clicks on Create
        Then New design is created


    # ------------------------------------------------------------------------------------------


    @gpsearchdesign
    Scenario:User should be able to search the design in the Gigapower Application in IQGEO
        Given User should be in the Network manager application
        When User inputs the design name in the search field 
        When Clicks on the design to be opened
        Then Design is selected and highlighted on map

 # ------------------------------------------------------------------------------------------       


    @gpgoingintodesign
    Scenario:User should be able to see design toolbar once we will click open button
        Given User in the Network manager application
        When Select a design and click on Open
        Then Design toolbar should open on the map

# ------------------------------------------------------------------------------------------


    @gpnavigatetoMap
    Scenario:User Should be able to navigate to Map in Gigapower Application in IQGEO
        Given User is logged into Giga Power
        When User clicks on map icon at the bottom of the UI
        Then Network manager application should be launched

# ------------------------------------------------------------------------------------------

    @gpAddPoleOnDesign
    Scenario:User should be able to insert new pole in existing design
        Given User is in the Network manager applications
        When Click on Add object, select pole and place it in existing design
        Then Input all the details and click on create
        Then New pole should be created

 #--------------------------------------------------------------------------------------------  

    @gpcabinet
    Scenario: User should be able to download the fiber cabinet reports in the form of PDF, XLSX, CSV & HTML
    Given the user has signed in as "construction_director"
    And the user is access the "Construction Admin" section
    When User searches for "cabinet" in the search field
    And User clicks on the cabinet and selects "All"
    Then Cabinets are displayed
    And User clicks on any one cabinet
    When User right-clicks on the cabinet and selects the "Fibre Testing Report" option
    Then User selects the download option for the required formats:
      | Format |
      | PDF    |
      | XLSX   |
      | CSV    |
      | HTML   |


#------------------------------------------------------------------------------------------------------

@gpticket
Scenario: User should be able to edit the necessary modifications in OverView Tab
Given User authenticated in as "construction_director"
And User enters to the "Construction Admin" section
When User navigates to the Projects Tab and locates the Ticket Number to view the ticket details
Then User navigates on Overview Tab ,there is an edit icon next to the name that allows for editing the project name
When User edits the project name
Then Without refreshing the page, when the User clicks the close button (cross mark), reopening the project displays the updated project name
When User tries to save the project name without filling it in (i.e., the field is empty)
Then An error message is shown indicating that the project name cannot be empty
        
#----------------------------------------------------------------------------------------------------------

@gpexporttocsv
 Scenario: User should be able to export the data list of the selected material request into a CSV file using Ticket ID
    Given User should logged as "construction_director"
    And User navigates into the "Construction Admin" section
    When User navigates to the Projects Tab and locates the Ticket Number and opens the Ticket to view its details
    And User clicks on the material request tab to switch into the material request section
    And After creating a new material request and adding the material request data in the material request tab, user selects the material request they wish to export as a CSV file
    When User clicks the "Export to CSV" button
    Then User should be able to export the data list of the selected material request into a CSV file

#---------------------------------------------------------------------------------------------------------------

@gpcalculation
Scenario: User should be able to estimate the calculation under Payment Tab
    Given User is logged as "construction_director"
    And User navigates into "Construction Admin" section
    When User navigates to the Projects Tab and locates the Ticket Number 
    Then Click on the Payments Tab and click on the milestone
    When User calculates the equation (Total = (unit price * quantity) + sales tax)
    Then User validates the equation based on the given details in the UI

#--------------------------------------------------------------------------------------------------------------- --------------------------------   

@gpviewlogs
Scenario: User should be able to see the details about the ERP submissions for the Milestone after clicking on the View Logs Button under Milestone Tab
    Given user should be authenticated as "construction_director"
    When User navigate to the Projects Tab and locates the Ticket Number and opens the Ticket to view its details
    And User clicks on the Milestone tab to switch to the milestone section
    When User clicks on the milestone row in MilestoneTab "2.i HLD Submit for Approval"
    Then User should be able to see the View Logs Button in the UPDATE section
    And after clicking on the View Logs Button, User can see details of the ERP submissions for the milestone

#-----------------------------------------------------------------------------------------------------------------------------------------------

@gpapprovalWithComments
Scenario: User should be able to check Reviewer Comments and Review Date visibility on Milestones page for Approve action by providing some comments
  
    Given User is authenticated as "construction_director"
    And User navigates to the "Construction Admin" section
    When User navigates to the "Approvals" tab
    And User selects any ticket under the "Approvals" tab
    When User approves the selected milestone with comments
    Then User checks the visibility of "Reviewer Comments" and "Review Date" in the Milestones tab with comments based on the Milestone ID

#-------------------------------------------------------------------------------------------------------------------------------------------

@gpapprovalWithNoComments
Scenario: User should be able to check Reviewer Comments and Review Date visibility on Milestones page for Approve action with no comments
  
    Given User is authenticate as "construction_director"
    And User moves into "Construction Admin" section
    When User navigate to the "Approvals" tab
    And User select any ticket under the "Approvals" tab
    When User approves the selected milestone with no comments
    Then User check the visibility of "Reviewer Comments" and "Review Date" in the Milestones tab with no comments based on the Milestone ID

#----------------------------------------------------------------------------------------------------------------------------------------------------

@gprejectWithComments
Scenario: User should be able to check Reviewer Comments and Review Date visibility on Milestones page for Reject action by providing some comments
  
    Given the User logs in as "construction_director"
    And User goes to the "Construction Admin" section
    When User switches to the "Approvals" tab
    And User picks any ticket under the "Approvals" tab
    When User rejects the selected milestone with comments
    Then User verifies the visibility of "Reviewer Comments" and "Review Date" in the Milestones tab with comments based on the Milestone ID

#-------------------------------------------------------------------------------------------------------------------------------------------------

@gprejectWithNoComments
Scenario: User should be able to check Reviewer Comments and Review Date visibility on Milestones page for Approve action with no comments
  
    Given User logs in as "construction_director"
    And User moves into the "Construction Admin" area
    When User switchs to the "Approvals" tab
    And User pick any ticket under the "Approvals" tab
    When User rejects the selected milestone with no comments
    Then User verifies the visibility of "Reviewer Comments" and "Review Date" in the Milestones tab with no comments based on the Milestone ID
    
#----------------------------------------------------------------------------------------------------------------------------------------------------

@gpsubmitButtonDuplicateEntries
Scenario: User should be able to check Submit Button Disabled After First Click and Ensure Duplicate Entries are not Created in Approvals Tab

  Given the user is signed in with the role "construction_dycom"
  And User switches into "Construction Admin" area
  When User navigates into to the Projects Tab and locates the Ticket Number 
  Then Click on the Payments Tab and After creating the MS-4, I clicked the submit button
  Then login as construction_manager And checked in approvals tab :No duplicate entries were found for the same milestone payment.

# ---------------------------------------------------------------------------------------------------------------------------------------------------------

@gpverifyRetrySendToERP
Scenario: User should be able to Verify logging when "Retry Send to ERP" is clicked under Milestones Tab

Given User should be logged in as "construction_director"
And User switches into the "Construction Admin" area
When User navigates into to the SAP Queue Tab and pick one record based on the ERP Status as 'Failed'
When User search that record in the search ticket field
And User click on the Milestone tab to switch to the milestone section
When User clicks on the milestone row which is ERP Status as 'FAILED'
Then User should be able to see the 'RETRY SEND TO ERP BUTTON' Button under view logs button in the UPDATE section

#-----------------------------------------------------------------------------------------------------------------------------------------------------------
@gpverifyRe-Submit
Scenario: User should be able to Verify After clicking the Re-submit button in the SAP Queue tab to re-submit the milestone,we are able to see the log for that particular milestone by clicking the View Log button in the Milestone tab 

Given User should be able to logged in as "construction_director"
And User navigate into the "Construction Admin" section
When User navigates into to the SAP Queue Tab and pick  any one record based on the ERP Status as 'Failed'
Then User should click Re-Submit Button under SAP Queue Tab
When User searches that record in the search ticket field
And User should clicks on the Milestone tab to switch to the milestone section
When User should clicks on the milestone row which is ERP Status as 'FAILED'
Then User should be able to see the 'VIEW LOGS' Button in the UPDATE section








