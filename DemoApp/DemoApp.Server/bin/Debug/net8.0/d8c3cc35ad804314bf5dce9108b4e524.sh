function list_child_processes () {
    local ppid=$1;
    local current_children=$(pgrep -P $ppid);
    local local_child;
    if [ $? -eq 0 ];
    then
        for current_child in $current_children
        do
          local_child=$current_child;
          list_child_processes $local_child;
          echo $local_child;
        done;
    else
      return 0;
    fi;
}

ps 13540;
while [ $? -eq 0 ];
do
  sleep 1;
  ps 13540 > /dev/null;
done;

for child in $(list_child_processes 13543);
do
  echo killing $child;
  kill -s KILL $child;
done;
rm /Users/boldadmin/Desktop/Coding/react-dotnet/DemoApp/DemoApp.Server/bin/Debug/net8.0/d8c3cc35ad804314bf5dce9108b4e524.sh;
