https://webapps.tirumala.org/SrivaniTokenLiveTV/LiveStatus.aspx

echo "Navigated to Srivani Page"
wait 5 seconds

for i = 1 to 10
    echo "Iteration `i`..."
    if exist ("//span[@id='lblCurrentDate']")
        echo "Date element exists"
        read //span[@id='lblCurrentDate'] to dateTime
        echo `dateTime`
    else
        echo "Date element NOT FOUND"

    if exist("//span[@id='lblAvailableQuota']")
        echo "Quota element exists"
        read //span[@id='lblAvailableQuota'] to availableTickets
        echo `availableTickets`
        write `dateTime`, `availableTickets` to srivani.csv
    else
        echo "Quota element NOT FOUND"

    wait 2 seconds

snap page to final.png
