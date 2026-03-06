@echo off
set /p TOKEN="Enter your GitHub Personal Access Token: "
git remote set-url origin https://saiyamjain468:%TOKEN%@github.com/saiyamjain468/Paylockr.git
git push -u origin main
pause
