#!/bin/bash
# Simple Interest Calculator

echo "Enter Principal Amount:"
read principal
echo "Enter Rate of Interest:"
read rate
echo "Enter Time (in years):"
read time

si=$(echo "scale=2; $principal * $rate * $time / 100" | bc)
echo "Simple Interest is: $si" 