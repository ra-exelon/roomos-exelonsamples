/********************************************************
All use of the material herein must be in accordance with the terms of
the License. All rights not expressly granted by the License are
reserved. Unless required by applicable law or agreed to separately in
writing, software distributed under the License is distributed on an "AS
IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
or implied.
*********************************************************
 * 
 * Macro Author:      	R Allen
 *                    	Sr Systems Engineer
 *                    	Exelon Corp
 * 
 * Version 1-0-0
 * 
 * Release: July 30, 2024
 * Last Updated: --,--,--
 *********************************************************
 * Description:
 * - This macro allows users to Reboot the video system
 * 
 * Requirements
 * - Minimum RoomOs Version: 11.18.1 (July 2024 Stable Release)
 * 
 ********************************************************/
import xapi from 'xapi';
//REBOOT Button for Telepresence Device
//Requires a UI Extensions button with id = 'Reboot-System':
function guiEvent(event) {
  if (event.WidgetId === 'Reboot-System' && event.Type === 'released') {
    xapi.Command.SystemUnit.Boot({ Action: "Restart" });
  }
}

//Create the REBOOT Button in the Control Panel
xapi.Event.UserInterface.Extensions.Widget.Action.on(guiEvent);
function createPanel() {
  const panel = `
  <Extensions>
    <Panel>
    <Order>4</Order>
    <PanelId>Reboot-System</PanelId>
    <Origin>local</Origin>
    <Location>ControlPanel</Location>
    <Icon>Power</Icon>
    <Color>#D43B52</Color>
    <Name>Reboot System</Name>
    <ActivityType>Custom</ActivityType>
    <Page>
      <Name>System Reboot</Name>
        <Row>
        <Name>For Troubleshooting Purposes ONLY</Name>
          <Widget>
            <WidgetId>Reboot-System</WidgetId>
            <Name>Click here to REBOOT the system</Name>
            <Type>Button</Type>
            <Options>size=3</Options>
          </Widget>
        </Row>
      <PageId>system-reboot</PageId>
      <Options/>
    </Page>
    </Panel>
    </Extensions> `
  xapi.Command.UserInterface.Extensions.Panel.Save({ PanelId: 'Reboot-System' }, panel)
}

createPanel() 
