from numpy import dot, array, random

#2*2 grid
# [o x]
# [o x]

#activation function
output = lambda y: -1 if y > theta  else 0 if -theta <= y <= theta else 1

#initialize weights randomly
weight = random.random(3)

#threshold theta
theta = weight[len(weight)-1]

#set learning rate a to 1 for simplicity
a = 1.0

#number of iterations it take for no weight changes
iterations = 0

#[[bipolar inputs, bias], bipolar target]
training_pattern = [
					[[-1, -1, -1, -1, 1], -1],
					[[-1, -1, -1,  1, 1], -1],
					[[-1, -1,  1, -1, 1], -1],
					[[-1, -1,  1,  1, 1], -1],
					[[-1,  1, -1, -1, 1], -1],
					[[-1,  1, -1,  1, 1],  1],
					[[-1,  1,  1, -1, 1], -1],
					[[-1,  1,  1,  1, 1], -1],
					[[ 1, -1, -1, -1, 1], -1],
					[[ 1, -1, -1,  1, 1], -1],
					[[ 1, -1,  1, -1, 1], -1],
					[[ 1, -1,  1,  1, 1], -1],
					[[ 1,  1, -1, -1, 1], -1],
					[[ 1,  1, -1,  1, 1], -1],
					[[ 1,  1,  1, -1, 1], -1],
					[[ 1,  1,  1,  1, 1], -1]
				   ]





print "theta: ", theta
print "output: ", output(1)