from numpy import dot, array, random

#AND function 
# x1 | x2 | f(x1, x2)
#----|----|-----------
# -1 | -1 | -1
# -1 |  1 | -1
# 1  | -1 | -1
# 1  |  1 | 1

#activation function: step function
output = lambda y: -1 if y < 0 else 1

#initialize weights randomly
weight = random.random(3)

#set learning rate alpha to 1 for simplicity
alpha = 1

#[[bipolar inputs, bias], bipolar target]
training_pattern = [
					(array([-1, -1, 1]), -1),
					(array([-1,  1, 1]), -1),
					(array([ 1, -1, 1]), -1),
					(array([ 1,  1, 1]),  1)
				   ]

#number of iterations it take for no weight changes
iterations = 0

while (1):
	#count total errors
	error_count = 0

	iterations += 1

	for i, target in training_pattern:
		xw = dot(i, weight)
		y_in = output(xw)


		if target - y_in != 0:
			#update weights
			weight = weight + alpha*(target-y_in) * i
			error_count += 1
			print "weight: ",weight
		
	if error_count == 0:
		break

print "# iterations: ", iterations