# Port Kontrol Scripti
# Kullanım: .\check-port.ps1 3000

param(
    [Parameter(Mandatory=$true)]
    [int]$Port
)

Write-Host ""
Write-Host "Port $Port kontrol ediliyor..." -ForegroundColor Cyan
Write-Host ""

# Port kullanımını kontrol et
$connections = Get-NetTCPConnection -LocalPort $Port -ErrorAction SilentlyContinue

if ($connections) {
    Write-Host "UYARI: Port $Port kullaniliyor!" -ForegroundColor Yellow
    Write-Host ""
    
    # Her connection için process bilgisi
    $processIds = $connections | Select-Object -ExpandProperty OwningProcess -Unique
    
    foreach ($processId in $processIds) {
        $process = Get-Process -Id $processId -ErrorAction SilentlyContinue
        if ($process) {
            Write-Host "Process Bilgileri:" -ForegroundColor Green
            Write-Host "   PID: $($process.Id)"
            Write-Host "   Isim: $($process.ProcessName)"
            Write-Host "   Yol: $($process.Path)"
            Write-Host "   Baslangic: $($process.StartTime)"
            Write-Host "   Bellek: $([math]::Round($process.WorkingSet64 / 1MB, 2)) MB"
            Write-Host ""
            
            # Command line bilgisini al (WMI ile)
            try {
                $wmiProcess = Get-WmiObject Win32_Process -Filter "ProcessId = $processId"
                if ($wmiProcess -and $wmiProcess.CommandLine) {
                    Write-Host "   Komut: $($wmiProcess.CommandLine)" -ForegroundColor Gray
                    Write-Host ""
                }
            } catch {
                # WMI hatası olursa devam et
            }
            
            Write-Host "Bu process'i sonlandirmak ister misiniz? (Y/N): " -ForegroundColor Yellow -NoNewline
            $response = Read-Host
            if ($response -eq 'Y' -or $response -eq 'y') {
                Stop-Process -Id $processId -Force
                Write-Host "Process sonlandirildi!" -ForegroundColor Green
                Write-Host ""
            }
        }
    }
} else {
    Write-Host "Port $Port bos ve kullanilabilir!" -ForegroundColor Green
    Write-Host ""
}

