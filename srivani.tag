https://webapps.tirumala.org/SrivaniTokenLiveTV/LiveStatus.aspx

wait 5 seconds  // ensure page loads fully

for i = 1 to 10
    if exist ("//span[@id='lblCurrentDate']")
        read //span[@id='lblCurrentDate'] to dateTime
        echo `dateTime`
    if exist("//span[@id='lblAvailableQuota']")
        read //span[@id='lblAvailableQuota'] to availableTickets
        echo `availableTickets`
        write `dateTime`, `availableTickets` to srivani.csv
    wait 2 seconds


//	excel_focus = true
//	excel_visible = true
//	[/Users/raghu_kr/Desktop/tagui/flows/Raghu/Srivani.xlsx]Srivani!A'i' = "`dateTime`"
//	[/Users/raghu_kr/Desktop/tagui/flows/Raghu/Srivani.xlsx]Srivani!B'i' = "`availableTickets`"


