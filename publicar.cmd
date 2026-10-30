@echo off
rem Publica o English Journey na internet (EAS Hosting).
rem Na primeira vez, o EAS pode pedir login e perguntar se cria o projeto: responda Y.
cd /d C:\dev\english-journey
set PATH=C:\Program Files\nodejs;%PATH%
set EAS_NO_VCS=1
call npm run build || goto erro
call npx --yes eas-cli@latest deploy --prod --export-dir dist || goto erro
echo.
echo Publicado! Abra https://english-journey.expo.app no celular.
pause
exit /b 0
:erro
echo.
echo Algo deu errado. Copie a mensagem acima e mande para o Claude.
pause
exit /b 1
