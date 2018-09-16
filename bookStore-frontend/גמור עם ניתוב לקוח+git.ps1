#Set-ExecutionPolicy RemoteSigned
[void][System.Reflection.Assembly]::LoadWithPartialName("System.Windows.Forms")

$foldercopy     = get-childitem | where {$_.Name -eq 'dist'} 
$distcopy= get-childitem $foldercopy.FullName
Write-Host  $distcopy    

$ProjectName = read-host "Enter path to copy"

try {
    
    copy-item $distcopy.FullName   -Destination "$("$ProjectName\dist")\$distcopy" -Recurse -ErrorAction Stop
    $done = [System.Windows.Forms.Messagebox]::Show("Copy completed successfully.", "Job's Done")
 
}
catch {
    $fail = [System.Windows.Forms.Messagebox]::Show("An error occured copying the foler.", "Warning")
}        

  $done1 = [System.Windows.Forms.Messagebox]::Show("Copy completed successfully.", "Job's Done")

