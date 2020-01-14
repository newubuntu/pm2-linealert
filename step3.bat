cd \
cd "C:\Users\devni\Desktop\pm2-linealert"
echo "Changed default path to C:\Users\devni\Desktop\pm2-linealert" 
TIMEOUT 5
pm2 install .
echo "pm2 install"
TIMEOUT 5
pm2 set pm2-linealert:log false
pm2 set pm2-linealert:error true
pm2 set pm2-linealert:restart true
pm2 set pm2-linealert:exception true
pm2 set pm2-linealert:start true
pm2 set pm2-linealert:online true
pm2 set pm2-linealert:stop true
pm2 set pm2-linealert:delete true
pm2 set pm2-linealert:restart overlimit true 
pm2 set pm2-linealert:exit true 
pm2 set pm2-linealert:buffer false
pm2 set pm2-linealert:server_targets ""
pm2 set pm2-linealert:token_line token_xx
TIMEOUT 5
pm2 logs