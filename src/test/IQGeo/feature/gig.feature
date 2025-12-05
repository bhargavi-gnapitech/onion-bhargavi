@regression1
Feature: Regression Test Suite for Gigapower
@githubVerify @smoke
Scenario: Verify GitHub integration is working fine
   Given User Network Manager application
   When User clicks on Comms application
   And Clicks on logout button.

################################################################################################################################################

@verifylogout
Scenario: Verify logout functionality is working fine
   Given User is logged in Network Manager application
   When User clicks on logout button.

################################################################################################################################################
@constructAdmin
Scenario: Verify Construction Admin application is loading fine
   Given User was logged in Network Manager application
   When User clicks on Construction Admin application
   Then Construction Admin application is loaded successfully. 

################################################################################################################################################
@constructManager
Scenario: Verify Construction Manager application is loading fine 
   Given User log in Network Manager application
   When User clicks on Construction Manager application
   Then Construction Manager application is loaded successfully.    