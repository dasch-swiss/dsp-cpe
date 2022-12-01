#!/usr/bin/env bash

# find exclusive and deactivated tests: fdescirbe / fit / xdescribe / xit
list=$(find . -name "*spec.ts" | xargs grep 'fit\|fdescribe\|xdescribe\|xit')

# get all exclusive and deactivated tests
hits=$(find . -name "*spec.ts" | xargs grep 'fit\|fdescribe\|xdescribe\|xit' | wc -l)
if [ $hits -ne 0 ]; then
    for i in "${list[@]}"; do
        echo "WARNING: Exclusive and/or deactivated tests found: "
        echo "$i"
    done
    exit 1
fi