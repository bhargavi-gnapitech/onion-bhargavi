@regression
Feature: Regression Test Suite for Gigapower

@gpcreateProject
Scenario:User should be able to create new PSA ticket under Projects Tab.
    Given User logged in as "construction_dycom"
    And User navigate to the "Construction Contractor" section
    Given Projects table is displayed
    And Clicks on "Create Project/Ticket"
    And Fill in all the mandatory fields with project type field set to PSA
    And Click on "Submit" button
    Then A new PSA ticket is created with an unique ticket ID

###########################################################################################

 @gpeditName
 Scenario: User should be able to Edit the Name in OverView Tab.
   Given User should logged in as "admin"
   And User moves to the "Construction Admin" section 
   Given Overview tab is open
   When User clicks on edit button on the name field
   And A dialog appears and new name is input
   And Click on Ok button
   Then Name of the project is edited

###########################################################################################

 @gpeditAddress
 Scenario: User should be able to Edit Address in OverView Tab.
   Given User should log in as "admin"
   And User moves into the "Construction Admin" section 
   Given Overview tab opened
   When User clicks on edit button on the address field
   And A dialog appears and new address is input
   And Click  Ok button
   Then Address of the project is edited 

#############################################################################################

  @gploginwithvalid
  Scenario: User should be able to login with valid username and valid password
     Given User Opens the "IQGeo URL"
     When User inputs valid "username" and "password"
     And Click on Login
     Then User should be navigated to Landing page

##############################################################################################

  @gploginWithInvalid
  Scenario: User should be able to login with Invalid username or password
     Given User should Open the "IQGeo URL"
     When User inputs invalid "username" or "password"
     And Clicks on Login button
     Then App should display a username or password is invalid error message

###############################################################################################     

  @gpdisplayTicketsTable
  Scenario:User should be able to navigated to tickets table
     Given User should logged in  "construction_dycom"
     When User clicks on application "Construction Contractor"
     Then User should be navigated to Projects table

###############################################################################################

  @gpuiAlerts
  Scenario:UI displays alerts if mandatory fields are left blank
     Given the user is authenticated as 'construction_dycom'
     And User move into the "Construction Admin" section
     Given Tickets table page is displayed
     And Click on "Create Project/Ticket"
     And Do not fill in all the mandatory fields
     And Clicks on "Submit" button
     Then UI displays alerts if mandatory fields are left blank

################################################################################################

  @gpShowAndHideColumns
    Scenario: User customizes the visible columns in the Tickets table
    Given the user navigates to the Tickets section
    When User clicks on the "Show/hide columns" button on the top left corner
    And User selects and deselects a column
    Then UI displays only the selected columns

##########################################################################################################

  @gpticketFunctions
  Scenario: User should be able to test the Ticket Page Functions like clicking on Next Page,Previous Page & Selected Page
     Given the user authenticated as 'construction_dycom'
     And User clicks into the "Construction Admin" section
     Given Tickets page is displayed
     When User clicks on the expand button
     And clicks on right arrow
     Then Next page is displayed and number of tickets on the opened page is displayed 
     When User clicks on left arrow
     Then previous page is displayed and number of tickets on the opened page is displayed
     When User selects a page number
     Then Selected page is displayed and number of tickets on the opened page is displayed

####################################################################################################

  @gpdisplayOfSelectedPage
  Scenario: User should be able to click Map , Projects ,and Settings tabs based on the user choice.
    Given the user should authenticated as 'construction_dycom'
    When User clicks the "Construction Admin" section
    And Tickets table should displayed
    When User clicks on Projects Icon
    Then Projects Page is displayed
    When User clicks on map Icon
    Then Map Page is displayed
    When User clicks on Settings Icon
    Then Settings Page is displayed

################################################################################################## 

  @gpWBSTemplate
  Scenario: User should be able to generate WBS elements after clicking Template Button
    Given the user should be authenticated as 'construction_dycom'
    When User clicks on the "Construction Admin" section
    And Ticket table should displayed 
    When User Opens the ticket
    And Click on the "WBS" tab
    Then WBS tab is opened
    And User clicks on the Template Button 
    Then All the WBS elements get generated 

