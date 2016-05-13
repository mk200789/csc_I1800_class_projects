from numpy import dot, array, random, concatenate, asarray
import itertools

def extractData():
	input_raw_bipolar_vals = []
	temp = []

	file = open('input.txt', 'r')

	for char in file.read():
		if char == "\n":
			pass
		if char == "a" or char == "b" or char == "c" or char == "e" or char == "j" or char == "k":
			input_raw_bipolar_vals.append((array(temp), 1, char))
			temp = []
		if char == "_":
			temp.append(-1)
		if char == "x":
			temp.append(1)

	return input_raw_bipolar_vals

def initiateRandomWeights(n):
	return random.random(n)

def trainingSetInputs(inputs):
	training_data = []
	temp = []

	for i in range(len(training)):
		temp = []
		temp.append(training[i])
		for j in range(len(training)):
			if  i != j:
				temp.append((training[j][0], -1, training[j][2]))
				print training[i][2], training[j][2]
		training_data.append((temp))

	return training_data


training = extractData()
training_set = trainingSetInputs(training)
weight = initiateRandomWeights(64)
print weight
