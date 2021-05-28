#!/bin/bash

for i in "variavel 1" "bananas" "uvas"; do
  echo "$i"
done

LIMIT=100
prime=0
for ((a = 1; a <= LIMIT; a++)); do
  let "prime= $a % 2"
  if [ $prime -eq 1 ]; then
    echo $a
  fi
done