#####################################################################################################

  @gppurchaseOrderCreation
  Scenario: User should be able to create new purchase order under payment tab
    Given the user logs in with the username 'construction_dycom'
    When User is click on the "Construction Admin" section
    When User opens the ticket in ticket manager tab 
    And Clicks on the "Payment" tab
    When User clicks on New button in payment tab
    And Clicks on Add button under Invoice Request Data
    And Fills in all the fields and clicks on Save button
    Then New purchase order is created

#####################################################################################################

  @gpbuttonFunctionalities
  Scenario: User should be able to test the button functionalities like Submit , Unsubmit and Delete in payment tab.
    Given the user loggged in with the username 'construction_dycom'
    When User is clicks on the "Construction Admin" section
    When User open the ticket in ticket manager tab 
    And User Clicks on the "Payment" tab
    When User clicks on New record added to table
    And Clicks on Submit button
    Then Purchase order is submitted
    And Clicks on unsubmit button
    Then Purchase order is unsubmitted and is brought back to the New status
    And Clicks on Delete button
    Then Purchase order is deleted

#############################################################################################################

  @gpviewLogs
  Scenario: User should be able to see the Logs of Purchase Order should open in a pop-up window by clicking view logs button under Update Section in Payment Tab.
    Given the user loggged as with the username 'construction_dycom'
    When User moves on the "Construction Admin" section
    When User opens ticket in ticket manager tab 
    And User click on "Payment" tab
    When User clicks on a Purachase Order record
    And Clicks on View Logs button under Update Section
    Then Logs of Purchase Order opens in a pop-up window

###############################################################################################################

  @gpopenApproversQueue
  Scenario: User should be able to see Approvers Queue with tabs:Pending,Other is opened
    Given the user loggged in as  'saravanan'
    When User moves on the "Construction Admin" application
    When User Clicks on the Ticket Manager tab
    When User clicks on Open Approvals button
    Then Approvers queue with tabs: Pending, Other is opened
    And the user only sees items where they are either the Primary or Secondary approver

#################################################################################################################

  @gpviewDetails
  Scenario: User should be able to click View Details Button under pending tab in Open Approvals Queue
    Given the user is logged in as 'saravanan'
    When the user navigates to the "Construction Admin" application
    When the user selects the Ticket Manager tab
    When the user presses the Open Approvals button
    When User clicks on Pending tab and one particlar record
    And Clicks on View Details button
    Then PO and invoice requiring approval are navigated to Payment section

####################################################################################################################   

  @gpapproveRequest
  Scenario: User should be able to approve the requests by selecting the records under Pending Tab in Approvals Queue
    Given the user 'saravanan' is successfully logged in
    When the user opens the "Construction Admin" application
    When the user clicks on the Ticket Manager tab
    When the user clicks on the Open Approvals button
    When the user opens the Pending tab and selects a specific record
    And Clicks on Approve button
    Then Request is approved

#########################################################################################################################
  
  @gprejectRequest
  Scenario: User should be able to reject the requests by selecting the records under Pending Tab in Approvals Queue
    Given 'saravanan' has signed in to the application
    When the user accesses the "Construction Admin" module
    When the user opens the Ticket Manager section
    When the user activates the Open Approvals action
    When the user navigates to the Pending tab and chooses a record
    And Clicks on Reject button
    Then Request is rejected

###########################################################################################################################

  @gpsearchRefreshAndSorting
  Scenario: User should be able to check search field,refresh button and sorting order on column header in pending tab
    Given 'saravanan' is authenticated in the system
    When the user switches to the "Construction Admin" section
    When the user navigates to the Ticket Manager screen
    When the user selects the Open Approvals option
    And User clicks on refresh button
    Then Approvers queue is refreshed
    And User hovers over the column header and clicks on it & based on the display text during hovering
    Then A column gets sorted in ascending order, descending order and sorting is cancelled
    And User inputs in the search field
    Then Search results are displayed

