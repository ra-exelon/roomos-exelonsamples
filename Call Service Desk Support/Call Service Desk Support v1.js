/********************************************************
All use of the material herein must be in accordance with the terms of
the License. All rights not expressly granted by the License are
reserved. Unless required by applicable law or agreed to separately in
writing, software distributed under the License is distributed on an "AS
IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
or implied.
*********************************************************
 * 
 * Macro Author:      	Ronald Allen
 *                    	Sr Systems Engineer
 *                    	ronald.allen@exeloncorp.com
 *                    	Exelon Corp
 * 
 * Version 1-0-0
 * 
 * Release: July 30, 2024
 * Last Updated: --,--,--
 *********************************************************
 * Description:
 * - This macro allows users to dial the Service Desk from the push of a button.  
 * 
 * Requirements
 * - Minimum RoomOs Version: 11.18.1 (July 2023 Stable Release)
 * 
 ********************************************************/

import xapi from 'xapi';

// Call the IT Service desk Support from the Conference Room//
// Quick button to call the IT Service Desk for Video Conference Support.//
const call_service = '18779393566';

// This will be the Panel/Page ID used in the UI Extension //
xapi.Event.UserInterface.Extensions.Panel.Clicked.on(event => {
  console.log(event)
  if(event.PanelId == 'call_servicedesk'){
    console.log('Dialing');
    xapi.Command.Dial({Number: call_service});
  }
})

//Create the Call Service Desk Button on Home Screen.//
xapi.Event.UserInterface.Extensions.Panel.Action.on(createPanel);
function createPanel() {
  const panel = `
<Extensions>
  <Panel>
    <Order>1</Order>
    <PanelId>https://10.101.115.14/web/macros</PanelId>
    <Origin>local</Origin>
    <Location>HomeScreen</Location>
    <Icon>Helpdesk</Icon>
    <Color>#e40707</Color>
    <Name>Call Service Desk</Name>
    <ActivityType>Custom</ActivityType>
    <Page>
      <Name>Calling Service Desk</Name>
      <PageId>calling_servicedesk</PageId>
      <Options>hideRowNames=1</Options>
    </Page>
  </Panel>
</Extensions> `
xapi.Command.UserInterface.Extensions.Panel.Save({PanelId: `call_servicedesk`} , panel)
}

createPanel()

