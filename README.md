# caido-whatsnew
A small plugin to filter the http history via hotkey

# The Problem
Whenever I was testing an application and wanted to know which requests follow a certain action, I would have to select or remember the last request on top of my HTTP History table. Not anymore! 

# Usage
Caido-Whatsnew offers a Hotkey which
1. Queries your intercepted Requests to search the largest row ID
2. Adds `row.id.gt:<largest_row_id>` to your HTTPQL query
3. And removes it again if you want to

## Default Hotkeys
- `cmd` + `n`: Reapply the new filter
- `cmd` + `shift` + `n`: Remove the filter

# Installation
1. Download the zip file from https://github.com/martinhaunschmid/caido-whatsnew/releases
2. Add to Caido: https://docs.caido.io/guides/plugins



# Limitations
This currently only seems to work by querying the GraphQL instance, so there's a small delay in applying the filter.