############################################################################################################################

  @gpRe-Submit
  Scenario: User should be able to re-submit the record to ERP in SAP Queue tab
    Given 'saravanan' is authorized in the application
    When the user access the 'Construction Admin' module
    When the user switches to the 'Ticket Manager' interface
    When User clicks on Sap Queue button
    And Clicks on the record to be re-submitted
    And Clicks on the Re-Submit button
    Then Record is re-submitted to ERP

###############################################################################################################################

  @gpReports
  Scenario: User should be able to download the reports based on the type of report selected
    Given the user 'admin' is logged in
    When the user enters the 'Construction Admin' dashboard
    When the user switch to the 'Settings' interface
    And Select the report required from dropdown
    And Select the report format(csv/pdf)
    And Fill in required fields and click on button Run Report
    Then Report is downloaded in selected format

##############################################################################################################################

  @gpSAPQueueReport
  Scenario: User should be able to generate SAP Queue Report by clicking Run Report Button
    Given the 'admin' user has successfully authenticated
    When the user opens the 'Construction Admin' panel
    When the user switches to the 'Settings' mode
    And chooses the desired report from the dropdown
    And specifies the report format as CSV or PDF
    And populates the mandatory fields and executes 'Run Report'
    Then the report is generated and saved in the chosen format


###############################################################################################################################

  @gpopenOverviewTab
  Scenario: User should be able to open the overview tab once we search the ticket in search ticket field
    Given the 'admin' user is successfully authenticated
    When the user open the 'Construction Admin' panel
    When the user switch to the 'Projects' mode
    When User inputs the ticket id in the search bar
    And Open the ticket
    And User moves on the "Overview" tab
    Then Overview tab is opened

###############################################################################################################################

  @gpopenWBSTab
  Scenario: User should be able to open the WBS tab once we search the ticket in search ticket field
    Given the 'admin' user logs in successfully
    When the user navigates to the 'Construction Admin' panel
    When the user changes to the 'Projects' mode
    When the user enters the ticket ID in the search field
    And views the ticket
    And  User click on the "WBS" tab
    Then WBS tab is displayed

###############################################################################################################################

  @gpopenMaterialsTab
  Scenario:  User should be able to open the Materials tab once we search the ticket in search ticket field
    Given the 'admin' user is logged into the system
    When the user accesses the 'Construction Admin' section
    When the user navigates to the 'Projects' view
    When the user searches for the ticket by ID
    And accesses the ticket
    And Switch to the 'Material Request' tab
    Then Material Request  tab is opened

############################################################################################################################

  @gpopenPaymentTab
  Scenario: User should be able to open the Payment tab once we search the ticket in search ticket field
    Given the 'admin' user has authenticated credentials
    When the user selects the 'Construction Admin' option
    When the user selects the 'Projects' mode
    When the user provides the ticket ID in the search bar
    And selects the ticket to open
    And Select the 'Payment' tab
    Then Payment interface is opened

##############################################################################################################################

  @gpopenMilestonesTab
  Scenario: User should be able to open the Milestone tab once we search the ticket in search ticket field
    Given the 'admin' user is logged in successfully
    When the user access the 'Construction Admin' section
    When the user is switches to the 'Projects' mode
    When the user inputs the ticket ID in the search bar
    And opens the ticket
    And navigate to the 'Milestones' tab
    Then the Milestone page is loaded

##########################################################################################################################

  @gpopenDeliverablesTab
  Scenario: User should be able to open the Deliverables tab once we search the ticket in search ticket field
    Given the 'admin' user has logged into the system
    When the user navigate to the 'Construction Admin' panel
    When the user navigate to the 'Projects' view
    When the user searches for the ticket using the ID
    And  user accesses the ticket
    And open the 'Deliverables' tab
    Then the Deliverables interface is displayed

##########################################################################################################################

   @gppullBOMFromDesign
   Scenario: User should be able to pull BOM From design and ability to add/remove materials
      Given the 'admin' user logged in successfully
      When the user navigates to the 'Construction Admin' section
      When the user selects the 'Projects' tab
      When the user searches for the ticket by its ID
      And the user accesses the 'Material Request' tab
      When User clicks on the New button
      And Clicks on Pull from BOM button and add or removes materials
      And Clicks on Save button
      Then Materials from Design's BOM are added and removed

