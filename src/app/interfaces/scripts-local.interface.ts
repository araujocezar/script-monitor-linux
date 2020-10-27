export const CPU = {
    cpu: '`mpstat 1 1 | grep ',
    cpu2: '| head -1`',
    cpuuser: `cpuuser = echo $cpu | awk '{print $3}'`,
    cpunice: `cpunice = echo $cpu | awk '{print $4}'`,
    cpusys: `cpusys = echo $cpu | awk '{print $5}'`,
    cpuiowait: `cpuiowait = echo $cpu | awk '{print $6}'`,
    cpuirq: `cpuirq = echo $cpu | awk '{print $7}'`,
    cpusoft: `cpusoft = echo $cpu | awk '{print $8}'`,
    cpusteal: `cpusteal = echo $cpu | awk '{print $9}'`,
    cpuguest: `cpuguest = echo $cpu | awk '{print $10}'`,
    cpugnice: `cpugnice = echo $cpu | awk '{print $11}'`,
    cpuidle: `cpuidle = echo $cpu | awk '{print $12}'`
};

export const COMPUTER = {
    mem: `free | grep Mem`,
    memtotal: `memtotal = echo $mem | awk '{print $2}'`,
    memused: `memused = echo $mem | awk '{print $3}'`,
    memfree: `memfree = echo $mem | awk '{print $4}'`,
    memshared: `memshared = echo $mem | awk '{print $5}'`,
    membuffers: `membuffers = echo $mem | awk '{print $6}'`,
    memcached: `memcached = echo $mem | awk '{print $7}'`,
    swap: `free | grep Swap`,
    swaptotal: `swaptotal = echo $swap | awk '{print $2}'`,
    swapused: `swapused = echo $swap | awk '{print $3}'`,
    swapfree: `swapfree = echo $swap | awk '{print $4}'`,
    numzumbis: `ps aux | awk '{if ($8~"Z"){print $0}}' | wc -l`,
    tempo: `tempo = date --rfc-3339=seconds`,
    data: `data = echo $tempo | awk '{print $1}'`,
    hora: `hora = echo $tempo | cut -d\  -f2 | gawk 'BEGIN{FS="-"}{print $1}'`
};

export const DISK = {
    disk: `df | grep`,
    diskblocks: `diskblocks = echo $disk | awk '{print $2}'`,
    diskusedkb: `diskusedkb = echo $disk | awk '{print $3}'`,
    diskfreekb: `diskfreekb = echo $disk | awk '{print (100-$5)}'`,
    diskavail: `diskavail = echo $disk | awk '{print $4}'`,
    diskusedpercent: `diskusedpercent = echo $disk | awk '{print $5}'`,
    diskfreepercent: `diskfreepercent = echo $disk | awk '{print $4/$2 * 100.0}'`
};

export const NETWORK = {
    eth01: `cat /proc/net/dev | grep eth0`,
    local1: `cat /proc/net/dev | grep lo`,
    wifi1: `cat /proc/net/dev | grep wlan0`,
    sleep: `sleep = 1`,
    eth02: `cat /proc/net/dev | grep eth0`,
    local2: `cat /proc/net/dev | grep lo`,
    wifi2: `cat /proc/net/dev | grep wlan0`,
    eth0download1: `eth0download1 = echo $eth01 | awk '{print $2}'`,
    eth0download2: `eth0download2 = echo $eth02 | awk '{print $2}'`,
    eth0download: `eth0download = expr '(' $eth0download2 - $eth0download1 ')'`,
    eth0upload1: `eth0upload1 = echo $eth01 | awk '{print $10}'`,
    eth0upload2: `eth0upload2 = echo $eth02 | awk '{print $10}'`,
    eth0upload: `eth0upload = expr '(' $eth0upload2 - $eth0upload1 ')'`,
    eth0downpacket1: `eth0downpacket1 = echo $eth01 | awk '{print $3}'` ,
    eth0downpacket2: `eth0downpacket2 = echo $eth02 | awk '{print $3}'`,
    eth0downpacket: `eth0downpacket = expr '(' $eth0downpacket2 - $eth0downpacket1 ')'`,
    eth0uppacket1: `eth0uppacket1 = echo $eth01 | awk '{print $11}'`,
    eth0uppacket2: `eth0uppacket2 = echo $eth02 | awk '{print $11}'`,
    eth0uppacket: `eth0uppacket = expr '(' $eth0uppacket2 - $eth0uppacket1 ')'`,
    localdownload1: `localdownload1 = echo $local1 | awk '{print $2}'`,
    localdownload2: `localdownload2 = echo $local2 | awk '{print $2}'`,
    localdownload: `localdownload = expr '(' $localdownload2 - $localdownload1 ')'`,
    localupload1: `localupload1 = echo $local1 | awk '{print $10}'`,
    localupload2: `localupload2 = echo $local2 | awk '{print $10}'`,
    localupload: `localupload = expr '(' $localupload2 - $localupload1 ')'`,
    localdownpacket1: `localdownpacket1 = echo $local1 | awk '{print $3}'`,
    localdownpacket2: `localdownpacket2 = echo $local2 | awk '{print $3}'`,
    localdownpacket: `localdownpacket = expr '(' $localdownpacket2 - $localdownpacket1 ')'`,
    localuppacket1: `localuppacket1 = echo $local1 | awk '{print $11}'`,
    localuppacket2: `localuppacket2 = echo $local2 | awk '{print $11}'`,
    localuppacket: `localuppacket = expr '(' $localuppacket2 - $localuppacket1 ')'`,
    wifidownload1: `wifidownload1 = echo $wifi1 | awk '{print $2}'`,
    wifidownload2: `wifidownload2 = echo $wifi2 | awk '{print $2}'`,
    wifidownload: `wifidownload = expr '(' $wifidownload2 - $wifidownload1 ')'`,
    wifiupload1: `wifiupload1 = echo $wifi1 | awk '{print $10}'`,
    wifiupload2: `wifiupload2 = echo $wifi2 | awk '{print $10}'`,
    wifiupload: `wifiupload = expr '(' $wifiupload2 - $wifiupload1 ')'`,
    wifidownpacket1: `wifidownpacket1 = echo $wifi1 | awk '{print $2}'`,
    wifidownpacket2: `wifidownpacket2 = echo $wifi2 | awk '{print $2}'`,
    wifidownpacket: `wifidownpacket = expr '(' $wifidownpacket2 - $wifidownpacket1 ')'`,
    wifiuppacket1: `wifiuppacket1 = echo $wifi1 | awk '{print $10}'`,
    wifiuppacket2: `wifiuppacket2 = echo $wifi2 | awk '{print $10}'`,
    wifiuppacket: `wifiuppacket = expr '(' $wifiuppacket2 - $wifiuppacket1 ')'`
};

export const PROCESS = {
    pid: `ps aux | `,
    pid_2: ` | awk '{print $2}'`,
    process:  `process = pidstat -u -h -p $pid -T ALL -r 60 1 | sed -n '4p'`,
    cpu: `cpuProcess = echo $process | awk '{print $6}' `,
    mem: `memProcess = echo $process | awk '{print $12}' `,
    virtmem: `virtmem =  echo $process | awk '{print $10}' `,
    resmem: `resmem = echo $process | awk '{print $11}' `

};
