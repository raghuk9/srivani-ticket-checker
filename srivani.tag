https://webapps.tirumala.org/SrivaniTokenLiveTV/LiveStatus.aspx

echo "Navigated to Srivani Page"
wait 5 seconds // Initial wait for page to start loading

// Using 'wait until visible' is more robust for dynamic content.
// This will wait up to 30 seconds for the element to appear.
// The 'or present('body')' is a fallback to ensure it doesn't hang indefinitely if the element never appears.
wait until visible //span[@id='lblCurrentDate'] or present('body') timeout 30 seconds

echo "Page load or timeout reached. Starting data extraction loop."

// Loop once as per your current script
for i = 1 to 1
    echo "Iteration `i`..."
    
    // Reset variables for each iteration to prevent carrying over old data
    dateTime = ''
    availableTickets = ''

    // Reverted to explicit XPath selectors for reliability
    // 'present' is generally better than 'exist' for checking if element is in DOM
    if present("//span[@id='lblCurrentDate']")
        echo "Date element is present. Attempting to read..."
        read //span[@id='lblCurrentDate'] to dateTime
        echo "Read dateTime: `dateTime`"
    else
        echo "Date element NOT FOUND."
    
    if present("//span[@id='lblAvailableQuota']")
        echo "Quota element is present. Attempting to read..."
        read //span[@id='lblAvailableQuota'] to availableTickets
        echo "Read availableTickets: `availableTickets`"
    else
        echo "Quota element NOT FOUND."

    // Only write if both variables have actual content (not just empty strings)
    if dateTime != '' and availableTickets != ''
        echo "Writing data to CSV: `dateTime`, `availableTickets`"
        write `dateTime`, `availableTickets` to srivani.csv
    else
        echo "Skipping CSV write for this iteration due to missing or empty data."

    wait 2 seconds // Short wait between iterations
    
snap page to final.png // <--- RE-ENABLED THIS CRITICAL DEBUGGING LINE