###########################################################################################################################

  @gpuploadDocuments
  Scenario: User should be able to upload project related documents under Deliverables tab
     Given the 'admin' user is authenticated
     When the user opens the 'Construction Admin' section
     When the user switches to the 'Projects' tab
     When the user finds the ticket using its ID
     And User clicks on Deliverables tab 
     When User clicks on button Click to Upload
     And Uploads the document and fills in necessary Title and Notes
     And Clicks on Upload button
     Then Project related documents get uploaded

#############################################################################################################################

  @gpuserSettings
  Scenario: User should be able to select the Settings tab on the bottom panel in the application
     Given User is logged in as "admin"
     When selects Settings button on the bottom panel 
     And then selects the Reporting tab
     Then app displays Reporting page

#############################################################################################################################

  @gpTicketDetailsOpensOnLeftHandSidePanel
  Scenario: User should be able to view the ticket details on the left-hand side panel in the application
     Given Tickets table is displayed
     When User inputs ticket id in the search bar 
     And Clicks on checkbox of the ticket
     Then Ticket details opens on the left hand side panel

#############################################################################################################################

  @gpEditProjectDetails
  Scenario: User should be able to edit the project details in the left-hand side panel in the application
     Given Ticket table is displayed
     When the User inputs the ticket id in the search bar 
     And Clicks on checkbox of the ticket and details opens on the left hand side panel
     And Click on the Edit button Ticket Details tab
     Then Project details are edited

##############################################################################################################################

 @gpNewButtonFunctionalityOnMaterialsTab
  Scenario: User should be able to click on New button under Materials tab
    Given Materials tab is opened
    When User clicks on New button,Insert section will appears at the bottom
    And user clicks on add button
    And All fields are input and clicks on Save button
    Then A new Materials element is added into the table

###############################################################################################################################

 @gpDuplicateButtonFunctionalityOnMaterialsTab
  Scenario: User should be able to click on Duplicate button under Materials tab
    Given the user is on the Materials tab
    When User clicks on a Materials element and clicks on Duplicate button
    And fields get auto-populated duplicated in the Insert section and clicks on Save button in the Insert section
    Then Materials element duplicated is inserted into Materials table

###############################################################################################################################
 @gpDeleteButtonFunctionalityOnMaterialsTab
  Scenario: User should be able to click on Delete button under Materials tab
    Given I open the Materials tab
    When User clicks on an existing Materials element
    And the user clicks the Delete button and clicks on Yes button in the Confirm dialog
    Then Materials element is deleted from the table

###############################################################################################################################
  @gpDisplayMap
  Scenario: User should be able to login and display the network manager application in Gigapower
    Given the user navigates to the "IQGeo URL"
    When User inputs "username" and "password"
    And the user clicks on the login option
    When the user clicks on "Network Manager" from the application list
    Then User should be navigated to Network Manager Application

###########################################################################################################################

  @gpdesignSearch
  Scenario: User should be able to search the design in search bar in Network Manager Application in Gigapower
    Given the User should logged in as "admin"
    When the user clicks on the 'Network Manager' application
    When the design name is typed into the search field
    When the user clicks on the design to open it
    Then the selected design is displayed and highlighted on the map

###########################################################################################################################

  @gpcheckDesign
  Scenario: User should be able to run the app to check the design and displays the issues
    Given the user has opened a Design
    When the user clicks the Check Design button
    And the Check Design dialog opens and the user selects the Conflicts and Design Rules options
    And the user selects the Start button
    Then The app runs the design checks and displays the issues

############################################################################################################################

  @gpdesignHistory
  Scenario: User should be able to displays the Design History items in the left side panel in Network Manager Application
    Given the user is opened a Design
    When the user clicks the History link
    Then the app displays the Design History items in the left side panel

