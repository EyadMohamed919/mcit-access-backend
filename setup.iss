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

[Dirs]
; CRITICAL FIX: Grants standard Windows users write access to the data folder.
; This prevents MS Access "Read-Only" errors when creating .laccdb lock files in Program Files.
Name: "{app}\data"; Permissions: users-modify

[Files]
; Application files
Source: "dist\win-unpacked\*"; DestDir: "{app}"; Flags: recursesubdirs ignoreversion

; Database files (Applies modify permissions to the actual .accdb file)
Source: "data\*"; DestDir: "{app}\data"; Flags: recursesubdirs ignoreversion; Permissions: users-modify

; Redistributable installers (temporary extraction)
Source: "redist\accessdatabaseengine_X64.exe"; DestDir: "{tmp}"; Flags: deleteafterinstall
Source: "redist\VC_redist.x64.exe"; DestDir: "{tmp}"; Flags: deleteafterinstall

[Run]
; 1. Install Visual C++ 2015-2022 Redistributable (Only if NOT already installed)
Filename: "{tmp}\VC_redist.x64.exe"; Parameters: "/passive /norestart"; \
    StatusMsg: "Installing Microsoft Visual C++ Runtime..."; \
    Check: VCRedistNeedsInstall; Flags: waituntilterminated

; 2. Install MS Access Database Engine 64-bit
Filename: "{tmp}\accessdatabaseengine_X64.exe"; Parameters: "/passive /quiet"; \
    StatusMsg: "Installing Microsoft Access Database Drivers..."; \
    Flags: waituntilterminated

; 3. Launch App post-install
Filename: "{app}\MCIT-Dashboard.exe"; Description: "Launch MCIT Dashboard"; \
    Flags: nowait postinstall skipifsilent

[Code]
// Helper function to check if VC++ 2015-2022 (x64) is already installed on the target machine
function VCRedistNeedsInstall: Boolean;
var
  installed: Cardinal;
begin
  // Check Windows Registry for VC++ Redistributable (x64) installation state
  if RegQueryDWordValue(HKEY_LOCAL_MACHINE, 
    'SOFTWARE\Microsoft\VisualStudio\14.0\VC\Runtimes\x64', 'Installed', installed) then
  begin
    Result := (installed = 0);
  end
  else
  begin
    Result := True; // Not found in registry, installation needed
  end;
end;