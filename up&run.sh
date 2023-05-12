#!/bin/bash

# shellcheck disable=SC2046
path=$(dirname $(readlink -f "$0"))
echo "$path"

# 移动到父文件夹
cd "$path" || exit

# pull所有文件
cmd_output=$(git pull)
echo "$cmd_output"

# 如果有数据更新
if [[ "$cmd_output" != "Already up to date." && "$cmd_output" != "已经是最新的。" ]]; then
    cmd_output=$(npm i)
    echo "$cmd_output"
fi

# 启动main.js
node ./index.js