################################################################################################################################
 
  @gpdesignPublish
  Scenario: User should be able to publish the design in Network Manager Application
    Given the user has opened Design
    When the user clicks the Publish button
    And the Publish Data? dialog displays
    And the user clicks the OK button
    Then the app publishes the design changes to master

#############################################################################################################################

  @gpViewFeatureDetails
  Scenario: User should be able to view the details of the design based on the feature selected in the map in the Network Manager Application.
    Given User is in the Network Manager application
    When User clicks on a feature on the map
    And Clicks on Details tab on the left-hand side 
    Then All details of the feature are displayed

#############################################################################################################################

 @gpToolsPaletteForSpecManager
  Scenario: User should be able to perform tool operations by clicking Tools Palette button in Network Manager Application
    Given User is in Network Manager application
    When User clicks on Tools Palette
    Then User is able to view the added tools to the application in a side panel
    And The user clicks on the Spec Manager Tool
    Then The user should be able to perform the actions in Spec Manager Tool

##############################################################################################################################

  @gpStructurePalette
  Scenario: User should be able to view the Structure Palette in Network Manager Application
    Given user is using the NMT app
    When user clicks on the Structure Palette
    Then app displays right side options:structures(to add to map)

##############################################################################################################################

  @gpEquipmentPalette
  Scenario: User should be able to view the Equipment Palette in Network Manager Application
    Given the user is accessing the NMT app
    When user clicks on the Equipment Palette
    Then the options are displayed in the right-side panel

##############################################################################################################################
  
  @gpNetworkTraceTool
  Scenario: User should be able to view the network of the Building Selected on the Map by clicking Network Trace Tool in the Network Manager Application.
    Given the user has accessed the Network Manager application
    When User selects a feature(cabinet, building, pole, etc) on the map
    And clicks on Network trace tool
    And selects network and direction and clicks on trace
    Then User is able to view the network

##############################################################################################################################

  @gpSchematicView
  Scenario: User should be able to view the schematic view of the network by clicking on the Schematic View button in the Network Manager Application
    Given the Network Manager application is launched
    When User selects a feature(cabinet, building, pole, etc) onto the map
    And clicks on Schematic view
    Then User is able to view the schematic design of selected feature

###############################################################################################################################

  @gpDesignExportAddress
  Scenario: User should be able to downloads the export file to the Downloads folder when clicking on Address Button in Export Design dialog in the Network Manager Application.
    Given the user is on the Design page
    When the user clicks on the Export button
    Then the app displays the Export Design dialog
    And then the user clicks the Address button
    And then the app downloads the export file to the Downloads folder

##################################################################################################################################

  @gpDesignExportCDIF
  Scenario: User should be able to downloads the export file to the Downloads folder when clicking on CDIF Button in Export Design dialog in the Network Manager Application.
    Given the user navigates to the Design page
    When the user selects the Export option
    Then the application opens the Export Design dialog
    And then the user clicks the CDIF button
    And the export file is downloaded to the Downloads folder

##################################################################################################################################

  @gpDesignExportShape
  Scenario: User should be able to downloads the export file to the Downloads folder when clicking on Shape Button in Export Design dialog in the Network Manager Application.
    Given the user is on the Design screen
    When the user selects the Export button
    Then the Export Design popup appears
    And then the user clicks the Shape button
    And the system saves the exported file in the Downloads folder 

#################################################################################################################################

  @gpDesignGenerateBOMReport
  Scenario: User should be able to associate the design to CM by clicking on Associate to CM button in Network Manager Application
    Given user has opened a Design 
    When the user clicks the Generate BOM Report button
    Then the Generate BOM? dialog displays
    And the user clicks on the OK button
    And the app creates and displays the Bill of Materials report
    Then the user can view it or download it

####################################################################################################################################

  @gpDesignAssociateToCM
  Scenario: User should be able to associate the design to CM by clicking on Associate to CM button in Network Manager Application
    Given the user is on the Design Page
    And the user has populated the Project Number field with a valid CM Project Number
    When the user clicks the Associate To CM button
    Then the app displays the Associate CM Project dialog                     
    And then the user clicks the OK button
    And then the app populates the CM Project Tracking field with the CM Ticket Number 

