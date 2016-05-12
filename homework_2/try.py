from numpy import dot, array, random, concatenate, asarray
import itertools

input_raw_bipolar_vals = []
temp = []

file = open('input.txt', 'r')

for char in file.read():
	print ord(char)
	if char == "\n":
		pass
	if char == "p":
		input_raw_bipolar_vals.append((array(temp), 1))
		temp = []
	if char == "_":
		temp.append(-1)
	if char == "x":
		temp.append(1)

print input_raw_bipolar_vals


