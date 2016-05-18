from numpy import dot, array, random, concatenate, asarray
import itertools

def extractData():
	#Returns a list of input letters and its corresponding output and the character
	input_raw_bipolar_vals = []
	temp = []

	file = open('input.txt', 'r')

	for char in file.read():
		if char == "\n":
			pass
		#if char == "a" or char == "b" or char == "c" or char == "e" or char == "j" or char == "k":
		if char == "a":
			input_raw_bipolar_vals.append((array(temp), array([1, -1, -1, -1 ,-1 ,-1]), char))
			temp = []
		if char == "b":
			input_raw_bipolar_vals.append((array(temp), array([-1, 1, -1, -1 ,-1 ,-1]), char))
			temp = []
		if char == "c":
			input_raw_bipolar_vals.append((array(temp), array([-1, -1, 1, -1 ,-1 ,-1]), char))
			temp = []
		if char == "e":
			input_raw_bipolar_vals.append((array(temp), array([-1, -1, -1, 1 ,-1 ,-1]), char))
			temp = []
		if char == "j":
			input_raw_bipolar_vals.append((array(temp), array([-1, -1, -1, -1 ,1 ,-1]), char))
			temp = []
		if char == "k":
			input_raw_bipolar_vals.append((array(temp), array([-1, -1, -1, -1 ,-1 ,1]), char))
			temp = []
		if char == "_":
			temp.append(-1)
		if char == "x":
			temp.append(1)

	return input_raw_bipolar_vals

def initiateRandomWeights(num_letters):
	#Returns a matrix containing random weights for corresponding letters
	weights = []
	for j in range(num_letters):
		temp = []
		for i in range(63):
			temp.append(random.random())
		weights.append(temp)

	return weights

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


#get the training data
training = extractData()

#get the weights for the data
weights = initiateRandomWeights(6)