#####################################################################################################################################

  @gpDesignImportData
  Scenario: User should be able to import data by clicking on Import Data button in Network Manager Application
    Given the user enters the Design screen
    When the user clicks the Import button
    Then the app displays Drop Zip File Here and the user drops a CDIF zip file in the dialog
    And the app enables the Preview, Import buttons and the user clicks the Import button
    Then the app imports the CDIF design data
    

#########################################################################################################################################

  @gpDesignFixConflicts
  Scenario: User should be able to fix the conflicts by clicking on Fix Conflicts button in Network Manager Application
    Given the user is viewing the Design screen
    When the user clicks the Fix Conflicts button
    Then the Fix Conflicts? dialog displays and the user clicks the OK button
    And the Confirm dialog displays and the user clicks OK button
    And the app runs the fix conflicts process

##########################################################################################################################################

  @gpGoToHomeBookmark
  Scenario: User should be able to Go to Home bookmark location by clicking on Home Bookmark button in Network Manager Application
    Given the user is currently using the Network Manager
    When User clicks on Go to Home Bookmark button
    Then User is navigated to the bookmarked location

###########################################################################################################################################

  @gpCreateNewBookmark
  Scenario: User should be able to add and manage bookmarks by clicking on Add & Manage Bookmark button in Network Manager Application
     Given the Network Manager application is active
     When User clicks on Add and manage bookmarks button
     And User enters the name of the bookmark and clicks on save button
     Then The map area selected in the background gets created as a new bookmark

#############################################################################################################################################

  @gpOpenExistingBookmark
  Scenario: User should be able to open the existing bookmarks by clicking on Add & Manage Bookmark button in Network Manager Application
    Given the user has opened the Network Manager application
    When User clicks on the Add and manage bookmarks button
    And clicks on Manage bookmarks button and selects the bookmark to be opened
    And clicks on Go to button
    Then Saved bookmark area is opened on the map

#############################################################################################################################################

  @gpDesignRedrawBounds
  Scenario: User should be able to redraw the bounds of the design by clicking on Redraw Bounds button in Network Manager Application
   Given the Design screen is open with a selected design
   When the user clicks the Redraw Bounds button
   And the app displays a new design bounds on the map and the app displays an Accept New Bounds dialog and user clicks on the OK button
   Then the app saves the new Design bounds

##############################################################################################################################################

  @gpEditFeature
  Scenario: User should be able to edit the feature by clicking on Edit Feature button in Network Manager Application
    Given the user accesses the Network Manager
    When User clicks on the feature on the map
    And Clicks on Edit button 
    Then The user is able to edit fields of selected feature

##############################################################################################################################################

  @gpMarkupPalette
  Scenario: Display markup options when user clicks the Markup Palette
    Given the user is using the NMT app
    When the user clicks the Markup Palette
    Then the app should displays the options on the right side panel

################################################################################################################################################

  @gpHelpTab
  Scenario: User should be able to view the help tab in Network Manager Application
    Given the User is in Network Manager application
    When User clicks on Help tab on the left-hand side
    Then Details, patches, versions info, and help document are displayed

################################################################################################################################################

@githubVerify
Scenario: Verify GitHub integration is working fine
   Given User Network Manager application
   When User clicks on Comms application
   And Clicks on logout button.

###############################################################################################################################################

@verifylogout
Scenario: Verify logout functionality is working fine
   Given User is logged in Network Manager application
   When User clicks on logout button.

###############################################################################################################################################
@constructAdmin
Scenario: Verify Construction Admin application is loading fine
   Given User was logged in Network Manager application
   When User clicks on Construction Admin application
   Then Construction Admin application is loaded successfully. 

###############################################################################################################################################
@constructManager
Scenario: Verify Construction Manager application is loading fine 
   Given User log in Network Manager application
   When User clicks on Construction Manager application
   Then Construction Manager application is loaded successfully.     
  
     

  
    


  










      

  








                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       


  

  







  
