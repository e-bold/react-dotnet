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

ps 20065;
while [ $? -eq 0 ];
do
  sleep 1;
  ps 20065 > /dev/null;
done;

for child in $(list_child_processes 20066);
do
  echo killing $child;
  kill -s KILL $child;
done;
rm /Users/boldadmin/Desktop/Coding/react-dotnet/DemoApp/DemoApp.Server/bin/Debug/net8.0/066f4c3ce2004eb2b3c878e8bbad7ad6.sh;
