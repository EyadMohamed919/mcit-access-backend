[Setup]
AppName=MCIT Project Tracking System
AppVersion=1.0
DefaultDirName={autopf}\MCIT_Dashboard
DefaultGroupName=MCIT Dashboard
OutputDir=OutputInstaller
OutputBaseFilename=MCIT_Dashboard_Setup
Compression=lzma
SolidCompression=yes
PrivilegesRequired=admin

[Files]
; Copy all compiled Electron files
Source: "dist\win-unpacked\*"; DestDir: "{app}"; Flags: recursesubdirs ignoreversion
; Copy your database file directly into the application folder
Source: "data\dashboard-DevelopmentProjects_Data.accdb"; DestDir: "{app}"; Flags: ignoreversion
; Copy the driver installer
Source: "redist\accessdatabaseengine_X64.exe"; DestDir: "{tmp}"; Flags: deleteafterinstall

[Run]
; Run driver installer quietly
Filename: "{tmp}\accessdatabaseengine_X64.exe"; Parameters: "/passive /quiet"; \
    StatusMsg: "Installing required Microsoft Database Drivers..."; Flags: waituntilterminated

; Launch the correct executable name matching Screenshot 3
Filename: "{app}\mcit-access-backend.exe"; Description: "Launch MCIT Dashboard"; Flags: nowait postinstall skipifsilent